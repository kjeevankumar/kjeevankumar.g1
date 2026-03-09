import React from 'react';
import { Linkedin, Github, Mail, Heart, Code2, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Internships', href: '#internships' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/k-jeevan-kumar-5333b32b8/', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/kjeevankumar?tab=repositories', label: 'GitHub' },
    { icon: Mail, href: 'mailto:kjeevankumar944@gmail.com', label: 'Email' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-foreground text-background overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Main Footer */}
      <div className="relative container mx-auto px-4 md:px-6 py-10 md:py-16 max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 space-y-4 md:space-y-6">
            <a href="#hero" className="text-3xl font-bold inline-block hover:opacity-80 transition-opacity">
              JK<span className="text-primary">.</span>
            </a>
            <p className="text-background/70 max-w-md leading-relaxed">
              AI/ML Developer & Full Stack Developer passionate about building intelligent systems and scalable web applications that solve real-world problems.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-background/10 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h4 className="text-sm font-bold uppercase tracking-wider">Quick Links</h4>
            <nav className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-background/70 hover:text-primary transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h4 className="text-sm font-bold uppercase tracking-wider">Get In Touch</h4>
            <div className="space-y-3">
              <a 
                href="mailto:kjeevankumar944@gmail.com"
                className="block text-background/70 hover:text-primary transition-colors text-sm"
              >
                kjeevankumar944@gmail.com
              </a>
              <p className="text-background/70 text-sm">
                Telangana, India
              </p>
              <div className="pt-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                  Open to opportunities
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-background/10 flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
          <p className="text-sm text-background/60 flex items-center gap-2">
            Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> by K. Jeevan Kumar
          </p>
          <p className="text-sm text-background/60">
            © {currentYear} All rights reserved
          </p>
          <p className="text-sm text-background/50 flex items-center gap-2">
            <Code2 className="w-4 h-4" />
            Built with React + TailwindCSS
          </p>
        </div>
      </div>

      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
};

export default Footer;
