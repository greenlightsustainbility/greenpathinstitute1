import React from 'react';

const PartnershipsSection = () => {
  const partnerships = [
    {
      category: "Academic Partners",
      description: "World-class universities and research institutions",
      partners: [
        "University of Cape Town",
        "Lagos Business School", 
        "Makerere University",
        "INSEAD Business School",
        "Oxford Environmental Change Institute"
      ],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 10V6C22 5.44772 21.5523 5 21 5H3C2.44772 5 2 5.44772 2 6V10" stroke="currentColor" strokeWidth="2"/>
          <path d="M7 19H17L22 10H2L7 19Z" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M12 5V2" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      category: "Corporate Partners",
      description: "Leading African companies driving ESG transformation",
      partners: [
        "Sasol Limited",
        "MTN Group",
        "Standard Bank Group",
        "Dangote Group",
        "Equity Bank Group"
      ],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 21H21M3 7L12 3L21 7M5 21V12M19 21V12" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M9 21V16C9 15.4477 9.44772 15 10 15H14C14.5523 15 15 15.4477 15 16V21" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      )
    },
    {
      category: "International Organizations",
      description: "Global institutions supporting African development",
      partners: [
        "African Development Bank",
        "UN Environment Programme",
        "International Finance Corporation",
        "Green Climate Fund",
        "African Union Commission"
      ],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M2 12H22" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      )
    },
    {
      category: "Technology Partners",
      description: "Innovation platforms enhancing learning experiences",
      partners: [
        "Microsoft Education",
        "Google for Education",
        "Coursera for Business",
        "Zoom Education",
        "Adobe Creative Campus"
      ],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M8 21L16 21" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 17L12 21" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    }
  ];

  const recognitions = [
    {
      award: "Best ESG Education Platform",
      organization: "African Sustainability Awards",
      year: "2024"
    },
    {
      award: "Innovation in Digital Learning",
      organization: "EdTech Africa Summit",
      year: "2023"
    },
    {
      award: "Excellence in Professional Development",
      organization: "African Business Education Council",
      year: "2023"
    },
    {
      award: "Sustainable Impact Award",
      organization: "UN Global Compact Africa",
      year: "2022"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Partnerships & Recognition
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
            We collaborate with leading institutions and organizations across Africa and globally 
            to deliver comprehensive ESG education and drive sustainable development.
          </p>
        </div>

        {/* Partnership Categories */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {partnerships?.map((category, index) => (
            <div 
              key={index}
              className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 text-primary">
                  {category?.icon}
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    {category?.category}
                  </h3>
                  <p className="font-caption text-sm text-muted-foreground">
                    {category?.description}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                {category?.partners?.map((partner, partnerIndex) => (
                  <div 
                    key={partnerIndex}
                    className="flex items-center justify-between py-2 px-3 bg-primary/5 rounded-lg"
                  >
                    <span className="font-body text-sm text-foreground">{partner}</span>
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" className="text-primary"/>
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Awards & Recognition */}
        <div>
          <h3 className="font-heading text-2xl font-bold text-foreground text-center mb-12">
            Awards & Recognition
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recognitions?.map((recognition, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl border border-primary/20 text-center"
              >
                <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9C6 10.5913 6.63214 12.1174 7.75736 13.2426C8.88258 14.3679 10.4087 15 12 15C13.5913 15 15.1174 14.3679 16.2426 13.2426C17.3679 12.1174 18 10.5913 18 9C18 7.40869 17.3679 5.88258 16.2426 4.75736C15.1174 3.63214 13.5913 3 12 3C10.4087 3 8.88258 3.63214 7.75736 4.75736C6.63214 5.88258 6 7.40869 6 9Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <path d="M12 15L8 21L10 18H14L16 21L12 15Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
                <h4 className="font-heading text-lg font-bold text-foreground mb-2">
                  {recognition?.award}
                </h4>
                <p className="font-body text-sm text-muted-foreground mb-1">
                  {recognition?.organization}
                </p>
                <p className="font-caption text-xs text-primary font-semibold">
                  {recognition?.year}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Partnership CTA */}
        <div className="mt-20 text-center">
          <div className="bg-card p-8 rounded-2xl border border-border">
            <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
              Become a Partner
            </h3>
            <p className="font-body text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join our network of leading institutions and organizations committed to advancing 
              ESG education and sustainable development across Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-white px-6 py-3 rounded-lg font-body text-sm font-semibold hover:bg-primary/90 transition-colors duration-300">
                Partner With Us
              </button>
              <button className="border border-border text-foreground px-6 py-3 rounded-lg font-body text-sm font-semibold hover:border-primary hover:text-primary transition-all duration-300">
                Download Partnership Brochure
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnershipsSection;