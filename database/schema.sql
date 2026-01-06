-- Portfolio Database Schema

-- Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    bio TEXT,
    email VARCHAR(255),
    phone VARCHAR(50),
    location VARCHAR(255),
    github_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    website_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Experiences Table
CREATE TABLE IF NOT EXISTS experiences (
    id SERIAL PRIMARY KEY,
    company VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN DEFAULT false,
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Skills Table
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    proficiency_level INTEGER CHECK (proficiency_level >= 1 AND proficiency_level <= 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    technologies TEXT,
    github_url VARCHAR(255),
    demo_url VARCHAR(255),
    image_url VARCHAR(255),
    year INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Certificates Table
CREATE TABLE IF NOT EXISTS certificates (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    issuer VARCHAR(255),
    date DATE,
    credential_id VARCHAR(255),
    credential_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT false
);

-- Page Views Table (for analytics)
CREATE TABLE IF NOT EXISTS page_views (
    id SERIAL PRIMARY KEY,
    page VARCHAR(255),
    referrer VARCHAR(255),
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Sample Data for Profile
INSERT INTO profiles (full_name, title, bio, email, location, github_url, linkedin_url, website_url)
VALUES (
    'Ramanda Rafky Muhammad Amin',
    'Full Stack Developer & Cloud Architect',
    'Mahasiswa Telkom University yang bersemangat membangun aplikasi skala besar dengan infrastruktur cloud modern.',
    'rafky@student.telkomuniversity.ac.id',
    'Surabaya, Indonesia',
    'https://github.com/in/ramanda-rafky-muhammad-amin/',
    'https://linkedin.com/in/ramandarafkymuhammadamin',
    'https://rafky.com'
) ON CONFLICT DO NOTHING;

-- Insert Sample Experiences
INSERT INTO experiences (company, position, description, start_date, end_date, is_current, location)
VALUES 
    ('Telkom University', 'Laboratory Assistant', 'Membantu dosen dalam kegiatan praktikum Komputasi Awan dan Distribusi. Mengelola server dan membantu mahasiswa dalam troubleshooting.', '2023-01-01', NULL, true, 'Bandung')
ON CONFLICT DO NOTHING;

-- Insert Sample Skills
INSERT INTO skills (name, category, proficiency_level)
VALUES 
    ('Node.js', 'Backend', 5),
    ('Python', 'Backend', 4),
    ('Go', 'Backend', 3),
    ('PostgreSQL', 'Backend', 4),
    ('Redis', 'Backend', 4),
    ('HTML', 'Frontend', 5),
    ('CSS', 'Frontend', 5),
    ('JavaScript', 'Frontend', 5),
    ('React', 'Frontend', 4),
    ('Tailwind', 'Frontend', 4),
    ('Docker', 'DevOps', 5),
    ('Kubernetes', 'DevOps', 3),
    ('AWS', 'DevOps', 4),
    ('Nginx', 'DevOps', 4),
    ('Linux', 'DevOps', 4),
    ('Git', 'Tools', 5),
    ('VS Code', 'Tools', 5),
    ('Postman', 'Tools', 5),
    ('Jira', 'Tools', 4)
ON CONFLICT DO NOTHING;

-- Insert Sample Projects
INSERT INTO projects (title, description, technologies, github_url, demo_url, year)
VALUES 
    ('Sistem Manajemen Tugas Akhir', 'Aplikasi web untuk mengelola pendaftaran dan bimbingan tugas akhir mahasiswa.', 'Node.js, Express, PostgreSQL, React', 'https://github.com/rafky/ta-system', NULL, 2023),
    ('Portfolio Website', 'Website portofolio pribadi yang menggunakan arsitektur microservices.', 'Docker, Nginx, HTML, CSS, JS', 'https://github.com/rafky/portfolio', 'https://rafky.com', 2023),
    ('Smart Home Dashboard', 'Dashboard IoT untuk memonitor sensor rumah pintar.', 'Python, Flask, MQTT, Chart.js', NULL, NULL, 2022)
ON CONFLICT DO NOTHING;

-- Insert Sample Certificates
INSERT INTO certificates (title, issuer, date, credential_url)
VALUES 
    ('AWS Certified Cloud Practitioner', 'Amazon Web Services', '2023-08-01', 'https://aws.amazon.com/verification'),
    ('Google Cloud Associate Engineer', 'Google', '2023-05-01', 'https://google.com/certification')
ON CONFLICT DO NOTHING;

-- Create Indexes for Better Performance
CREATE INDEX IF NOT EXISTS idx_experiences_start_date ON experiences(start_date DESC);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_projects_year ON projects(year DESC);
CREATE INDEX IF NOT EXISTS idx_certificates_date ON certificates(date DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
