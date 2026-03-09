import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, GitFork, Star, Code2, ExternalLink } from 'lucide-react';

interface GitHubSectionProps {
  isVisible: boolean;
}

const GitHubSection: React.FC<GitHubSectionProps> = ({ isVisible }) => {
  const stats = [
    { label: 'Repositories', value: '15+', icon: GitFork },
    { label: 'Languages', value: '5+', icon: Code2 },
    { label: 'Contributions', value: 'Active', icon: Star },
  ];

  const topLanguages = [
    { name: 'Python', percentage: 45, color: 'bg-yellow-500' },
    { name: 'JavaScript', percentage: 25, color: 'bg-yellow-400' },
    { name: 'TypeScript', percentage: 15, color: 'bg-blue-500' },
    { name: 'HTML/CSS', percentage: 10, color: 'bg-orange-500' },
    { name: 'Other', percentage: 5, color: 'bg-gray-400' },
  ];

  return (
    <section id="github" data-animate className="section-container bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-badge">Open Source</span>
          <h2 className="section-title">GitHub Highlights</h2>
          <p className="section-subtitle">
            Explore my open-source contributions and projects
          </p>
        </div>

        <div className={`grid lg:grid-cols-2 gap-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Stats Card */}
          <Card className="card-premium border-0">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-foreground flex items-center justify-center">
                  <Github className="w-8 h-8 text-background" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">@kjeevankumar</h3>
                  <p className="text-muted-foreground">Active Developer</p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 rounded-xl bg-secondary/50">
                    <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href="https://github.com/kjeevankumar?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 rounded-xl font-semibold group">
                  <Github className="w-5 h-5 mr-2" />
                  View GitHub Profile
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </CardContent>
          </Card>

          {/* Languages Card */}
          <Card className="card-premium border-0">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-primary" />
                Most Used Languages
              </h3>

              {/* Language Bar */}
              <div className="h-4 rounded-full overflow-hidden flex mb-8">
                {topLanguages.map((lang, index) => (
                  <div
                    key={index}
                    className={`${lang.color} transition-all duration-500 hover:opacity-80`}
                    style={{ width: `${lang.percentage}%` }}
                    title={`${lang.name}: ${lang.percentage}%`}
                  />
                ))}
              </div>

              {/* Language Legend */}
              <div className="space-y-3">
                {topLanguages.map((lang, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${lang.color}`} />
                      <span className="text-sm text-foreground font-medium">{lang.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{lang.percentage}%</span>
                  </div>
                ))}
              </div>

              {/* Contribution placeholder */}
              <div className="mt-8 p-4 rounded-xl bg-secondary/50 border border-border/50">
                <p className="text-sm text-muted-foreground text-center">
                  📊 Contribution graph available on GitHub profile
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default GitHubSection;
