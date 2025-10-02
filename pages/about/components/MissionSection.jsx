import React from 'react';

const MissionSection = () => {
  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Our Mission & Vision
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
            We believe Africa has the potential to lead the world in sustainable development. 
            Our mission is to equip African professionals with the knowledge and skills needed to drive this transformation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Mission */}
          <div className="bg-background p-8 rounded-2xl border border-border">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor" className="text-primary"/>
                </svg>
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground">Our Mission</h3>
            </div>
            <p className="font-body text-muted-foreground leading-relaxed mb-6">
              To democratize access to world-class ESG and sustainability education across Africa, 
              empowering professionals to become catalysts for positive environmental and social change 
              in their organizations and communities.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="font-caption text-sm text-muted-foreground">
                  Provide accessible, high-quality ESG education
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="font-caption text-sm text-muted-foreground">
                  Bridge the sustainability skills gap in Africa
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="font-caption text-sm text-muted-foreground">
                  Foster a community of sustainability leaders
                </span>
              </li>
            </ul>
          </div>

          {/* Vision */}
          <div className="bg-primary/5 p-8 rounded-2xl border border-primary/20">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mr-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 3H8C9.1 3 10 3.9 10 5V19C10 20.1 9.1 21 8 21H2V3Z" stroke="currentColor" strokeWidth="2" fill="none" className="text-primary"/>
                  <path d="M22 3H16C14.9 3 14 3.9 14 5V19C14 20.1 14.9 21 16 21H22V3Z" stroke="currentColor" strokeWidth="2" fill="none" className="text-primary"/>
                  <path d="M10 12H14" stroke="currentColor" strokeWidth="2" className="text-primary"/>
                </svg>
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground">Our Vision</h3>
            </div>
            <p className="font-body text-muted-foreground leading-relaxed mb-6">
              To position Africa as a global leader in sustainable development by creating a generation 
              of ESG-literate professionals who drive innovation, policy change, and environmental stewardship 
              across the continent.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="font-caption text-sm text-muted-foreground">
                  Africa leading global sustainability initiatives
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="font-caption text-sm text-muted-foreground">
                  Sustainable business practices as the norm
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="font-caption text-sm text-muted-foreground">
                  Thriving green economy across African nations
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Impact Statement */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 p-8 rounded-2xl">
            <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
              Our Impact Statement
            </h3>
            <p className="font-body text-lg text-muted-foreground max-w-4xl mx-auto">
              "Every professional we educate becomes a multiplier of positive change. Through comprehensive ESG training, 
              we're not just building careers—we're building a sustainable future for Africa and contributing to global 
              environmental goals while preserving our continent's rich natural heritage."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;