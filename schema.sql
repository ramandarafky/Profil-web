-- Database Schema for Portfolio Application

-- Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    bio TEXT,
    email VARCHAR(255),
    location VARCHAR(255),
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Experiences Table
CREATE TABLE IF NOT EXISTS experiences (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    description TEXT,
    highlights TEXT[], -- Array of highlights
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Skills Table
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    proficiency_level INTEGER DEFAULT 0, -- 0-100
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    tech_stack TEXT[], -- Array of technologies
    project_url TEXT,
    github_url TEXT,
    image_url TEXT,
    year INTEGER,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Certificates Table
CREATE TABLE IF NOT EXISTS certificates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    issuer VARCHAR(255) NOT NULL,
    date VARCHAR(50),
    credential_id VARCHAR(255),
    certificate_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Page Views Table (for analytics)
CREATE TABLE IF NOT EXISTS page_views (
    id SERIAL PRIMARY KEY,
    page VARCHAR(255) NOT NULL,
    referrer TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for Performance
CREATE INDEX idx_experiences_dates ON experiences(start_date DESC, end_date DESC);
CREATE INDEX idx_projects_year ON projects(year DESC);
CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_page_views_created ON page_views(created_at DESC);
CREATE INDEX idx_page_views_page ON page_views(page);
CREATE INDEX idx_contact_messages_created ON contact_messages(created_at DESC);

-- Seed Data
INSERT INTO profiles (name, title, bio, email, location) VALUES
('Alex Chen', 'Full Stack Developer & Creative Problem Solver', 
'Passionate developer with a love for creating meaningful digital experiences. With over 5 years in the industry, I have had the opportunity to work on diverse projects ranging from enterprise applications to innovative startups.',
'alex.chen@email.com', 'Jakarta, Indonesia');

INSERT INTO experiences (title, company, location, start_date, end_date, is_current, description, highlights) VALUES
('Software Engineer', 'TechFlow Solutions', 'Jakarta, Indonesia', '2022-01-01', NULL, TRUE,
'Leading development of cloud-based applications using modern frameworks and microservices architecture.',
ARRAY['React & Next.js', 'Node.js APIs', 'AWS Infrastructure']),

('Full Stack Developer', 'Digital Innovations Co.', 'Bandung, Indonesia', '2020-01-01', '2021-12-31', FALSE,
'Developed and maintained web applications, focusing on user experience and performance optimization.',
ARRAY['Vue.js', 'Laravel', 'MySQL Database']),

('Junior Developer', 'StartUp Hub', 'Surabaya, Indonesia', '2019-01-01', '2019-12-31', FALSE,
'Contributed to various client projects, gaining experience in full-stack development.',
ARRAY['JavaScript', 'PHP', 'Responsive Design']);

INSERT INTO skills (name, category, proficiency_level) VALUES
-- Frontend
('React', 'Frontend', 90),
('Next.js', 'Frontend', 85),
('Vue.js', 'Frontend', 80),
('TypeScript', 'Frontend', 85),
('Tailwind CSS', 'Frontend', 90),
-- Backend
('Node.js', 'Backend', 85),
('Python', 'Backend', 75),
('Laravel', 'Backend', 70),
('Express.js', 'Backend', 85),
('PostgreSQL', 'Backend', 80),
-- Tools
('Git', 'Tools', 90),
('Docker', 'Tools', 80),
('AWS', 'Tools', 75),
('Figma', 'Tools', 70),
('VS Code', 'Tools', 95),
-- Soft Skills
('Problem Solving', 'Soft Skills', 90),
('Team Collaboration', 'Soft Skills', 85),
('Agile Methodology', 'Soft Skills', 80);

INSERT INTO projects (title, description, tech_stack, project_url, year, featured) VALUES
('EcoTrack - Sustainability Platform', 
'A comprehensive platform for tracking environmental impact and carbon footprint with real-time analytics.',
ARRAY['React', 'Node.js', 'MongoDB', 'Chart.js'],
'#', 2024, TRUE),

('HealthConnect Telemedicine',
'Secure telemedicine application connecting patients with healthcare providers through video consultations.',
ARRAY['Next.js', 'WebRTC', 'PostgreSQL', 'Stripe'],
'#', 2023, TRUE),

('SmartInventory System',
'Intelligent inventory management system with predictive analytics and automated reordering.',
ARRAY['Vue.js', 'Laravel', 'MySQL', 'Redis'],
'#', 2023, FALSE);

INSERT INTO certificates (name, issuer, date, credential_id) VALUES
('AWS Certified Solutions Architect', 'Amazon Web Services', '2023', 'AWS-SA-2023-8472'),
('Professional Scrum Master I', 'Scrum.org', '2022', 'PSM-I-394857'),
('React - The Complete Guide', 'Udemy', '2022', 'UC-f8e9a7c4'),
('Google Cloud Professional', 'Google Cloud', '2021', 'GCP-2021-4729');
