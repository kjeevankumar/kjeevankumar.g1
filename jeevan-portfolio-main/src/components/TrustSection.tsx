import React from 'react';
import { Users, FolderKanban, Award, Trophy } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

interface TrustSectionProps {
  isVisible: boolean;
}

const TrustSection: React.FC<TrustSectionProps> = ({ isVisible }) => {
  const stats = [
    { icon: FolderKanban, value: 3, suffix: '+', label: 'Projects Built' },
    { icon: Award, value: 5, suffix: '+', label: 'Certifications' },
    { icon: Users, value: 20, suffix: '+', label: 'Students Mentored' },
    { icon: Trophy, value: 8.43, suffix: '', label: 'CGPA' },
  ];

  const tools = [
    { name: 'Python', icon: '🐍' },
    { name: 'OpenCV', icon: '👁️' },
    { name: 'Scikit-learn', icon: '🧠' },
    { name: 'Pandas', icon: '🐼' },
    { name: 'MySQL', icon: '🐬' },
    { name: 'Git', icon: '📦' },
    { name: 'Tableau', icon: '📊' },
  ];

  return (
    <section className="py-16 md:py-20 bg-secondary/30 border-y border-border/50">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {/* Stats Grid */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="group relative bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} isVisible={isVisible} />
                </div>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tools Used */}
        <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-center text-sm text-muted-foreground mb-6 uppercase tracking-wider font-medium">
            Tools & Technologies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
            {tools.map((tool, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 px-4 py-2.5 bg-card rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300 cursor-default"
              >
                <span className="text-xl">{tool.icon}</span>
                <span className="text-sm font-medium text-foreground">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
