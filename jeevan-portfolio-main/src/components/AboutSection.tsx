import React, { useState } from 'react';
import { Download, Brain, Globe, Zap, Briefcase, GraduationCap, Trophy, Rocket } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface AboutSectionProps {
  isVisible: boolean;
}

const AboutSection: React.FC<AboutSectionProps> = ({ isVisible }) => {
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleResumeDownload = async () => {
    setIsDownloading(true);
    
    try {
      window.open('https://drive.google.com/file/d/1CzWrjy9IQerQesgcyreZHLPq_hha-RRK/view?usp=sharing', '_blank');

      toast({
        title: "Download Started",
        description: "Your resume download has been initiated successfully!",
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Error",
        description: "There was an issue downloading the resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setTimeout(() => {
        setIsDownloading(false);
      }, 1500);
    }
  };

  const highlights = [
    { icon: Brain, label: 'AI/ML Focus', description: 'Machine learning & intelligent systems' },
    { icon: Globe, label: 'Computer Vision', description: 'OpenCV & image processing' },
    { icon: Zap, label: 'Fast Learner', description: 'Quick technology adoption' },
    { icon: Rocket, label: 'Problem Solver', description: 'Creative technical solutions' },
  ];

  const coreStack = ['Python', 'Machine Learning', 'OpenCV', 'Pandas'];

  const currentWork = [
    { icon: '🤖', label: 'LeakGuard AI - CV-based leak detection' },
    { icon: '📊', label: 'Currency Recognition System' },
    { icon: '💻', label: 'DSA & System Design Prep' },
  ];

  return (
    <section id="about" data-animate className="section-container bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-badge">About Me</span>
          <h2 className="section-title">Passionate About Building Technology</h2>
          <p className="section-subtitle">
            Creating innovative solutions that make a positive impact
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Image + Highlights + Core Stack + CTA */}
          <div className={`space-y-5 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
              <div className="relative bg-card rounded-3xl shadow-xl overflow-hidden border border-border/50">
                <img 
                  src="/lovable-uploads/daf2f8cf-32b9-488b-bd40-dd9697cca109.png" 
                  alt="K. Jeevan Kumar"
                  className="w-full h-auto object-cover"
                />
                {/* Floating label */}
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 bg-card/90 backdrop-blur-sm rounded-full border border-border/50 shadow-lg text-sm font-semibold text-foreground flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-primary" />
                    B.Tech AI/ML
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Highlights */}
            <div className="grid grid-cols-2 gap-3">
              {highlights.map((item, index) => (
                <div key={index} className="group flex items-start gap-3 p-4 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{item.label}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Core Stack */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-foreground">Core Stack</h4>
              <div className="flex flex-wrap gap-2">
                {coreStack.map((tech, index) => (
                  <span key={index} className="px-4 py-2 bg-secondary rounded-xl text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Button 
              onClick={handleResumeDownload}
              disabled={isDownloading}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl px-6 h-12 font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              {isDownloading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Downloading...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Resume
                </span>
              )}
            </Button>
          </div>

          {/* Content */}
          <div className={`space-y-5 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            {/* Bio Bullets */}
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Final year B.Tech student specializing in <strong className="text-foreground">AI & Machine Learning</strong> at MRIET, Hyderabad.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Strong in <strong className="text-foreground">Python, Computer Vision, and Machine Learning</strong> with hands-on project experience.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Built real-world projects like <strong className="text-foreground">LeakGuard AI</strong>, <strong className="text-foreground">Intra-Vehicle Security</strong>, and <strong className="text-foreground">Currency Recognition</strong>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Aiming to develop intelligent systems involving <strong className="text-foreground">LLMs, deep learning, and predictive modeling</strong>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span><strong className="text-foreground">Soft Skills:</strong> Good communication, teamwork, problem-solving, teaching & presentation, adaptability, time management.</span>
              </li>
            </ul>

            {/* Currently Working On */}
            <Card className="bg-secondary/50 border-border/50 rounded-2xl">
              <CardContent className="p-5">
                <h4 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  Currently Working On
                </h4>
                <div className="space-y-3">
                  {currentWork.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="text-lg">{item.icon}</span>
                      {item.label}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
