import React, { useState, useEffect } from 'react';
import { Mail, Linkedin, Github, MapPin, Calendar, Award, Briefcase, Code, ExternalLink } from 'lucide-react';

const Portfolio = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Detect active section
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'certificates', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const experiences = [
    {
      title: "Software Engineer",
      company: "TechFlow Solutions",
      period: "2022 - Present",
      location: "Jakarta, Indonesia",
      description: "Leading development of cloud-based applications using modern frameworks and microservices architecture.",
      highlights: ["React & Next.js", "Node.js APIs", "AWS Infrastructure"]
    },
    {
      title: "Full Stack Developer",
      company: "Digital Innovations Co.",
      period: "2020 - 2022",
      location: "Bandung, Indonesia",
      description: "Developed and maintained web applications, focusing on user experience and performance optimization.",
      highlights: ["Vue.js", "Laravel", "MySQL Database"]
    },
    {
      title: "Junior Developer",
      company: "StartUp Hub",
      period: "2019 - 2020",
      location: "Surabaya, Indonesia",
      description: "Contributed to various client projects, gaining experience in full-stack development.",
      highlights: ["JavaScript", "PHP", "Responsive Design"]
    }
  ];

  const skills = {
    "Frontend": ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS"],
    "Backend": ["Node.js", "Python", "Laravel", "Express.js", "PostgreSQL"],
    "Tools": ["Git", "Docker", "AWS", "Figma", "VS Code"],
    "Soft Skills": ["Problem Solving", "Team Collaboration", "Agile Methodology"]
  };

  const projects = [
    {
      title: "EcoTrack - Sustainability Platform",
      description: "A comprehensive platform for tracking environmental impact and carbon footprint with real-time analytics.",
      tech: ["React", "Node.js", "MongoDB", "Chart.js"],
      link: "#",
      year: "2024"
    },
    {
      title: "HealthConnect Telemedicine",
      description: "Secure telemedicine application connecting patients with healthcare providers through video consultations.",
      tech: ["Next.js", "WebRTC", "PostgreSQL", "Stripe"],
      link: "#",
      year: "2023"
    },
    {
      title: "SmartInventory System",
      description: "Intelligent inventory management system with predictive analytics and automated reordering.",
      tech: ["Vue.js", "Laravel", "MySQL", "Redis"],
      link: "#",
      year: "2023"
    }
  ];

  const certificates = [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
      credential: "AWS-SA-2023-8472"
    },
    {
      name: "Professional Scrum Master I",
      issuer: "Scrum.org",
      date: "2022",
      credential: "PSM-I-394857"
    },
    {
      name: "React - The Complete Guide",
      issuer: "Udemy",
      date: "2022",
      credential: "UC-f8e9a7c4"
    },
    {
      name: "Google Cloud Professional",
      issuer: "Google Cloud",
      date: "2021",
      credential: "GCP-2021-4729"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-teal-950"></div>
        
        {/* Animated Orbs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        {/* Noise Texture */}
        <div className="absolute inset-0 bg-noise opacity-5"></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-slate-900/50"></div>
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-slate-900/80 backdrop-blur-md shadow-lg shadow-blue-500/10 border-b border-blue-500/10' : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Alex Chen
            </div>
            <div className="hidden md:flex gap-8">
              {['Home', 'About', 'Experience', 'Skills', 'Projects', 'Certificates', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`transition-all duration-300 hover:text-blue-400 ${
                    activeSection === item.toLowerCase() 
                      ? 'text-blue-400 font-medium' 
                      : 'text-slate-300'
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block mb-6 animate-[fadeIn_1s_ease-out]">
            <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-teal-400 p-1 shadow-2xl shadow-blue-500/50">
              <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-6xl">
                🌊
              </div>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-[fadeIn_1s_ease-out_0.2s_both]">
            <span className="bg-gradient-to-r from-blue-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Alex Chen
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-slate-300 mb-4 animate-[fadeIn_1s_ease-out_0.4s_both]">
            Full Stack Developer & Creative Problem Solver
          </p>
          
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8 animate-[fadeIn_1s_ease-out_0.6s_both]">
            Crafting elegant solutions with modern technologies. 
            Passionate about building applications that make a positive impact.
          </p>
          
          <div className="flex gap-4 justify-center animate-[fadeIn_1s_ease-out_0.8s_both]">
            <a
              href="#contact"
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-full hover:shadow-xl hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300"
            >
              Get In Touch
            </a>
            <a
              href="#projects"
              className="px-8 py-3 border-2 border-blue-400 text-blue-400 rounded-full hover:bg-blue-500/10 hover:scale-105 transition-all duration-300"
            >
              View Projects
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 relative">
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto relative">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-blue-500/20 relative overflow-hidden">
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-transparent rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-teal-500/20 to-transparent rounded-tr-full"></div>
            
            <p className="text-lg text-slate-300 leading-relaxed mb-6 relative z-10">
              Hello! I'm a passionate developer with a love for creating meaningful digital experiences. 
              With over 5 years in the industry, I've had the opportunity to work on diverse projects 
              ranging from enterprise applications to innovative startups.
            </p>
            
            <p className="text-lg text-slate-300 leading-relaxed mb-6 relative z-10">
              I believe in writing clean, maintainable code and creating interfaces that are both 
              beautiful and functional. My approach combines technical expertise with a user-centered 
              mindset, ensuring that every solution I build truly serves its purpose.
            </p>
            
            <p className="text-lg text-slate-300 leading-relaxed relative z-10">
              When I'm not coding, you'll find me exploring new technologies, contributing to 
              open-source projects, or enjoying nature trails. I'm always eager to learn and 
              collaborate on projects that make a positive difference.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-blue-500/20 hover:border-blue-500/40 hover:shadow-blue-500/20 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group"
              >
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-teal-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 relative z-10">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-100 mb-2">{exp.title}</h3>
                    <p className="text-xl text-blue-400 font-medium mb-2">{exp.company}</p>
                  </div>
                  <div className="text-slate-400">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-slate-300 mb-4 relative z-10">{exp.description}</p>
                
                <div className="flex flex-wrap gap-2 relative z-10">
                  {exp.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-blue-500/10 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 relative">
        {/* Floating shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 border-2 border-blue-500/20 rounded-lg rotate-12"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 border-2 border-teal-500/20 rounded-full"></div>
        
        <div className="max-w-5xl mx-auto relative">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(skills).map(([category, items], index) => (
              <div
                key={category}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-blue-500/20 hover:border-blue-500/40 hover:shadow-blue-500/20 transition-all duration-300 relative overflow-hidden group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Animated gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-teal-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <Code className="w-6 h-6 text-blue-400" />
                  <h3 className="text-2xl font-bold text-slate-100">{category}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2 relative z-10">
                  {items.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-full text-sm font-medium hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-blue-500/20 hover:border-blue-500/40 hover:shadow-blue-500/20 hover:scale-[1.03] transition-all duration-300 group"
              >
                <div className="h-48 bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-6xl relative overflow-hidden">
                  {/* Animated background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative z-10">{['🌱', '💊', '📦'][index]}</span>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-slate-100">{project.title}</h3>
                    <span className="text-sm text-slate-400">{project.year}</span>
                  </div>
                  
                  <p className="text-slate-300 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full text-xs font-medium border border-blue-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <a
                    href={project.link}
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-teal-400 font-medium transition-colors"
                  >
                    View Project
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="py-20 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Certificates & Achievements
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {certificates.map((cert, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-blue-500/20 hover:border-blue-500/40 hover:shadow-blue-500/20 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                
                <div className="flex items-start gap-4 relative z-10">
                  <div className="p-3 bg-gradient-to-br from-blue-500/20 to-teal-500/20 rounded-xl border border-blue-500/30">
                    <Award className="w-6 h-6 text-blue-400" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-100 mb-1">{cert.name}</h3>
                    <p className="text-blue-400 font-medium mb-2">{cert.issuer}</p>
                    <div className="flex items-center justify-between text-sm text-slate-400">
                      <span>Issued: {cert.date}</span>
                      <span className="text-xs font-mono bg-slate-700/50 px-2 py-1 rounded border border-slate-600">
                        {cert.credential}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 relative">
        {/* Large decorative orb */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h2>
          
          <p className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          
          <div className="flex flex-wrap gap-6 justify-center mb-12">
            <a
              href="mailto:alex.chen@email.com"
              className="flex items-center gap-3 px-8 py-4 bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-blue-500/20 hover:border-blue-500/40 hover:shadow-blue-500/20 hover:scale-105 transition-all duration-300"
            >
              <Mail className="w-6 h-6 text-blue-400" />
              <span className="font-medium text-slate-200">alex.chen@email.com</span>
            </a>
            
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-blue-500/20 hover:border-blue-500/40 hover:shadow-blue-500/20 hover:scale-105 transition-all duration-300"
            >
              <Linkedin className="w-6 h-6 text-blue-400" />
              <span className="font-medium text-slate-200">LinkedIn</span>
            </a>
            
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-blue-500/20 hover:border-blue-500/40 hover:shadow-blue-500/20 hover:scale-105 transition-all duration-300"
            >
              <Github className="w-6 h-6 text-blue-400" />
              <span className="font-medium text-slate-200">GitHub</span>
            </a>
          </div>
          
          <div className="inline-block p-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl">
            <div className="bg-slate-800 px-8 py-4 rounded-2xl">
              <p className="text-slate-300">
                Based in <span className="font-bold text-blue-400">Jakarta, Indonesia</span> 🇮🇩
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-slate-950 text-white border-t border-blue-500/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400">
            © 2024 Alex Chen. Crafted with passion and React.
          </p>
        </div>
      </footer>
      
      </div> {/* Close content wrapper */}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -50px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(50px, 50px) scale(1.05);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E");
          background-repeat: repeat;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;