import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Globe, BarChart3, Database, ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  isVisible: boolean;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ isVisible }) => {
  const services = [
    {
      icon: Brain,
      title: 'AI/ML Model Development',
      description: 'Building intelligent machine learning models for prediction, classification, and computer vision applications.',
      features: ['Predictive Analytics', 'Computer Vision', 'Data Processing'],
      gradient: 'from-blue-500/10 to-purple-500/10'
    },
    {
      icon: Globe,
      title: 'Full Stack Web Applications',
      description: 'Creating responsive, scalable web applications with modern frameworks and clean architecture.',
      features: ['React & Node.js', 'REST APIs', 'Database Design'],
      gradient: 'from-green-500/10 to-teal-500/10'
    },
    {
      icon: BarChart3,
      title: 'Streamlit Dashboards',
      description: 'Developing interactive data visualization dashboards for real-time insights and analytics.',
      features: ['Data Visualization', 'Real-time Updates', 'Custom Widgets'],
      gradient: 'from-orange-500/10 to-red-500/10'
    },
    {
      icon: Database,
      title: 'Database Design & Optimization',
      description: 'Designing efficient database schemas and optimizing queries for performance.',
      features: ['MySQL & MongoDB', 'Schema Design', 'Query Optimization'],
      gradient: 'from-purple-500/10 to-pink-500/10'
    }
  ];

  return (
    <section id="services" data-animate className="section-container bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-badge">Services</span>
          <h2 className="section-title">What I Can Build</h2>
          <p className="section-subtitle">
            Transforming ideas into functional, scalable solutions
          </p>
        </div>

        <div className={`grid md:grid-cols-2 gap-6 lg:gap-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group card-interactive border-0 overflow-hidden"
            >
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col h-full">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 flex-grow">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <span key={idx} className="skill-badge">
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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

export default ServicesSection;
