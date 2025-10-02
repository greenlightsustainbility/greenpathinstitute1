import React from 'react';

const StatsSection = () => {
  const stats = [
    {
      number: "5,000+",
      label: "Professionals Certified",
      description: "Across 25+ African countries",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 1.17157 16.1716C0.421427 16.9217 0 17.9391 0 19V21" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="8.5" cy="7" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M20 8V14L17 11" stroke="currentColor" strokeWidth="2"/>
          <path d="M17 11L23 17" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      number: "98%",
      label: "Completion Rate",
      description: "Industry-leading success metrics",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.7088 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.76489 14.1003 1.98234 16.07 2.86" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      number: "150+",
      label: "Corporate Partners",
      description: "Leading African companies",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 21H21M3 7L12 3L21 7M5 21V12M19 21V12" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M9 21V16C9 15.4477 9.44772 15 10 15H14C14.5523 15 15 15.4477 15 16V21" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      )
    },
    {
      number: "25+",
      label: "Countries Reached",
      description: "Pan-African coverage",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M2 12H22" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      )
    },
    {
      number: "4.9/5",
      label: "Average Rating",
      description: "Based on learner feedback",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      )
    },
    {
      number: "50+",
      label: "Course Modules",
      description: "Comprehensive curriculum",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 3H8C9.1 3 10 3.9 10 5V19C10 20.1 9.1 21 8 21H2V3Z" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M22 3H16C14.9 3 14 3.9 14 5V19C14 20.1 14.9 21 16 21H22V3Z" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M10 12H14" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    }
  ];

  return (
    <section className="py-20 bg-primary/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Our Impact in Numbers
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
            These metrics reflect our commitment to excellence and the trust that African professionals 
            and organizations place in our ESG and sustainability education programs.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats?.map((stat, index) => (
            <div 
              key={index}
              className="bg-background p-6 rounded-xl border border-border text-center hover:border-primary/50 transition-all duration-300 hover:shadow-lg group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                {stat?.icon}
              </div>
              <div className="font-heading text-2xl lg:text-3xl font-bold text-primary mb-2">
                {stat?.number}
              </div>
              <div className="font-body text-sm font-semibold text-foreground mb-1">
                {stat?.label}
              </div>
              <div className="font-caption text-xs text-muted-foreground">
                {stat?.description}
              </div>
            </div>
          ))}
        </div>

        {/* Achievement Timeline */}
        <div className="mt-20">
          <h3 className="font-heading text-2xl font-bold text-foreground text-center mb-12">
            Our Journey
          </h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-heading text-lg font-bold text-primary">2020</span>
              </div>
              <h4 className="font-body text-sm font-semibold text-foreground mb-2">Founded</h4>
              <p className="font-caption text-xs text-muted-foreground">
                Launched with vision to transform African ESG education
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-heading text-lg font-bold text-primary">2021</span>
              </div>
              <h4 className="font-body text-sm font-semibold text-foreground mb-2">Expansion</h4>
              <p className="font-caption text-xs text-muted-foreground">
                Reached 15 African countries, 1,000+ professionals
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-heading text-lg font-bold text-primary">2022</span>
              </div>
              <h4 className="font-body text-sm font-semibold text-foreground mb-2">Recognition</h4>
              <p className="font-caption text-xs text-muted-foreground">
                Awarded Best ESG Education Platform in Africa
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-heading text-lg font-bold text-white">2025</span>
              </div>
              <h4 className="font-body text-sm font-semibold text-foreground mb-2">Present</h4>
              <p className="font-caption text-xs text-muted-foreground">
                Leading ESG education across 25+ African countries
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;