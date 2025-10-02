import React from 'react';

const TeamSection = () => {
  const leadership = [
    {
      name: "Dr. Amara Okafor",
      role: "Founder & CEO",
      bio: "Former World Bank ESG consultant with 15+ years in sustainable development across Africa.",
      education: "PhD in Environmental Economics, Harvard University",
      specialization: "Climate Finance & Policy"
    },
    {
      name: "Prof. Kwame Asante",
      role: "Chief Academic Officer",
      bio: "Leading sustainability researcher and former UN Environment Programme senior advisor.",
      education: "DPhil in Sustainability Science, Oxford University",
      specialization: "Renewable Energy & ESG Frameworks"
    },
    {
      name: "Sarah Mwangi",
      role: "Head of Learning Experience",
      bio: "EdTech innovator focused on creating engaging digital learning experiences for professionals.",
      education: "MSc in Educational Technology, MIT",
      specialization: "Digital Learning & UX Design"
    },
    {
      name: "Ahmed Hassan",
      role: "Director of Partnerships",
      bio: "Former McKinsey consultant specializing in corporate sustainability transformations.",
      education: "MBA, INSEAD",
      specialization: "Corporate Strategy & Partnerships"
    }
  ];

  const advisors = [
    {
      name: "Dr. Fatima Al-Rashid",
      role: "Strategic Advisor",
      expertise: "Former African Development Bank Vice President"
    },
    {
      name: "John Mbeki",
      role: "Industry Advisor", 
      expertise: "CEO, Green Capital Africa"
    },
    {
      name: "Dr. Chiamaka Ogwu",
      role: "Academic Advisor",
      expertise: "Professor of Environmental Law, University of Cape Town"
    }
  ];

  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Meet Our Team
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
            Our diverse team combines deep academic expertise with practical industry experience 
            to deliver world-class ESG and sustainability education tailored for African professionals.
          </p>
        </div>

        {/* Leadership Team */}
        <div className="mb-20">
          <h3 className="font-heading text-2xl font-bold text-foreground text-center mb-12">
            Leadership Team
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership?.map((member, index) => (
              <div 
                key={index}
                className="bg-background p-6 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group text-center"
              >
                {/* Profile Image Placeholder */}
                <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="font-heading text-2xl font-bold text-primary">
                    {member?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                  </span>
                </div>
                
                <h4 className="font-heading text-xl font-bold text-foreground mb-1">
                  {member?.name}
                </h4>
                <p className="font-body text-sm font-semibold text-primary mb-3">
                  {member?.role}
                </p>
                <p className="font-caption text-xs text-muted-foreground mb-4 leading-relaxed">
                  {member?.bio}
                </p>
                
                <div className="space-y-2">
                  <div className="bg-primary/5 p-2 rounded-lg">
                    <p className="font-caption text-xs text-foreground font-medium">Education</p>
                    <p className="font-caption text-xs text-muted-foreground">{member?.education}</p>
                  </div>
                  <div className="bg-primary/5 p-2 rounded-lg">
                    <p className="font-caption text-xs text-foreground font-medium">Specialization</p>
                    <p className="font-caption text-xs text-muted-foreground">{member?.specialization}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advisory Board */}
        <div>
          <h3 className="font-heading text-2xl font-bold text-foreground text-center mb-12">
            Advisory Board
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {advisors?.map((advisor, index) => (
              <div 
                key={index}
                className="bg-background p-6 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="font-heading text-lg font-bold text-primary">
                    {advisor?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                  </span>
                </div>
                
                <h4 className="font-heading text-lg font-bold text-foreground mb-1">
                  {advisor?.name}
                </h4>
                <p className="font-body text-sm font-semibold text-primary mb-2">
                  {advisor?.role}
                </p>
                <p className="font-caption text-xs text-muted-foreground leading-relaxed">
                  {advisor?.expertise}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-primary/10 p-8 rounded-2xl">
            <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
              Join Our Mission
            </h3>
            <p className="font-body text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're always looking for passionate professionals who share our vision of transforming 
              Africa through ESG education. Explore opportunities to join our team or advisory network.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-white px-6 py-3 rounded-lg font-body text-sm font-semibold hover:bg-primary/90 transition-colors duration-300">
                View Open Positions
              </button>
              <button className="border border-primary text-primary px-6 py-3 rounded-lg font-body text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-300">
                Become an Advisor
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;