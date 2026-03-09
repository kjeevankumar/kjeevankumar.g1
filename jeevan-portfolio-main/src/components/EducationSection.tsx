import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, GraduationCap, Award } from 'lucide-react';

interface EducationSectionProps {
  isVisible: boolean;
}

const EducationSection: React.FC<EducationSectionProps> = ({ isVisible }) => {
  const education = [
    {
      degree: 'B.Tech - AI & Machine Learning',
      institution: 'Malla Reddy Institute of Engineering and Technology (MRIET)',
      location: 'Hyderabad, Telangana, India',
      duration: '2022 – 2026',
      score: 'CGPA: 8.43/10',
      status: 'Final Year',
      highlights: ['AI/ML Specialization', 'Active in coding competitions', 'Technical society member'],
      current: true
    },
    {
      degree: 'Intermediate (12th) - MPC',
      institution: 'Viswasanthi Junior College',
      location: 'Telangana, India',
      duration: '2020 – 2022',
      score: '69%',
      status: 'Completed',
      highlights: ['Mathematics, Physics, Chemistry', 'Strong analytical foundation'],
      current: false
    },
    {
      degree: 'Secondary School (10th)',
      institution: 'ZPHS Bhairapuram',
      location: 'Telangana, India',
      duration: '2019 – 2020',
      score: '95%',
      status: 'Completed',
      highlights: ['State board examination', 'Excellent academic performance'],
      current: false
    }
  ];

  return (
    <section id="education" data-animate className="section-container bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-badge">Education</span>
          <h2 className="section-title">Academic Journey</h2>
          <p className="section-subtitle">
            Building a strong foundation in technology and innovation
          </p>
        </div>

        {/* Timeline */}
        <div className={`relative max-w-4xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block" />

          <div className="space-y-8">
            {education.map((edu, index) => (
              <div key={index} className="relative">
                {/* Timeline dot */}
                <div className={`absolute left-6 top-8 w-4 h-4 rounded-full border-4 border-background z-10 hidden md:block ${edu.current ? 'bg-primary animate-pulse' : 'bg-primary/60'}`} 
                  style={{ boxShadow: edu.current ? '0 0 0 4px hsl(var(--primary) / 0.2)' : 'none' }}
                />

                <Card className={`md:ml-16 card-interactive border-0 ${edu.current ? 'ring-2 ring-primary/20' : ''}`}>
                  <CardContent className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      {/* Icon */}
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${edu.current ? 'bg-primary/10' : 'bg-secondary'}`}>
                        <GraduationCap className={`w-7 h-7 ${edu.current ? 'text-primary' : 'text-muted-foreground'}`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-4">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
                          <div>
                            <h3 className="text-xl font-bold text-foreground">{edu.degree}</h3>
                            <p className="text-primary font-semibold">{edu.institution}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${edu.current ? 'bg-primary/10 text-primary' : 'bg-secondary text-secondary-foreground'}`}>
                              {edu.status}
                            </span>
                            <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full bg-accent/10 text-accent">
                              <Award className="w-3 h-3" />
                              {edu.score}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            {edu.location}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {edu.duration}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {edu.highlights.map((highlight, idx) => (
                            <span key={idx} className="skill-badge">
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
