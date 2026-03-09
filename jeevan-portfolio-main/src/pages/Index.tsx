import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import TrustSection from '@/components/TrustSection';
import AboutSection from '@/components/AboutSection';
import InternshipsSection from '@/components/InternshipsSection';
import ServicesSection from '@/components/ServicesSection';
import EducationSection from '@/components/EducationSection';
import ExperienceSection from '@/components/ExperienceSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import AchievementsSection from '@/components/AchievementsSection';
import CertificationsSection from '@/components/CertificationsSection';

import GitHubSection from '@/components/GitHubSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import FloatingNav from '@/components/FloatingNav';
import PageLoader from '@/components/PageLoader';
import AIChatbot from '@/components/AIChatbot';
import CustomCursor from '@/components/CustomCursor';
import BackgroundEffect from '@/components/BackgroundEffect';
import AnimatedSection from '@/components/AnimatedSection';
import DarkModeSuggestion from '@/components/DarkModeSuggestion';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import { ThemeProvider } from '@/hooks/use-theme';

const Index = () => {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isContentReady, setIsContentReady] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsPageLoading(false);
    }, 1500);
    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    if (!isPageLoading) {
      const contentTimer = setTimeout(() => {
        setIsContentReady(true);
      }, 200);
      return () => clearTimeout(contentTimer);
    }
  }, [isPageLoading]);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === '') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleLoadingComplete = () => {
    setIsPageLoading(false);
  };

  return (
    <ThemeProvider>
      <ScrollProgressBar />
      <BackgroundEffect />
      <CustomCursor />
      <AIChatbot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
      <DarkModeSuggestion />
      <PageLoader isLoading={isPageLoading} onLoadingComplete={handleLoadingComplete} />
      
      <AnimatePresence>
        {isContentReady && (
          <motion.div
            className="flex flex-col min-h-screen bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <FloatingNav scrollToSection={scrollToSection} isChatOpen={isChatOpen} onCloseChat={() => setIsChatOpen(false)} />
            
            <main className="flex-1 flex flex-col">
              {/* Hero - fade in immediately */}
              <motion.section
                id="hero"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <HeroSection scrollToSection={scrollToSection} />
              </motion.section>

              <AnimatedSection id="trust" delay={0.05}>
                <TrustSection isVisible={true} />
              </AnimatedSection>

              <AnimatedSection id="about" direction="left">
                <AboutSection isVisible={true} />
              </AnimatedSection>

              <AnimatedSection id="internships" direction="right">
                <InternshipsSection isVisible={true} />
              </AnimatedSection>

              <AnimatedSection id="services" direction="up">
                <ServicesSection isVisible={true} />
              </AnimatedSection>

              <AnimatedSection id="education" direction="left">
                <EducationSection isVisible={true} />
              </AnimatedSection>

              <AnimatedSection id="experience" direction="right">
                <ExperienceSection isVisible={true} />
              </AnimatedSection>

              <AnimatedSection id="skills" direction="up">
                <SkillsSection isVisible={true} />
              </AnimatedSection>

              <AnimatedSection id="projects" direction="up">
                <ProjectsSection isVisible={true} />
              </AnimatedSection>

              <AnimatedSection id="achievements" direction="left">
                <AchievementsSection isVisible={true} />
              </AnimatedSection>

              <AnimatedSection id="certifications" direction="right">
                <CertificationsSection isVisible={true} />
              </AnimatedSection>


              <AnimatedSection id="github" direction="up">
                <GitHubSection isVisible={true} />
              </AnimatedSection>

              <AnimatedSection id="contact" direction="up" delay={0.1}>
                <ContactSection isVisible={true} />
              </AnimatedSection>
            </main>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Footer />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default Index;
