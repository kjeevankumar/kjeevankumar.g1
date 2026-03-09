import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, FileText, TrendingUp, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CaseStudyModal from './CaseStudyModal';

interface ProjectsSectionProps {
  isVisible: boolean;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ isVisible }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const projects = [
    {
      title: 'Leak Guard AI',
      description: 'AI-driven leak detection system for pipeline monitoring using machine learning techniques with data preprocessing and feature engineering.',
      tech: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib'],
      category: 'AI/ML',
      features: ['Developed AI-based leak detection system for pipeline monitoring', 'Performed data cleaning, preprocessing, and feature engineering to improve model accuracy', 'Applied machine learning techniques for predictive leak detection'],
      impact: 'Preventing environmental damage through early detection',
      duration: 'July 2025 – Present',
      demo: '#',
      github: 'https://github.com/kjeevankumar?tab=repositories',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop',
      hasDemo: false,
      metrics: { accuracy: '94%', type: 'Detection Rate' },
      caseStudy: {
        problem: 'Industrial pipelines and storage tanks are prone to leaks that can cause environmental damage and financial losses. Traditional monitoring methods are often delayed and reactive.',
        solution: 'Developed an AI-powered system using machine learning to detect leaks through data-driven analysis of pipeline infrastructure.',
        methodology: 'Implemented using Python with Pandas, NumPy, and Scikit-learn. Performed data cleaning, preprocessing, and feature engineering to improve model accuracy.',
        results: ['AI-based leak detection for pipeline monitoring', 'Improved model accuracy through feature engineering', 'Data preprocessing pipeline for real-time analysis', '94% detection accuracy achieved'],
        futureImprovements: ['Integration with IoT sensors', 'Mobile app for alerts', 'Computer vision enhancement', 'Cloud-based monitoring dashboard']
      }
    },
    {
      title: 'Intelligent Data-Driven Model for Intra-Vehicle Security',
      description: 'ML-based security model to protect intra-vehicle communication systems from cyber-attacks using Intrusion Detection System on CAN protocol.',
      tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib'],
      category: 'Security',
      features: ['Built ML-based security model to protect intra-vehicle communication systems from cyber-attacks', 'Designed Intrusion Detection System (IDS) to detect abnormal and malicious message patterns', 'Analyzed CAN protocol data for vehicle network security'],
      impact: 'Enhancing automotive cybersecurity',
      duration: 'Nov 2024 – Dec 2024',
      demo: '#',
      github: 'https://github.com/kjeevankumar?tab=repositories',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop',
      hasDemo: false,
      metrics: { accuracy: '97%', type: 'Detection Accuracy' },
      caseStudy: {
        problem: 'Modern vehicles rely on CAN bus for internal communication, making them vulnerable to cyber attacks like DoS attacks that can compromise vehicle safety.',
        solution: 'Developed an ML-based intrusion detection system to detect abnormal and malicious message patterns in vehicle networks.',
        methodology: 'Used Python with Scikit-learn for model development, analyzing CAN bus data patterns to identify anomalies in intra-vehicle communications.',
        results: ['97% DoS attack detection accuracy', 'Real-time threat identification via IDS', 'Low false positive rate', 'CAN protocol security analysis'],
        futureImprovements: ['Deep learning implementation', 'Real-time vehicle integration', 'Multi-attack type detection', 'Edge computing deployment']
      }
    },
    {
      title: 'Currency Recognition & Classification',
      description: 'Computer vision-based currency recognition system to classify different denominations using OpenCV and machine learning techniques.',
      tech: ['Python', 'OpenCV', 'Scikit-learn', 'Image Processing'],
      category: 'AI/ML',
      features: ['Developed CV-based currency recognition system for accurate denomination classification', 'Implemented OpenCV techniques: grayscale conversion, edge detection, contour detection, and segmentation', 'Applied feature extraction and ML classification for recognition accuracy'],
      impact: 'Automating currency identification for accessibility',
      duration: '2024',
      demo: '#',
      github: 'https://github.com/kjeevankumar?tab=repositories',
      image: '/currency-recognition.png',
      hasDemo: false,
      metrics: { accuracy: '92%', type: 'Classification Rate' },
      caseStudy: {
        problem: 'Manual currency identification is time-consuming and error-prone, especially for visually impaired individuals.',
        solution: 'Developed a computer vision-based system using OpenCV and ML to automatically classify currency denominations.',
        methodology: 'Implemented grayscale conversion, edge detection, contour detection, and segmentation using OpenCV. Applied feature extraction and Scikit-learn classifiers.',
        results: ['Accurate denomination classification', 'Real-time image processing pipeline', 'Multiple OpenCV technique integration', '92% classification accuracy'],
        futureImprovements: ['Deep learning with CNNs', 'Mobile app deployment', 'Multi-currency support', 'Real-time video processing']
      }
    },
    {
      title: 'Portfolio Website',
      description: 'Premium personal portfolio showcasing skills and projects with modern design, smooth animations, and dark mode support.',
      tech: ['React', 'TypeScript', 'TailwindCSS'],
      category: 'Web',
      features: ['Responsive premium design with dark/light mode', 'Smooth scroll animations and transitions', 'Case study modals for project deep-dives'],
      impact: 'Showcasing technical expertise to recruiters',
      duration: 'Feb 2025 – Mar 2025',
      demo: 'https://jeevan-portfolio.lovable.app',
      github: 'https://github.com/kjeevankumar?tab=repositories',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop',
      hasDemo: true,
      metrics: { accuracy: '100%', type: 'Mobile Responsive' }
    }
  ];

  const filters = ['All', 'Web', 'AI/ML', 'Security'];

  const filteredProjects = projects.filter(p => {
    const matchesFilter = activeFilter === 'All' || p.category === activeFilter;
    const matchesSearch = searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="projects" data-animate className="section-container bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-badge">Portfolio</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Case studies showcasing innovative solutions built with cutting-edge technologies
          </p>
        </div>

        {/* Search + Filters */}
        <div className={`flex flex-col sm:flex-row items-center gap-4 mb-12 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative w-full sm:w-auto sm:flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-secondary/50 border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:bg-background transition-all duration-300"
            />
          </div>
          <div className="flex gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${activeFilter === filter
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-105'
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card className="group relative bg-card border border-border/50 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 h-full">
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-card/90 backdrop-blur-sm text-xs font-bold text-primary rounded-lg">
                        {project.category}
                      </span>
                    </div>

                    {project.metrics && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-bold rounded-lg flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {project.metrics.accuracy}
                        </span>
                      </div>
                    )}

                    <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      {project.hasDemo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                      )}
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center gap-2 py-2.5 bg-card text-foreground rounded-xl text-sm font-semibold hover:bg-card/90 transition-colors ${project.hasDemo ? 'px-4' : 'flex-1'}`}
                      >
                        <Github className="w-4 h-4" />
                        {!project.hasDemo && 'View Code'}
                      </a>
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                    </div>

                    <ul className="space-y-2">
                      {project.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 3).map((tech, techIndex) => (
                          <span key={techIndex} className="text-xs px-3 py-1.5 rounded-lg bg-secondary font-medium text-secondary-foreground">
                            {tech}
                          </span>
                        ))}
                      </div>
                      {project.caseStudy && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-primary hover:bg-primary/10 rounded-lg font-semibold"
                          onClick={() => setSelectedProject(project)}
                        >
                          <FileText className="w-4 h-4 mr-1" />
                          Case Study
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted-foreground py-12"
          >
            No projects found matching "{searchQuery}"
          </motion.p>
        )}

        {/* View All */}
        <div className={`text-center mt-12 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a
            href="https://github.com/kjeevankumar?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="rounded-2xl px-8 h-12 font-semibold group hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
              View All Projects on GitHub
              <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </div>
      </div>

      <CaseStudyModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default ProjectsSection;
