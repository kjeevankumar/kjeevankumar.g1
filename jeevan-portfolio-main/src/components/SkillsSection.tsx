import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Code, Database, Brain, Wrench, Eye, Network } from 'lucide-react';
import { motion } from 'framer-motion';

interface SkillsSectionProps {
  isVisible: boolean;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ isVisible }) => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skillCategories = [
    {
      title: 'Programming',
      icon: Code,
      skills: [
        { name: 'Python', level: 90 },
      ]
    },
    {
      title: 'AI & ML',
      icon: Brain,
      skills: [
        { name: 'Machine Learning', level: 85 },
        { name: 'Supervised Learning', level: 75 },
        { name: 'Unsupervised Learning', level: 70 },
        { name: 'Model Evaluation', level: 75 },
      ]
    },
    {
      title: 'Computer Vision',
      icon: Eye,
      skills: [
        { name: 'OpenCV', level: 70 },
        { name: 'Image Processing', level: 72 },
        { name: 'Feature Extraction', level: 68 },
      ]
    },
    {
      title: 'Libraries',
      icon: Network,
      skills: [
        { name: 'Scikit-learn', level: 75 },
        { name: 'Pandas', level: 88 },
        { name: 'NumPy', level: 85 },
        { name: 'Matplotlib', level: 70 },
      ]
    },
    {
      title: 'Concepts',
      icon: Brain,
      skills: [
        { name: 'Neural Networks', level: 70 },
        { name: 'Data Preprocessing', level: 85 },
        { name: 'Feature Engineering', level: 72 },
      ]
    },
    {
      title: 'Databases & Tools',
      icon: Database,
      skills: [
        { name: 'SQL', level: 70 },
        { name: 'MySQL', level: 55 },
        { name: 'Git', level: 72 },
        { name: 'Tableau', level: 50 },
      ]
    },
  ];

  const getLevelLabel = (level: number) => {
    if (level >= 80) return 'Advanced';
    if (level >= 60) return 'Intermediate';
    return 'Basic';
  };

  const getLevelColor = (level: number) => {
    if (level >= 80) return 'bg-primary';
    if (level >= 60) return 'bg-accent';
    return 'bg-muted-foreground/50';
  };

  return (
    <section id="skills" data-animate className="section-container bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-badge">Skills</span>
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle">
            Technologies and tools I work with
          </p>
        </div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card className="group card-interactive border-0 overflow-hidden h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                      <category.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{category.title}</h3>
                  </div>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className="group/skill cursor-default"
                        onMouseEnter={() => setHoveredSkill(`${index}-${skillIndex}`)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm text-foreground font-medium group-hover/skill:text-primary transition-colors">
                            {skill.name}
                          </span>
                          <span className={`text-xs font-semibold transition-colors ${
                            skill.level >= 80 ? 'text-primary' : skill.level >= 60 ? 'text-accent' : 'text-muted-foreground'
                          }`}>
                            {hoveredSkill === `${index}-${skillIndex}` ? `${skill.level}%` : getLevelLabel(skill.level)}
                          </span>
                        </div>
                        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${getLevelColor(skill.level)}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + skillIndex * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
