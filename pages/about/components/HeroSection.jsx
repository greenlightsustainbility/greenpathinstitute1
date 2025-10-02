import React from 'react';
import Button from '../../../components/ui/Button.jsx';

const HeroSection = () => {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full">
                <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                <span className="font-caption text-sm text-primary font-medium">About GreenPath Institute</span>
              </div>
              
              <h1 className="font-heading text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Transforming Africa Through
                <span className="text-primary block">ESG Excellence</span>
              </h1>
              
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                We're on a mission to empower African professionals with world-class ESG and sustainability education, 
                creating leaders who will drive positive environmental and social impact across the continent.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="default" size="lg">
                Our Story
              </Button>
              <Button variant="outline" size="lg">
                Meet Our Team
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div className="text-center">
                <div className="font-heading text-2xl font-bold text-primary">5,000+</div>
                <div className="font-caption text-sm text-muted-foreground">Professionals Trained</div>
              </div>
              <div className="text-center">
                <div className="font-heading text-2xl font-bold text-primary">25+</div>
                <div className="font-caption text-sm text-muted-foreground">African Countries</div>
              </div>
              <div className="text-center">
                <div className="font-heading text-2xl font-bold text-primary">98%</div>
                <div className="font-caption text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-8 lg:p-12">
              {/* Placeholder for hero image */}
              <div className="aspect-square bg-gradient-to-br from-primary/30 to-primary/10 rounded-xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-primary/20 rounded-full mx-auto flex items-center justify-center">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor" className="text-primary"/>
                    </svg>
                  </div>
                  <p className="font-body text-sm text-muted-foreground">
                    Building a sustainable future for Africa
                  </p>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" className="text-primary"/>
                  <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" className="text-primary"/>
                </svg>
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary/30 rounded-lg rotate-12"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;