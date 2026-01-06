// ==========================================
// DATA PORTOFOLIO - SILAHKAN EDIT DI SINI
// ==========================================

// ==========================================
// DATA PORTOFOLIO - DATA DIAMBIL DARI DATABASE
// ==========================================

// Variabel data dihapus karena sekarang data diambil langsung dari API/Database
// untuk memastikan konsistensi dan skalabilitas.


// ==========================================
// KODE PROGRAM (JANGAN DIUBAH KECUALI PAHAM)
// ==========================================

// DOM Elements
const loading = document.getElementById('loading');

// Hide loading overlay
function hideLoading() {
    loading.classList.add('hidden');
}

// Show error message
function showError(message) {
    console.error(message);
}

// ==========================================
// DATA FETCHING FROM API
// ==========================================

async function fetchData(endpoint) {
    try {
        const response = await fetch(`/api/${endpoint}`);
        if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
        return await response.json();
    } catch (error) {
        console.error(`Error loading ${endpoint}:`, error);
        return null;
    }
}

// Load Profile Data
async function loadProfile() {
    const profile = await fetchData('profile');
    if (!profile) return;

    // Update hero section
    document.getElementById('profile-name').textContent = profile.full_name || 'Developer';
    document.getElementById('profile-title').textContent = profile.title || 'Full Stack Developer';
    document.getElementById('profile-bio').textContent = profile.bio || 'Passionate about building great software';

    // Update about section
    document.getElementById('about-bio').textContent = profile.bio || 'Building amazing applications...';

    // Update contact info
    if (profile.email) {
        document.getElementById('contact-email').innerHTML = `
            <span class="contact-icon">📧</span>
            <span>${profile.email}</span>
        `;
    }

    if (profile.location) {
        document.getElementById('contact-location').innerHTML = `
            <span class="contact-icon">📍</span>
            <span>${profile.location}</span>
        `;
    }

    // Create social links
    const socialLinks = document.getElementById('social-links');
    const links = [];

    if (profile.github_url) {
        links.push(`<a href="${profile.github_url}" target="_blank" class="social-link" title="GitHub">🐙</a>`);
    }
    if (profile.linkedin_url) {
        links.push(`<a href="${profile.linkedin_url}" target="_blank" class="social-link" title="LinkedIn">💼</a>`);
    }
    if (profile.website_url) {
        links.push(`<a href="${profile.website_url}" target="_blank" class="social-link" title="Website">🌐</a>`);
    }

    socialLinks.innerHTML = links.join('');
}

// Load Experiences
async function loadExperiences() {
    const experiences = await fetchData('experiences');
    if (!experiences || experiences.length === 0) return;

    const timeline = document.getElementById('experience-timeline');

    timeline.innerHTML = experiences.map(exp => {
        const startDate = new Date(exp.start_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long' });
        const endDate = exp.end_date
            ? new Date(exp.end_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })
            : (exp.is_current ? 'Sekarang' : 'End Date');

        return `
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <div class="timeline-date">${startDate} - ${endDate}</div>
                    <h3 class="timeline-title">${exp.position}</h3>
                    <div class="timeline-company">
                        ${exp.company}${exp.location ? ` • ${exp.location}` : ''}
                    </div>
                    <p class="timeline-description">${exp.description || ''}</p>
                </div>
            </div>
        `;
    }).join('');
}

// Load Skills
async function loadSkills() {
    const skills = await fetchData('skills');
    if (!skills) return;

    // Group skills by category
    const skillsByCategory = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill.name);
        return acc;
    }, {});

    const skillsGrid = document.getElementById('skills-grid');
    const categories = Object.keys(skillsByCategory);

    // Update stat
    document.getElementById('stat-skills').textContent = skills.length;

    skillsGrid.innerHTML = categories.map(category => `
        <div class="skill-category">
            <h3>${category}</h3>
            <div class="skill-tags">
                ${skillsByCategory[category].map(name => `
                    <span class="skill-tag">${name}</span>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// Load Projects
async function loadProjects() {
    const projects = await fetchData('projects');
    if (!projects || projects.length === 0) return;

    const projectsGrid = document.getElementById('projects-grid');

    // Update stat
    document.getElementById('stat-projects').textContent = projects.length;

    projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card">
            <div class="project-header">
                <div class="project-year">${project.year || 'Recent'}</div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description || ''}</p>
                ${project.technologies ? `<p class="project-tech">Technologies: ${project.technologies}</p>` : ''}
            </div>
            ${project.github_url || project.demo_url ? `
                <div class="project-footer">
                    ${project.github_url ? `<a href="${project.github_url}" target="_blank" class="project-link">View on GitHub →</a>` : ''}
                    ${project.demo_url ? `<a href="${project.demo_url}" target="_blank" class="project-link">Live Demo →</a>` : ''}
                </div>
            ` : ''}
        </div>
    `).join('');
}

// Load Certificates
async function loadCertificates() {
    const certificates = await fetchData('certificates');
    if (!certificates || certificates.length === 0) return;

    const certificatesGrid = document.getElementById('certificates-grid');

    // Update stat
    document.getElementById('stat-certs').textContent = certificates.length;

    certificatesGrid.innerHTML = certificates.map(cert => {
        const date = cert.date
            ? new Date(cert.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })
            : 'Date not available';

        return `
            <div class="certificate-card">
                <div class="certificate-badge">🏆</div>
                <h3 class="certificate-title">${cert.title}</h3>
                <p class="certificate-issuer">${cert.issuer || 'Issuer'}</p>
                <div class="certificate-date">${date}</div>
                ${cert.credential_url ? `
                    <a href="${cert.credential_url}" target="_blank" class="project-link" style="margin-top: 1rem; display: inline-block;">Lihat Sertifikat →</a>
                ` : ''}
            </div>
        `;
    }).join('');
}

// Handle Contact Form Submission (Tetap menggunakan API jika backend berjalan)
async function handleContactForm(e) {
    e.preventDefault();

    const form = e.target;
    const formData = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value
    };

    // Simulasi pengiriman sukses jika tidak ada backend
    alert('Pesan terkirim! (Simulasi: Karena backend mungkin belum terhubung database, pesan ini hanya simulasi).');
    form.reset();
}

// Record Page View (Dikosongkan untuk versi statis)
function recordPageView() {
    // console.log('Page view recorded');
}

// Smooth scroll for navigation links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add navbar background on scroll
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.9)';
        }
    });
}

// Initialize everything
async function init() {
    try {
        // Load all data concurrently
        await Promise.all([
            loadProfile(),
            loadExperiences(),
            loadSkills(),
            loadProjects(),
            loadCertificates()
        ]);

        // Initialize features
        initSmoothScroll();
        initNavbarScroll();

        // Record page view
        recordPageView();

        // Hide loading overlay
        hideLoading();

    } catch (error) {
        console.error('Error initializing app:', error);
        hideLoading();
    }
}

// Setup contact form
document.getElementById('contact-form').addEventListener('submit', handleContactForm);

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
