import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button.jsx';
import Icon from '../../../components/AppIcon.jsx';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-success/5 py-20 lg:py-32">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&q=80')] bg-cover bg-center opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium">
                <Icon name="Award" size={16} />
                <span>Certified ESG Training for African Professionals</span>
              </div>
              
              <h1 className="font-heading text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Master ESG & 
                <span className="text-primary block">Sustainability</span>
                Excellence
              </h1>
              
              <p className="font-body text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Join over 5,000+ African professionals who have advanced their careers with our comprehensive ESG and sustainability certification programs. Build expertise that drives real environmental and social impact.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center lg:text-left">
                <div className="font-heading text-2xl lg:text-3xl font-bold text-primary">5,000+</div>
                <div className="font-caption text-sm text-muted-foreground">Certified Professionals</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-heading text-2xl lg:text-3xl font-bold text-primary">98%</div>
                <div className="font-caption text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-heading text-2xl lg:text-3xl font-bold text-primary">24/7</div>
                <div className="font-caption text-sm text-muted-foreground">Learning Support</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="default" 
                size="lg"
                iconName="BookOpen"
                iconPosition="right"
                onClick={() => navigate('/courses')}
                className="flex-1 sm:flex-none"
              >
                Explore Courses
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                iconName="Play"
                iconPosition="left"
                onClick={() => navigate('/about')}
                className="flex-1 sm:flex-none"
              >
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Icon name="Shield" size={16} className="text-success" />
                <span className="font-caption text-sm">ISO 27001 Certified</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Icon name="Globe" size={16} className="text-success" />
                <span className="font-caption text-sm">Globally Recognized</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Icon name="Users" size={16} className="text-success" />
                <span className="font-caption text-sm">Corporate Trusted</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative bg-card rounded-2xl shadow-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="African professionals in a sustainability meeting"
                className="w-full h-96 lg:h-[500px] object-cover"
                onError={(e) => {
                  e.target.src = '/assets/images/no_image.png';
                }}
              />
              
              {/* Floating Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-card/95 backdrop-blur-sm rounded-xl p-4 border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-body text-sm font-medium text-foreground">Next Cohort Starts</div>
                    <div className="font-heading text-lg font-bold text-primary">January 15, 2025</div>
                  </div>
                  <div className="flex -space-x-2">
                    <img
                      src="https://randomuser.me/api/portraits/women/44.jpg"
                      alt="Student"
                      className="w-8 h-8 rounded-full border-2 border-card"
                    />
                    <img
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="Student"
                      className="w-8 h-8 rounded-full border-2 border-card"
                    />
                    <img
                      src="https://randomuser.me/api/portraits/women/68.jpg"
                      alt="Student"
                      className="w-8 h-8 rounded-full border-2 border-card"
                    />
                    <div className="w-8 h-8 rounded-full bg-primary text-white text-xs flex items-center justify-center border-2 border-card font-medium">
                      +12
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-success/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;