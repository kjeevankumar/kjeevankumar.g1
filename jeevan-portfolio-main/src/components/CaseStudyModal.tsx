import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, X, Target, Lightbulb, Settings, BarChart3, ArrowRight } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tech: string[];
  category: string;
  features: string[];
  impact: string;
  duration: string;
  demo: string;
  github: string;
  image: string;
  hasDemo: boolean;
  caseStudy?: {
    problem: string;
    solution: string;
    methodology: string;
    results: string[];
    futureImprovements: string[];
  };
}

interface CaseStudyModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  const defaultCaseStudy = {
    problem: `The need for ${project.title} arose from real-world challenges in ${project.category.toLowerCase()} domain requiring innovative technological solutions.`,
    solution: project.description,
    methodology: `Implemented using ${project.tech.join(', ')} with focus on scalability, performance, and maintainability.`,
    results: project.features,
    futureImprovements: [
      'Enhanced performance optimization',
      'Additional feature integrations',
      'Improved user experience',
      'Extended testing coverage'
    ]
  };

  const caseStudy = project.caseStudy || defaultCaseStudy;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl p-0">
        {/* Header Image */}
        <div className="relative h-48 md:h-64 overflow-hidden rounded-t-3xl">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="inline-block px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-bold rounded-lg mb-2">
              {project.category}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">{project.title}</h2>
            <p className="text-muted-foreground text-sm mt-1">{project.duration}</p>
          </div>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-7">
          {/* Problem Statement */}
          <div className="space-y-3 p-5 rounded-2xl bg-secondary/30 border border-border/30">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Target className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-base font-bold text-foreground font-display">Problem Statement</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed text-sm">{caseStudy.problem}</p>
          </div>

          {/* Solution Approach */}
          <div className="space-y-3 p-5 rounded-2xl bg-secondary/30 border border-border/30">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-base font-bold text-foreground font-display">Solution Approach</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed text-sm">{caseStudy.solution}</p>
          </div>

          {/* Methodology */}
          <div className="space-y-3 p-5 rounded-2xl bg-secondary/30 border border-border/30">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Settings className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-base font-bold text-foreground font-display">Methodology & Tech Stack</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed text-sm mb-3">{caseStudy.methodology}</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, index) => (
                <span key={index} className="px-3 py-1.5 bg-background rounded-lg text-xs font-semibold text-foreground border border-border/50">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="space-y-3 p-5 rounded-2xl bg-primary/5 border border-primary/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-base font-bold text-foreground font-display">Key Results</h3>
            </div>
            <ul className="space-y-2.5">
              {caseStudy.results.map((result, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                    <span className="text-primary text-xs font-bold">{index + 1}</span>
                  </span>
                  {result}
                </li>
              ))}
            </ul>
          </div>

          {/* Future Improvements */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-accent" />
              </div>
              <h3 className="text-base font-bold text-foreground font-display">Future Improvements</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {caseStudy.futureImprovements.map((improvement, index) => (
                <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground p-2.5 rounded-xl bg-secondary/40 border border-border/30">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0" />
                  {improvement}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            {project.hasDemo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Live Demo
                </Button>
              </a>
            )}
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button variant="outline" className="w-full h-12 rounded-xl font-semibold hover:bg-primary hover:text-primary-foreground hover:border-primary">
                <Github className="w-4 h-4 mr-2" />
                View Source Code
              </Button>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CaseStudyModal;
