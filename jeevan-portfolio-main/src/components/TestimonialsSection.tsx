import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TestimonialsSectionProps {
  isVisible: boolean;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ isVisible }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: "Prof. Ramesh Kumar",
      role: "Faculty Mentor, MRIET",
      message: "Jeevan demonstrates exceptional dedication to learning and problem-solving. His ability to grasp complex AI/ML concepts and apply them practically is remarkable.",
      rating: 5,
      avatar: "RK"
    },
    {
      name: "Arun Sharma",
      role: "Student, C Programming",
      message: "Jeevan's teaching methodology made complex programming concepts easy to understand. His patience and practical approach helped me build a strong foundation.",
      rating: 5,
      avatar: "AS"
    },
    {
      name: "Priya Reddy",
      role: "Team Member, Hackathon",
      message: "Working with Jeevan during hackathons was an incredible experience. His technical skills and collaborative spirit helped our team deliver outstanding projects.",
      rating: 5,
      avatar: "PR"
    }
  ];

  const next = () => setActiveIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" data-animate className="section-container bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-badge">Testimonials</span>
          <h2 className="section-title font-display">What People Say</h2>
          <p className="section-subtitle">
            Feedback from mentors, students, and collaborators
          </p>
        </div>

        {/* Desktop: 3-column grid */}
        <div className={`hidden md:grid md:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card className="group relative bg-card border border-border/50 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1 h-full">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="p-7 flex flex-col h-full">
                  {/* Quote + Stars row */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <Quote className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <p className="text-muted-foreground leading-relaxed text-sm flex-1 mb-6">
                    "{testimonial.message}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-5 border-t border-border/50">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-xs shrink-0">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">{testimonial.name}</h4>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="md:hidden">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-card border border-border/50 rounded-2xl overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Quote className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm mb-5">
                      "{testimonials[activeIndex].message}"
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-xs">
                        {testimonials[activeIndex].avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm">{testimonials[activeIndex].name}</h4>
                        <p className="text-xs text-muted-foreground">{testimonials[activeIndex].role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-5">
              <button onClick={prev} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/10 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-primary w-6' : 'bg-border'}`}
                  />
                ))}
              </div>
              <button onClick={next} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/10 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
