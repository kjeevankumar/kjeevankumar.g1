import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Building2, ExternalLink, MapPin } from 'lucide-react';

interface InternshipsSectionProps {
  isVisible: boolean;
}

const InternshipsSection: React.FC<InternshipsSectionProps> = ({ isVisible }) => {
  const internships = [
    {
      title: 'Artificial Intelligence Intern',
      company: 'CODEC Technologies',
      duration: '2025',
      location: 'Remote',
      type: 'AI/ML',
      description: 'Worked as an AI Intern at CODEC Technologies, gaining hands-on experience in artificial intelligence development and applications.',
      highlights: [
        'Developed and implemented AI-based solutions for real-world problems',
        'Gained practical experience with machine learning frameworks and tools',
        'Collaborated with the team on AI project development and deployment'
      ],
      skills: ['Python', 'AI', 'Machine Learning', 'Deep Learning'],
      certificateLink: 'https://drive.google.com/file/d/1FjcBhsfRfbKLyUjcsf28JpqJtCUPE3Ch/view?usp=sharing',
      current: false,
      logo: '💻'
    },
    {
      title: 'Green Intern',
      company: '1M1B (One Million for One Billion) Foundation',
      duration: 'July 2025 – Present',
      location: 'Remote',
      type: 'Sustainability & AI',
      description: 'Completed Green Internship program including Sustainable Mindset training, Tableau training, and Live Project work.',
      highlights: [
        'Worked on Leak Guard AI project to detect underground pipeline and tank leaks using computer vision techniques',
        'Completed sustainability and climate action training modules',
        'Applied data visualization skills using Tableau for project insights'
      ],
      skills: ['Python', 'OpenCV', 'Computer Vision', 'Tableau'],
      certificateLink: 'https://drive.google.com/file/d/1WExsJJJajy-ChiyG5sWEHBggCNGahd5h/view?usp=sharing',
      current: true,
      logo: '🌍'
    },
    {
      title: 'AI & Data Analytics Virtual Intern',
      company: 'AICTE Shell Edunet Foundation',
      duration: 'May 2025 – June 2025',
      location: 'Remote',
      type: 'AI/ML',
      description: 'Completed a 4-week virtual internship in Artificial Intelligence and Data Analytics focused on Green Skills.',
      highlights: [
        'Learned data analysis techniques and AI applications for sustainability-based solutions',
        'Applied machine learning models to real-world green technology datasets',
        'Gained hands-on experience with AI tools and data analytics workflows'
      ],
      skills: ['Python', 'Data Analytics', 'Machine Learning'],
      certificateLink: 'https://drive.google.com/file/d/1_q-FW4sw9jF1QuLOZ4Cit8vQH85nZJYt/view?usp=sharing',
      current: false,
      logo: '🐚'
    }
  ];

  return (
    <section id="internships" data-animate className="section-container bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-badge">Professional Experience</span>
          <h2 className="section-title">Internships</h2>
          <p className="section-subtitle">
            Industry experience through hands-on internship programs
          </p>
        </div>

        <div className={`space-y-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {internships.map((internship, index) => (
            <Card key={index} className="group card-interactive border-0 overflow-hidden">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Company Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                      {internship.logo}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-xl font-bold text-foreground">{internship.title}</h3>
                          {internship.current && (
                            <span className="px-3 py-1 text-xs font-bold rounded-full bg-primary/10 text-primary animate-pulse">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-primary font-semibold">{internship.company}</p>
                      </div>
                      <div className="flex flex-col items-start sm:items-end gap-2">
                        <span className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {internship.duration}
                        </span>
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-accent/10 text-accent">
                          {internship.type}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground">{internship.description}</p>

                    {/* Highlights */}
                    <ul className="space-y-2">
                      {internship.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    {/* Footer */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                      {/* Skills */}
                      <div className="flex flex-wrap gap-2">
                        {internship.skills.map((skill, skillIndex) => (
                          <span key={skillIndex} className="skill-badge">
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Certificate Button */}
                      <a href={internship.certificateLink} target="_blank" rel="noopener noreferrer">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="rounded-xl hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Certificate
                        </Button>
                      </a>
                    </div>
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

export default InternshipsSection;
