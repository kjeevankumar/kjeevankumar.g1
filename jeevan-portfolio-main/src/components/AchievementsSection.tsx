import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Award, Code, Briefcase } from 'lucide-react';

interface AchievementsSectionProps {
  isVisible: boolean;
}

const AchievementsSection: React.FC<AchievementsSectionProps> = ({ isVisible }) => {
  const achievements = [
    {
      icon: Briefcase,
      title: 'AICTE Internships',
      value: '2',
      description: 'Completed industry internships in AI/ML',
      highlight: 'Industry Experience'
    },
    {
      icon: Code,
      title: 'Projects Built',
      value: '3+',
      description: 'AI/ML models, security systems, and CV applications',
      highlight: 'AI/ML + CV'
    },
    {
      icon: Award,
      title: 'Certifications',
      value: '5+',
      description: 'From Microsoft, IBM, Infosys, Cisco, GeeksforGeeks',
      highlight: 'Industry Recognized'
    },
    {
      icon: Trophy,
      title: 'Hackathon Participant',
      value: '3+',
      description: 'Built prototypes under 48-hour constraints',
      highlight: 'Team Collaboration'
    }
  ];

  return (
    <section id="achievements" data-animate className="section-container bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-badge">Achievements</span>
          <h2 className="section-title">Highlights & Milestones</h2>
          <p className="section-subtitle">
            Key accomplishments that define my journey
          </p>
        </div>

        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {achievements.map((achievement, index) => (
            <Card 
              key={index} 
              className="group card-interactive border-0 overflow-hidden"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <achievement.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <span className="inline-block px-2.5 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-md mb-2">
                      {achievement.highlight}
                    </span>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-bold text-foreground">{achievement.value}</span>
                      <span className="text-sm font-semibold text-foreground">{achievement.title}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
