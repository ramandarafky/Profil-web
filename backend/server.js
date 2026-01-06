const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const redis = require('redis');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Redis Client for Caching
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  socket: {
    reconnectStrategy: (retries) => Math.min(retries * 50, 500)
  }
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis Client Connected'));

(async () => {
  await redisClient.connect();
})();

// PostgreSQL Connection Pool
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'portfolio_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  max: 20, // Maximum pool size
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Middleware
app.use(helmet()); // Security headers
app.use(compression()); // Gzip compression
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Health Check Endpoint (API version for Nginx proxy compatibility)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Cache Middleware
const cacheMiddleware = (duration) => {
  return async (req, res, next) => {
    const key = `cache:${req.originalUrl}`;

    try {
      const cachedData = await redisClient.get(key);

      if (cachedData) {
        console.log(`Cache hit: ${key}`);
        return res.json(JSON.parse(cachedData));
      }

      // Store original res.json
      const originalJson = res.json.bind(res);

      // Override res.json
      res.json = (data) => {
        res.json = originalJson; // Restore original

        // Cache the response
        redisClient.setEx(key, duration, JSON.stringify(data))
          .catch(err => console.error('Cache set error:', err));

        return res.json(data);
      };

      next();
    } catch (error) {
      console.error('Cache middleware error:', error);
      next();
    }
  };
};

// API Routes

// Get Profile Data
app.get('/api/profile', cacheMiddleware(3600), async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM profiles WHERE id = $1', [1]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Experiences
app.get('/api/experiences', cacheMiddleware(3600), async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM experiences ORDER BY start_date DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Skills
app.get('/api/skills', cacheMiddleware(3600), async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM skills ORDER BY category, name'
    );

    // Group by category
    const skillsByCategory = result.rows.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill.name);
      return acc;
    }, {});

    res.json(skillsByCategory);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Projects
app.get('/api/projects', cacheMiddleware(1800), async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM projects ORDER BY year DESC, id DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Certificates
app.get('/api/certificates', cacheMiddleware(3600), async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM certificates ORDER BY date DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Contact Form Submission
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    await pool.query(
      'INSERT INTO contact_messages (name, email, message, created_at) VALUES ($1, $2, $3, NOW())',
      [name, email, message]
    );

    res.status(201).json({ message: 'Message received successfully' });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Page View Analytics
app.post('/api/analytics/pageview', async (req, res) => {
  const { page, referrer } = req.body;

  try {
    await pool.query(
      'INSERT INTO page_views (page, referrer, ip_address, user_agent, created_at) VALUES ($1, $2, $3, $4, NOW())',
      [page, referrer, req.ip, req.get('user-agent')]
    );

    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Error recording pageview:', error);
    res.status(500).json({ error: 'Failed to record pageview' });
  }
});

// Get Analytics Summary
app.get('/api/analytics/summary', cacheMiddleware(300), async (req, res) => {
  try {
    const [totalViews, uniqueVisitors, popularPages] = await Promise.all([
      pool.query('SELECT COUNT(*) as count FROM page_views'),
      pool.query('SELECT COUNT(DISTINCT ip_address) as count FROM page_views'),
      pool.query(`
        SELECT page, COUNT(*) as views 
        FROM page_views 
        GROUP BY page 
        ORDER BY views DESC 
        LIMIT 5
      `)
    ]);

    res.json({
      totalViews: parseInt(totalViews.rows[0].count),
      uniqueVisitors: parseInt(uniqueVisitors.rows[0].count),
      popularPages: popularPages.rows
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Clear cache endpoint (for admin use)
app.delete('/api/cache/clear', async (req, res) => {
  try {
    const keys = await redisClient.keys('cache:*');
    if (keys.length > 0) {
      await redisClient.del(keys);
    }
    res.json({ message: `Cleared ${keys.length} cache entries` });
  } catch (error) {
    console.error('Error clearing cache:', error);
    res.status(500).json({ error: 'Failed to clear cache' });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Graceful Shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');

  await redisClient.quit();
  await pool.end();

  process.exit(0);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
