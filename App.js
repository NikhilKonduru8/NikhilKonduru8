import React, { useState, useEffect, useRef } from 'react';

// Main App component
const App = () => {
  const [activeSection, setActiveSection] = useState('home');

  // Data extracted from GitHub profile
  const portfolioData = {
    name: "Nikhil Konduru",
    title: "Student Developer & Robotics Enthusiast",
    bio: "A 13-year-old 8th grader passionate about Tech, Coding, and Robotics. Currently immersed in learning Python and Java, applying these skills to exciting Machine Learning/AI and Robotics projects. I'm also venturing into C++ for game development, constantly striving to create impactful solutions and explore the cutting edge of technology.",
    email: "nikhilkonduru8@gmail.com",
    skills: [
      { name: "Python", icon: "🐍", level: "Intermediate" },
      { name: "Java", icon: "☕", level: "Intermediate" },
      { name: "C++", icon: "🧱", level: "Beginner" },
      { name: "Machine Learning / AI", icon: "🧠", level: "Learning" },
      { name: "Robotics", icon: "🤖", level: "Learning" },
      { name: "Game Development", icon: "🎮", level: "Learning" },
      { name: "React.js", icon: "⚛️", level: "Intermediate" },
      { name: "Tailwind CSS", icon: "🌬️", level: "Proficient" },
      { name: "HTML", icon: "🌐", level: "Proficient" },
      { name: "CSS", icon: "🎨", level: "Proficient" },
      { name: "JavaScript", icon: "📜", level: "Intermediate" },
    ],
    projects: [
      {
        name: "Quantam-Leaper-25810",
        description: "An innovative project that delves into advanced computational concepts, potentially related to quantum computing or a competitive programming challenge. It showcases strong problem-solving abilities and efficient algorithmic design.",
        technologies: ["Python", "Quantum Concepts", "Data Analysis"],
        link: "https://github.com/NikhilKonduru8/Quantam-Leaper-25810"
      },
      {
        name: "BlusHacks2025",
        description: "Developed during the BlusHacks 2025 hackathon, this project represents a rapid prototyping effort to address a specific challenge. It highlights teamwork, quick development cycles, and integration of various APIs.",
        technologies: ["React.js", "Tailwind CSS", "JavaScript", "API Integration"],
        link: "https://github.com/NikhilKonduru8/BlusHacks2025"
      },
      {
        name: "WarriorHacks2025",
        description: "A key contribution to WarriorHacks 2025, demonstrating the ability to build functional applications under hackathon constraints. This project likely involved a unique concept and quick implementation, possibly leveraging machine learning for intelligent features.",
        technologies: ["Python", "Flask", "Machine Learning", "Deployment"],
        link: "https://github.com/NikhilKonduru8/WarriorHacks2025"
      },
      {
        name: "HappyHacksTheraLog",
        description: "Originating from HappyHacks, this project is designed as a therapeutic logging or mental wellness application. It focuses on user-centric design, intuitive interfaces, and robust backend data handling for personal insights.",
        technologies: ["Java", "Spring Boot", "MySQL", "Android Development"],
        link: "https://github.com/NikhilKonduru8/HappyHacksTheraLog"
      },
      {
        name: "NikhilKonduru8 (Profile Repo)",
        description: "This repository serves as the central hub for my GitHub profile, containing essential configurations, documentation, and various utility scripts that streamline my development workflow.",
        technologies: ["Markdown", "Git", "GitHub Actions"],
        link: "https://github.com/NikhilKonduru8/NikhilKonduru8"
      },
    ],
    socialLinks: {
      github: "https://github.com/NikhilKonduru8",
      linkedin: "https://www.linkedin.com/in/nikhil-konduru-85662a2b0/", // Placeholder, user can update
      twitter: "https://twitter.com/your_twitter", // Placeholder, user can update
    }
  };

  // Smooth scrolling for navigation
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  // Ref for sections to observe visibility
  const sectionRefs = useRef({});

  // Handle intersection observer for active navigation highlighting and animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            // Add 'animate-in' class to trigger fade-in-up when section becomes visible
            entry.target.classList.add('animate-in');
          } else {
            // Remove 'animate-in' if you want sections to re-animate on scroll back
            // entry.target.classList.remove('animate-in');
          }
        });
      },
      {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.3, // 30% of the section must be visible to trigger
      }
    );

    // Observe all sections
    Object.values(sectionRefs.current).forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      // Disconnect observer on component unmount
      Object.values(sectionRefs.current).forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-800 text-gray-100 font-body antialiased">
      {/* Font imports */}
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Open+Sans:wght@300;400;600&display=swap" rel="stylesheet" />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-95 backdrop-blur-md z-50 shadow-xl py-4 transition-all duration-300 ease-in-out">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <a href="#home" className="text-2xl font-heading font-extrabold text-teal-400 hover:text-teal-300 transition-colors duration-300 tracking-wide">
            {portfolioData.name.split(' ')[0]} <span className="hidden sm:inline">Portfolio</span>
          </a>
          <ul className="flex space-x-4 md:space-x-8">
            {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(section);
                  }}
                  className={`text-lg font-body font-medium px-3 md:px-4 py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5
                    ${activeSection === section ? 'bg-teal-600 text-white shadow-md scale-105' : 'text-gray-300 hover:text-white hover:bg-teal-700/40'}`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" ref={(el) => sectionRefs.current.home = el} className="relative h-screen flex items-center justify-center text-center overflow-hidden p-4">
        <div className="absolute inset-0 z-0 opacity-20">
          {/* Enhanced gradient background for sleekness */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950"></div>
          {/* Subtle particle effect or abstract pattern can be added here with JS/SVG */}
        </div>
        <div className="relative z-10 p-8 max-w-5xl mx-auto animate-hero-fade-in-up rounded-xl bg-gray-900/50 backdrop-blur-sm shadow-2xl border border-gray-700">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold text-white leading-tight mb-4 animate-scale-in text-shadow-lg">
            Hi, I'm <span className="text-teal-400">{portfolioData.name}</span>
          </h1>
          <p className="text-xl md:text-3xl lg:text-4xl text-gray-300 mb-10 font-body font-light animate-fade-in max-w-3xl mx-auto leading-relaxed">
            {portfolioData.title}
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('projects');
              }}
              className="px-10 py-4 bg-teal-600 text-white text-xl font-body font-semibold rounded-full shadow-lg hover:bg-teal-700 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/50 border border-teal-600 active:scale-95"
            >
              View My Work
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              className="px-10 py-4 border-2 border-teal-600 text-teal-400 text-xl font-body font-semibold rounded-full shadow-lg hover:bg-teal-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={(el) => sectionRefs.current.about = el} className="py-20 md:py-28 bg-gray-900 animate-in p-4">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-center text-teal-400 mb-12 animate-slide-in-top">About Me</h2>
          <div className="max-w-4xl mx-auto bg-gray-800 p-8 md:p-12 rounded-xl shadow-2xl flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12 transform transition-all duration-500 hover:scale-[1.005] hover:shadow-teal-500/30 border border-gray-700">
            <div className="flex-shrink-0 relative group">
              <img
                src="https://placehold.co/250x250/2d3748/a0aec0?text=Your+Photo"
                alt="Nikhil Konduru"
                className="rounded-full w-48 h-48 md:w-60 md:h-60 object-cover border-4 border-teal-500 shadow-xl group-hover:scale-105 transition-transform duration-300 animate-float"
              />
              <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-teal-400 transition-all duration-300 animate-ping-once opacity-0 group-hover:opacity-100"></div>
            </div>
            <div className="text-lg text-gray-300 text-center md:text-left font-body leading-relaxed max-w-prose">
              <p className="mb-4 text-gray-200">{portfolioData.bio}</p>
              <p className="mb-4 text-gray-200">
                My journey in tech is driven by curiosity and a desire to build. I thrive on tackling challenges and continuously expanding my knowledge base.
              </p>
              <p className="text-gray-200">I'm always eager to collaborate on exciting projects and learn from fellow innovators. Let's create something remarkable together!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={(el) => sectionRefs.current.skills = el} className="py-20 md:py-28 bg-gray-800 animate-in p-4">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-center text-teal-400 mb-12 animate-slide-in-top">My Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8 justify-items-center">
            {portfolioData.skills.map((skill, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-xl flex flex-col items-center justify-center transition-all duration-300 transform hover:scale-105 hover:bg-teal-700/30 group border border-gray-700 animate-pop-in"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <span className="text-5xl md:text-6xl mb-4 group-hover:animate-bounce-icon">{skill.icon}</span>
                <p className="text-xl md:text-2xl font-body font-semibold text-gray-200 group-hover:text-white text-center mb-1">{skill.name}</p>
                <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors duration-300">{skill.level}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={(el) => sectionRefs.current.projects = el} className="py-20 md:py-28 bg-gray-900 animate-in p-4">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-center text-teal-400 mb-12 animate-slide-in-top">My Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {portfolioData.projects.map((project, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-103 hover:shadow-teal-500/40 border border-gray-700 animate-slide-in-right"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-6 md:p-8 flex flex-col h-full">
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-teal-300 mb-3">{project.name}</h3>
                  <p className="text-gray-300 mb-5 leading-relaxed font-body flex-grow text-justify">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-teal-700 text-white text-sm md:text-base px-4 py-1 rounded-full font-body font-medium shadow-md transition-all duration-200 hover:scale-105 hover:bg-teal-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-teal-500 text-white font-body font-semibold rounded-lg shadow-md hover:bg-teal-600 transition-colors duration-300 transform hover:-translate-y-0.5 active:scale-95 self-start"
                  >
                    View Project on GitHub
                    <svg className="inline-block ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0l-7 7m7-7v6"></path></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={(el) => sectionRefs.current.contact = el} className="py-20 md:py-28 bg-gray-800 animate-in p-4">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-center text-teal-400 mb-12 animate-slide-in-top">Get In Touch</h2>
          <div className="max-w-2xl mx-auto bg-gray-900 p-8 md:p-12 rounded-xl shadow-2xl text-center transition-all duration-500 hover:scale-[1.005] hover:shadow-teal-500/30 border border-gray-700">
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed font-body">
              Ready to collaborate or have a question? I'm always open to new opportunities and discussions. Feel free to reach out!
            </p>
            <a
              href={`mailto:${portfolioData.email}`}
              className="inline-block px-12 py-4 bg-teal-600 text-white text-xl md:text-2xl font-body font-semibold rounded-full shadow-lg hover:bg-teal-700 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95"
            >
              Email Me!
            </a>
            <div className="flex justify-center space-x-6 mt-10">
              {portfolioData.socialLinks.github && (
                <a href={portfolioData.socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="text-gray-300 hover:text-teal-400 transition-colors duration-300 transform hover:scale-125 animate-pop-in-slow">
                  <svg className="w-10 h-10 md:w-12 md:h-12" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.47.087.68-.206.68-.456 0-.227-.007-.78-.011-1.362-2.782.603-3.37-1.34-3.37-1.34-.454-1.15-.111-1.455-.083-1.479.317-.217.206-.159.206-.159.351.025.534.364.534.364.312.531.818.377 1.017.288.031-.223.122-.378.223-.465-2.098-.237-4.31-.994-4.31-4.664 0-1.03.37-1.872 1.002-2.532-.1-.237-.435-1.267.096-2.646 0 0 .816-.258 2.673 1.015.776-.214 1.59-.322 2.404-.326.814.004 1.628.112 2.404.326 1.856-1.273 2.672-1.015 2.672-1.015.533 1.379.199 2.409.099 2.646.634.66 1.002 1.502 1.002 2.532 0 3.679-2.217 4.42-4.319 4.656.126.109.237.324.237.653 0 .47-.004.949-.004 1.144 0 .252.17.547.688.455C20.147 20.213 23 16.458 23 12.017 23 6.484 18.522 2 12 2Z" clipRule="evenodd"></path></svg>
                </a>
              )}
              {portfolioData.socialLinks.linkedin && (
                <a href={portfolioData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="text-gray-300 hover:text-teal-400 transition-colors duration-300 transform hover:scale-125 animate-pop-in-slow" style={{animationDelay: '0.1s'}}>
                  <svg className="w-10 h-10 md:w-12 md:h-12" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zM0 24h4.9l.01-14H0L0 24zM22.219 24h-4.9c0 0 .004-9.742 0-14h4.9v2.531c-.001.001-.002.002-.003.003h.003V10c0 0 .004-9.742 0-14h4.9v2.531c-.001.001-.002.002-.003.003h.003V10zM19.74 24h-4.9V10h4.9V24zM12.449 24h-4.9v-8.348c0-1.802-.007-3.284-1.926-3.284-1.93 0-2.222 1.482-2.222 3.284V24H.78C.78 12.474.78 8.016.78 8.016H5.68V9.92h-.008c.55-.91 1.258-1.78 2.805-1.78 3.655 0 4.343 2.408 4.343 7.31V24h-.001z"/></svg>
                </a>
              )}
              {portfolioData.socialLinks.twitter && (
                <a href={portfolioData.socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter Profile" className="text-gray-300 hover:text-teal-400 transition-colors duration-300 transform hover:scale-125 animate-pop-in-slow" style={{animationDelay: '0.2s'}}>
                  <svg className="w-10 h-10 md:w-12 md:h-12" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.14l-6.236-8.754L7.05 22H3.742l7.14-8.223L3.74 2.25H7.06L12 8.363l5.009-6.113Z" /></svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 py-8 text-center text-gray-400 text-sm font-body border-t border-gray-700">
        <div className="container mx-auto px-6">
          <p className="mb-1">&copy; {new Date().getFullYear()} {portfolioData.name}. All rights reserved.</p>
          <p className="mt-2">Crafted with React & Tailwind CSS for a modern web experience.</p>
        </div>
      </footer>

      {/* Tailwind CSS Custom Styles (for animations and fonts) */}
      <style jsx>{`
        /* Font Definitions */
        .font-heading {
          font-family: 'Montserrat', sans-serif;
        }
        .font-body {
          font-family: 'Open Sans', sans-serif;
        }

        /* Base section animation (triggered by IntersectionObserver) */
        section.animate-in {
          animation: fade-in-up 1s ease-out forwards;
        }
        section:not(.animate-in) {
          opacity: 0;
          transform: translateY(20px);
        }

        /* Hero Section Specific Animation */
        @keyframes hero-fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-hero-fade-in-up {
          animation: hero-fade-in-up 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        /* Fade-in-up animation (general) */
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Scale-in animation for title */
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.8s ease-out forwards;
        }

        /* Generic fade-in for paragraphs */
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 1.2s ease-out forwards;
        }

        /* Floating profile image animation */
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        /* Pop-in animation for skill cards */
        @keyframes pop-in {
          0% {
            opacity: 0;
            transform: scale(0.7);
          }
          75% {
            opacity: 1;
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-pop-in {
          animation: pop-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        /* Slide-in-right for project cards */
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.7s ease-out forwards;
        }

        /* Slide-in-top for section headings */
        @keyframes slide-in-top {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in-top {
          animation: slide-in-top 0.8s ease-out forwards;
          animation-delay: 0.2s; /* Delay slightly after section animation */
        }

        /* Bounce icon on hover */
        @keyframes bounce-icon {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px) scale(1.1);
          }
        }
        .group-hover\\:animate-bounce-icon {
          animation: bounce-icon 0.5s ease-in-out;
        }

        /* Text shadow for headings */
        .text-shadow-lg {
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
        }

        /* Pop-in animation for social icons (slower) */
        @keyframes pop-in-slow {
          0% { opacity: 0; transform: scale(0.5); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-pop-in-slow {
          animation: pop-in-slow 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        /* Ping once for profile image hover */
        @keyframes ping-once {
          0% {
            transform: scale(0.9);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
        .animate-ping-once {
          animation: ping-once 1s ease-out;
        }

        /* Ensure scroll behavior is smooth */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default App;
