import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Linkedin, Github, Send, Sparkles, ArrowRight } from 'lucide-react';

interface ContactSectionProps {
  isVisible: boolean;
}

const ContactSection: React.FC<ContactSectionProps> = ({ isVisible }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbymhIyzl4oI2YTxumR4lVfIN8GCqUll3d8UdW5pOmhtjtmNd7Z3IWOhBKF3tk4_zBeVCQ/exec';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Please fill all fields",
        description: "All fields are required to send a message.",
        variant: "destructive",
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formBody = new URLSearchParams();
      formBody.append('name', formData.name);
      formBody.append('email', formData.email);
      formBody.append('message', formData.message);
      formBody.append('timestamp', new Date().toISOString());

      await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody.toString()
      });

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });
      
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Failed to send",
        description: "Please try again or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'kjeevankumar944@gmail.com', href: 'mailto:kjeevankumar944@gmail.com' },
    { icon: Phone, label: 'Phone', value: 'Available upon request', href: null },
    { icon: MapPin, label: 'Location', value: 'Telangana, India', href: null },
  ];

  const socialLinks = [
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/k-jeevan-kumar-5333b32b8/' },
    { icon: Github, label: 'GitHub', href: 'https://github.com/kjeevankumar?tab=repositories' },
    { icon: Mail, label: 'Email', href: 'mailto:kjeevankumar944@gmail.com' },
  ];

  return (
    <section id="contact" data-animate className="section-container bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-badge">Contact</span>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Let's build something impactful together
          </p>
        </div>

        {/* Premium CTA Banner */}
        <div className={`mb-12 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative overflow-hidden bg-gradient-to-r from-primary to-accent rounded-2xl sm:rounded-3xl p-6 sm:sm:rounded-3xl p-6 sm:p-8 md:p-12 text-primary-foreground">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="ritems-center justify-between gap-4 sm:gap-6 md:flex-row justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm font-semibold uppercase tracking-wider opacity-90">Available for opportunities</span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Let's Build Something Great Together</h3>
                <p className="opacity-80 text-sm sm:text-base">Open to internships, full-time roles, and exciting collaborations</p>
              </div>
              <a href="mailto:kjeevankumar944@gmail.com">
                <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-2xl px-8 h-14 font-semibold shadow-lg group">
                  <Mail className="w-5 h-5 mr-2" />
                  Email Me
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Contact Form */}
          <Card className={`card-interactive border-0 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <CardContent className="p-5 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Send a Message</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">Fill out the form and I'll get back to you soon.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold text-foreground">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="h-12 rounded-xl border-border bg-secondary/30 focus:border-primary focus:bg-background transition-all"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-foreground">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="h-12 rounded-xl border-border bg-secondary/30 focus:border-primary focus:bg-background transition-all"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-semibold text-foreground">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="min-h-[120px] rounded-xl border-border bg-secondary/30 focus:border-primary focus:bg-background resize-none transition-all"
                    disabled={isSubmitting}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className={`space-y-6 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <Card className="card-interactive border-0">
              <CardContent className="p-5 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Contact Information</h3>
               
                <div className="space-y-4 sm:space-y-5">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 sm:gap-4 group min-w-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                        <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm text-muted-foreground">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="font-semibold text-sm sm:text-base text-foreground hover:text-primary transition-colors truncate block">
                            {item.value}
                          </a>
                        ) : (
                          <p className="font-semibold text-sm sm:text-base text-foreground">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden bg-gradient-to-br from-primary to-accent text-primary-foreground border-0">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">Let's Connect</h3>
                <p className="text-primary-foreground/80 mb-6">
                  Follow me on social media for updates on my latest projects and insights.
                </p>
               
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-all duration-300 hover:scale-110"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
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

export default ContactSection;
