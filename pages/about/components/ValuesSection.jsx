import React from 'react';

const ValuesSection = () => {
  const values = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      ),
      title: "Excellence",
      description: "We maintain the highest standards in education delivery, ensuring our courses meet international ESG and sustainability benchmarks."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H8M16 4V2C16 1.44772 15.5523 1 15 1H9C8.44772 1 8 1.44772 8 2V4M16 4H8" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: "Integrity",
      description: "We operate with transparency and honesty in all our interactions, building trust with our learners and partners across Africa."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      ),
      title: "Innovation",
      description: "We continuously evolve our teaching methods and curriculum to stay ahead of emerging ESG trends and technological advances."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M23 21V19C23 18.1645 22.7155 17.3541 22.2094 16.6972C21.7033 16.0403 20.9982 15.5759 20.2 15.3756" stroke="currentColor" strokeWidth="2"/>
          <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: "Inclusivity",
      description: "We ensure equal access to quality ESG education regardless of background, creating opportunities for all African professionals."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.5 2C21.5 2 20.5 2 19 2C17.5 2 16.5 3 15 4C13.5 5 12.5 6 12 8C11.5 6 10.5 5 9 4C7.5 3 6.5 2 5 2C3.5 2 2.5 2 2.5 2" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M12 8V22" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: "Sustainability",
      description: "We practice what we teach by operating as a carbon-neutral organization and promoting sustainable business practices."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M8 14S9.5 16 12 16S16 14 16 14" stroke="currentColor" strokeWidth="2"/>
          <path d="M9 9H9.01" stroke="currentColor" strokeWidth="2"/>
          <path d="M15 9H15.01" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: "Community",
      description: "We foster a collaborative learning environment where professionals support each other\'s growth and share knowledge."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Our Core Values
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
            These fundamental principles guide every aspect of our work and shape the culture of excellence 
            we strive to create in the ESG and sustainability space.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values?.map((value, index) => (
            <div 
              key={index}
              className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 flex-shrink-0">
                  {value?.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                    {value?.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {value?.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-6 py-3 rounded-full">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            <span className="font-caption text-sm text-primary font-medium">
              Join us in building a sustainable future for Africa
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;