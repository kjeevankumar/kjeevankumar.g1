import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Download, Menu, X, Github, Linkedin, ArrowLeft } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import AnimatedLogo from './AnimatedLogo';

interface FloatingNavProps {
  scrollToSection: (sectionId: string) => void;
  isChatOpen?: boolean;
  onCloseChat?: () => void;
}

const FloatingNav: React.FC<FloatingNavProps> = ({ scrollToSection, isChatOpen, onCloseChat }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'internships', label: 'Internships' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'certifications', label: 'Certs' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'contact', label: 'Contact' }
  ];

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 50);

      // Determine active section
      const sections = navItems.map(item => item.id);
      let current = 'hero';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            current = section;
            break;
          }
        }
      }
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId === 'hero' ? '' : sectionId);
    setIsMobileMenuOpen(false);
  };

  const handleResumeClick = () => {
    window.open('https://drive.google.com/file/d/1CzWrjy9IQerQesgcyreZHLPq_hha-RRK/view?usp=sharing', '_blank');
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isVisible 
          ? 'py-2 bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm' 
          : 'py-4 bg-transparent'
      }`}>
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <AnimatedLogo onClick={() => handleNavClick('hero')} />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                    activeSection === item.id
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Right side actions */}
            <div className="hidden lg:flex items-center gap-2">
              <a 
                href="https://github.com/kjeevankumar?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-all duration-200 hover:scale-105"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="https://www.linkedin.com/in/k-jeevan-kumar-5333b32b8/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-all duration-200 hover:scale-105"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <ThemeToggle />
              <Button
                onClick={handleResumeClick}
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-5 h-10 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                <Download className="w-4 h-4 mr-2" />
                Resume
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <ThemeToggle />
              {isChatOpen && (
                <button
                  onClick={onCloseChat}
                  className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center transition-all duration-200 hover:scale-105 animate-scale-in"
                  aria-label="Close chat"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl hover:bg-secondary transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-foreground" />
                ) : (
                  <Menu className="w-5 h-5 text-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}>
          <div className="container mx-auto px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="flex items-center gap-3 pt-4 border-t border-border/50">
              <a 
                href="https://github.com/kjeevankumar?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="https://www.linkedin.com/in/k-jeevan-kumar-5333b32b8/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
            <Button 
              onClick={handleResumeClick}
              className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold h-12"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default FloatingNav;
