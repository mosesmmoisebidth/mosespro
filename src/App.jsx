import React, { useState, useEffect } from 'react';
import { 
  ExternalLink, 
  Github, 
  ArrowUpRight,
  Coffee,
  Heart
} from 'lucide-react';
import PortfolioChatbot from './PortfolioChatbot';

const PortfolioShowcase = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = {
    web: {
      company: [
        {
          title: "TaskBees",
          role: "Senior Full-Stack Developer",
          description: "Enterprise Level Job Management, Application Platform aimed at joining the job seekers with the Employers",
          tech: ["React", "Node.js", "GoLang", "PostgresQL", "AWS"],
          links: { website: "https://taskbees.net", github: "#" }
        },
        {
          title: "T Global Software",
          role: "Lead Frontend Developer & Mobile", 
          description: "Modern e-commerce platform with AI-powered recommendations, seamless payment integration, and responsive design.",
          tech: ["React", "TypeScript", "AWS", "Java", "Springboot"],
          links: { website: "https://jivahcollections.com", github: "#" }
        },
        {
          title: "CryptaVita",
          role: "Backend Developer",
          description: "Early Warning system to warn about disasters using real time data and intelligent decision making",
          tech: ["Python", "Tensorflow", "Node.js", "AWS Lambda", "AWS AI"],
          links: { website: "https://cryptavita.vercel.app", github: "#" }
        },
        {
          title: "Mashirika",
          role: "Full-Stack Developer",
          description: "Community platform for the Ubumuntu arts festival event location and Mapping.",
          tech: ["Next.js", "Prisma", "PostgreSQL", "Google Maps", "Docker"],
          links: { website: "https://ubumuntu.vercel.app", github: "#" }
        },
        {
          title: "My Wallet",
          role: "Wallet Monitoring System",
          description: "Expenses Management App & Wallet transactions management",
          tech: ["React", "D3.js", "Express", "Redis", "PostgresQL", "AWS", "Docker", "Java", "Springboot"],
          links: { website: "https://expense-frontend-cyan.vercel.app/", github: "#" }
        }
      ],
      professional: [
        {
          title: "Tourism Web App",
          role: "Tourism Guidance & Monitoring",
          description: "Tourism web app for travellers to plan trips, hotels & bookings",
          tech: ["Angular", "Spring Boot", "MySQL", "AWS"],
          links: { website: "https://tourismapp.moses.it.com/", github: "#" }
        }
      ],
      personal: [
        {
          title: "Eventra",
          role: "Event Management SYstem",
          description: "Event Management System for managing events, tickets, attendees, and vendors",
          tech: ["Gatsby", "GraphQL", "Contentful", "Netlify"],
          links: { website: "https://eventra-two.vercel.app/", github: "https://github.com/mosesmmoisebidth/eventra-backend-v2.git" }
        }
      ]
    },
    mobile: {
      company: [
        {
          title: "Jivah Mobile(Playstore & Appstore)",
          role: "React-Native Developer",
          description: "Cross-platform mobile app for seamless shopping experience with offline capabilities.",
          tech: ["React Native", "Redux", "Firebase"],
          links: { playstore: "https://play.google.com/store/apps/details?id=com.netfella.jivah", github: "#" }
        },
        {
          title: "TaskBees Mobile",
          role: "Flutter Developer",
          description: "Mobile companion app for Job Management and connecting job seekers with employers",
          tech: ["Flutter", "BLoC", "Machine Learning", "SocketIO"],
          links: { github: "#" }
        }
      ],
      professional: [
        {
          title: "AiMobileTutor",
          role: "AI Mobile Developer",
          description: "AI-powered educational app with personalized learning paths and speech recognition",
          tech: ["React-Native", "TensorFlow Lite", "Firebase ML", "SocketIO"],
          links: { apk: "https://shareallfiles.net/nC7K43", github: "https://github.com/mosesmmoisebidth/AI-Tutor-Mobile.git" }
        },
        {
          title: "Sports App",
          role: "Mobile Developer",
          description: "Comprehensive sports tracking and analytics app with social features.",
          tech: ["Flutter", "GoLang", "AWS Amplify", "BLoC", "Firebase"],
          links: { apk: "https://shareallfiles.net/_NZlhQ", github: "https://github.com/mosesmmoisebidth/Inzora-Platforms-Music-App.git" }
        },
        {
          title: "NaviGO Mobile",
          role: "Lead Mobile Developer",
          description: "GPS navigation app with offline maps, traffic updates, and voice guidance.",
          tech: ["Flutter", "MapBox", "SQLite"],
          links: { apk: "#", github: "#" }
        }
      ]
    },
    desktop: [
      {
        title: "Goose AI",
        role: "Desktop Developer",
        description: "Advanced AI desktop application for Agentic coding of projects",
        tech: ["Rust", "Python", "TensorFlow", "React"],
        links: { download: "https://github.com/block/goose/releases/tag/v1.12.1", github: "https://github.com/block/goose", demo: "https://block.github.io/goose/" }
      },
      {
        title: "MOCP",
        role: "File Transfer tool",
        description: "File Transfer tool for transferring files between multiple hosts",
        tech: ["InnoSetup", "Go"],
        links: { download: "https://github.com/mosesmmoisebidth/mocp/releases/tag/v1.0.0", github: "https://github.com/mosesmmoisebidth/mocp.git", demo: "https://mocp-web.vercel.app/" }
      }
    ],
    ai: [
      {
        title: "UWU CLI",
        role: "ML Engineer",
        description: "Terminal Command completion from the natural language",
        tech: ["Python", "Go", "Rust", "Javascript"],
        links: { github: "https://github.com/mosesmmoisebidth/uwu.git", demo: "https://uwu-frontend.vercel.app/" }
      },
      {
        title: "MOCP",
        role: "File Transfer Tool",
        description: "Secured & Optimised File transfer tool known for its speed",
        tech: ["InnoSetup", "Go"],
        links: { github: "https://github.com/mosesmmoisebidth/mocp", demo: "https://mocp-web.vercel.app/" }
      },
      {
        title: "Multi-Modal Chatbot",
        role: "AI Developer",
        description: "Intelligent chatbot supporting text, voice, and image inputs with contextual responses.",
        tech: ["Python", "Transformers", "Streamlit", "HuggingFace"],
        links: { github: "https://github.com/mosesmmoisebidth/multi-modality-models", huggingface: "https://huggingface.co/posts/KingNish/935677474633200", demo: "#" }
      },
    ]
  };

  const getAllProjects = () => {
    const allProjects = [];
    Object.entries(projects).forEach(([category, categoryProjects]) => {
      if (typeof categoryProjects === 'object' && !Array.isArray(categoryProjects)) {
        Object.entries(categoryProjects).forEach(([subcategory, projectList]) => {
          projectList.forEach(project => {
            allProjects.push({ ...project, category, subcategory });
          });
        });
      } else {
        categoryProjects.forEach(project => {
          allProjects.push({ ...project, category });
        });
      }
    });
    return allProjects;
  };

  const filteredProjects = activeCategory === 'all' 
    ? getAllProjects()
    : getAllProjects().filter(project => project.category === activeCategory);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'web', label: 'Web' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'desktop', label: 'Desktop' },
    { id: 'ai', label: 'AI' }
  ];

  return (
    <div className="bg-black text-white min-h-screen font-light">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="flex justify-between items-center py-8">
            <div className="text-xl tracking-wider font-light">
              <span className="text-white">PORTFOLIO</span>
            </div>
            <div className="hidden md:flex items-center space-x-12">
              <a href="https://moses.it.com" className="text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors duration-300">Home</a>
              <a href="https://blog.moses.it.com" className="text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors duration-300">Blog</a>
              <a href="mailto:intambwefit@moses.it.com" className="text-xs tracking-widest uppercase border border-white/20 hover:border-white/40 px-6 py-3 transition-all duration-300">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-32 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h1 className="text-7xl md:text-9xl font-extralight mb-8 tracking-tight">
              Selected Work
            </h1>
            <div className="w-24 h-px bg-white/20 mb-12"></div>
            <p className="text-xl text-white/60 max-w-2xl leading-relaxed">
              A collection of projects spanning web, mobile, desktop, and artificial intelligence. 
              Each one built with precision and purpose.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-32 pb-20 border-b border-white/5">
            <div>
              <div className="text-5xl font-extralight mb-3">25+</div>
              <div className="text-xs tracking-widest uppercase text-white/40">Projects</div>
            </div>
            <div>
              <div className="text-5xl font-extralight mb-3">15+</div>
              <div className="text-xs tracking-widest uppercase text-white/40">Technologies</div>
            </div>
            <div>
              <div className="text-5xl font-extralight mb-3">8+</div>
              <div className="text-xs tracking-widest uppercase text-white/40">AI Solutions</div>
            </div>
            <div>
              <div className="text-5xl font-extralight mb-3">6+</div>
              <div className="text-xs tracking-widest uppercase text-white/40">Years</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-28 bg-black/95 backdrop-blur-sm z-40 border-b border-white/5 px-8 lg:px-16 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`text-xs tracking-widest uppercase transition-colors duration-300 ${
                  activeCategory === category.id
                    ? 'text-white'
                    : 'text-white/40 hover:text-white/60'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-32">
            {filteredProjects.map((project, index) => (
              <div
                key={`${project.title}-${index}`}
                className="border-b border-white/5 pb-20"
              >
                <div className="grid lg:grid-cols-12 gap-16">
                  {/* Left: Project Info */}
                  <div className="lg:col-span-7 space-y-8">
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-xs tracking-widest uppercase text-white/40">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="h-px flex-1 bg-white/10"></div>
                        <span className="text-xs tracking-wider uppercase text-white/40">
                          {project.category}
                        </span>
                      </div>
                      
                      <h2 className="text-5xl md:text-6xl font-extralight mb-6 tracking-tight">
                        {project.title}
                      </h2>
                      
                      <p className="text-sm tracking-wider uppercase text-white/40 mb-8">
                        {project.role}
                      </p>
                      
                      <p className="text-lg text-white/60 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack */}
                    <div>
                      <div className="text-xs tracking-widest uppercase text-white/40 mb-4">
                        Technology
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="text-xs tracking-wider text-white/60 border border-white/10 px-4 py-2"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Links */}
                  <div className="lg:col-span-5 flex flex-col justify-between">
                    <div className="space-y-4">
                      {Object.entries(project.links).map(([linkType, url]) => {
                        let label;
                        switch(linkType) {
                          case 'website': label = 'Visit Site'; break;
                          case 'github': label = 'Source Code'; break;
                          case 'download': label = 'Download'; break;
                          case 'apk': label = 'Download APK'; break;
                          case 'playstore': label = 'Play Store'; break;
                          case 'huggingface': label = 'HuggingFace'; break;
                          case 'demo': label = 'Live Demo'; break;
                          default: label = linkType;
                        }

                        return (
                          <a
                            key={linkType}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between py-4 border-b border-white/10 hover:border-white/30 transition-all duration-300"
                          >
                            <span className="text-sm tracking-wider uppercase text-white/60 group-hover:text-white transition-colors">
                              {label}
                            </span>
                            <ArrowUpRight size={16} className="text-white/40 group-hover:text-white transition-colors" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Open Source Section */}
          <div className="mt-40 border-t border-white/5 pt-20">
            <div className="grid lg:grid-cols-2 gap-20">
              <div>
                <h3 className="text-4xl md:text-5xl font-extralight mb-6 tracking-tight">
                  Open Source
                </h3>
                <p className="text-lg text-white/60 leading-relaxed mb-8">
                  Contributing to the developer community through open-source projects and shared knowledge.
                </p>
                <a
                  href="https://projects.moses.it.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-sm tracking-wider uppercase border border-white/20 hover:border-white/40 px-8 py-4 transition-all duration-300"
                >
                  CHECK MORE HERE
                  <ArrowUpRight size={14} />
                </a>
              </div>

              <div className="space-y-6">
                <div className="border-l border-white/10 pl-6">
                  <div className="text-xs tracking-widest uppercase text-white/40 mb-3">Repository</div>
                  <a href="https://github.com/mosesmmoisebidth/mocp.git" className="text-lg hover:text-white/80 transition-colors">
                    MOCP(File Transfer)
                  </a>
                </div>
                <div className="border-l border-white/10 pl-6">
                  <div className="text-xs tracking-widest uppercase text-white/40 mb-3">Repository</div>
                  <a href="https://github.com/mosesmmoisebidth/uwu.git" className="text-lg hover:text-white/80 transition-colors">
                    UWU CLI(Terminal Command Completion)
                  </a>
                </div>
                <div className="border-l border-white/10 pl-6">
                  <div className="text-xs tracking-widest uppercase text-white/40 mb-3">Repository</div>
                  <a href="https://github.com/block/goose" className="text-lg hover:text-white/80 transition-colors">
                    Goose AI(AI Coding Assistant)
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Support Section */}
          <div className="mt-40 border-t border-white/5 pt-20">
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-4xl md:text-5xl font-extralight mb-6 tracking-tight">
                Support My Work
              </h3>
              <p className="text-lg text-white/60 leading-relaxed mb-12">
                If you find my projects valuable, consider supporting my open-source contributions and ongoing development work.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                  href="https://buymeacoffee.com/mucyomoses"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 border border-white/20 hover:border-white/40 px-8 py-4 transition-all duration-300"
                >
                  <Coffee size={18} className="text-white/60 group-hover:text-white transition-colors" />
                  <span className="text-sm tracking-wider uppercase">Buy Me Coffee</span>
                </a>

                <a
                  href="https://github.com/sponsors/mosesmmoisebidth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 border border-white/20 hover:border-white/40 px-8 py-4 transition-all duration-300"
                >
                  <Heart size={18} className="text-white/60 group-hover:text-white transition-colors" />
                  <span className="text-sm tracking-wider uppercase">Sponsor on GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-xs text-white/40 tracking-widest uppercase">
            © 2025 Moses Portfolio
          </div>
        </div>
      </footer>

      <style jsx>{`
        html {
          scroll-behavior: smooth;
        }
        
        ::-webkit-scrollbar {
          width: 2px;
        }
        
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
        }
      `}</style>
      <PortfolioChatbot />
    </div>
  );
};

export default PortfolioShowcase;