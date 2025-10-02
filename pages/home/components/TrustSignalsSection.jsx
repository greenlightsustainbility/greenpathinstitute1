import React from 'react';
import Icon from '../../../components/AppIcon.jsx';

const TrustSignalsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Amara Okafor",
      role: "Sustainability Manager",
      company: "First Bank Nigeria",
      location: "Lagos, Nigeria",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      content: `The ESG Fundamentals course transformed how I approach sustainability in banking. The African context and practical case studies made all the difference. I've already implemented three major initiatives at my organization.`
    },
    {
      id: 2,
      name: "Kwame Asante",
      role: "Investment Analyst",
      company: "African Development Bank",
      location: "Accra, Ghana",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      content: `Outstanding program! The sustainable finance course gave me the tools to evaluate ESG investments effectively. The certification has opened new career opportunities and increased my credibility with clients.`
    },
    {
      id: 3,
      name: "Fatima Al-Rashid",
      role: "Environmental Consultant",
      company: "Green Africa Solutions",
      location: "Cairo, Egypt",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 5,
      content: `GreenPath Institute's climate risk management course is world-class. The instructors are industry experts, and the curriculum is perfectly tailored for African environmental challenges. Highly recommended!`
    }
  ];

  const accreditations = [
    {
      id: 1,
      name: "ISO 27001",
      description: "Information Security Management",
      icon: "Shield",
      verified: true
    },
    {
      id: 2,
      name: "SAQA Accredited",
      description: "South African Qualifications Authority",
      icon: "Award",
      verified: true
    },
    {
      id: 3,
      name: "UNEP Partnership",
      description: "United Nations Environment Programme",
      icon: "Globe",
      verified: true
    },
    {
      id: 4,
      name: "AfDB Recognized",
      description: "African Development Bank",
      icon: "Building",
      verified: true
    }
  ];

  const successMetrics = [
    {
      id: 1,
      value: "5,247",
      label: "Certified Professionals",
      icon: "Users",
      growth: "+23% this quarter"
    },
    {
      id: 2,
      value: "98.4%",
      label: "Course Completion Rate",
      icon: "TrendingUp",
      growth: "Industry leading"
    },
    {
      id: 3,
      value: "4.9/5",
      label: "Average Rating",
      icon: "Star",
      growth: "From 2,100+ reviews"
    },
    {
      id: 4,
      value: "87%",
      label: "Career Advancement",
      icon: "Briefcase",
      growth: "Within 6 months"
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? "text-warning fill-current" : "text-muted-foreground"}
      />
    ));
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Success Metrics */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Trusted by African Professionals
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
              Join thousands of professionals who have advanced their careers with our comprehensive ESG and sustainability programs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {successMetrics?.map((metric) => (
              <div key={metric?.id} className="bg-card rounded-xl p-6 text-center shadow-sm border border-border">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                  <Icon name={metric?.icon} size={24} className="text-primary" />
                </div>
                <div className="font-heading text-3xl font-bold text-foreground mb-2">
                  {metric?.value}
                </div>
                <div className="font-body text-sm font-medium text-muted-foreground mb-1">
                  {metric?.label}
                </div>
                <div className="font-caption text-xs text-success">
                  {metric?.growth}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Icon name="MessageSquare" size={16} />
              <span>Student Success Stories</span>
            </div>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
              What Our Students Say
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials?.map((testimonial) => (
              <div key={testimonial?.id} className="bg-card rounded-xl p-6 shadow-sm border border-border">
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {renderStars(testimonial?.rating)}
                </div>

                {/* Content */}
                <blockquote className="font-body text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial?.content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial?.avatar}
                    alt={testimonial?.name}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src = '/assets/images/no_image.png';
                    }}
                  />
                  <div>
                    <div className="font-body font-semibold text-foreground">
                      {testimonial?.name}
                    </div>
                    <div className="font-caption text-sm text-muted-foreground">
                      {testimonial?.role}
                    </div>
                    <div className="font-caption text-xs text-muted-foreground">
                      {testimonial?.company} • {testimonial?.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accreditations */}
        <div>
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Accreditations & Partnerships
            </h2>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              Our programs are recognized by leading international organizations and regulatory bodies across Africa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {accreditations?.map((accreditation) => (
              <div key={accreditation?.id} className="bg-card rounded-lg p-6 text-center border border-border hover:shadow-md transition-shadow duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-success/10 rounded-full mb-4">
                  <Icon name={accreditation?.icon} size={28} className="text-success" />
                </div>
                <div className="font-body font-semibold text-foreground mb-2 flex items-center justify-center space-x-2">
                  <span>{accreditation?.name}</span>
                  {accreditation?.verified && (
                    <Icon name="CheckCircle" size={16} className="text-success" />
                  )}
                </div>
                <div className="font-caption text-sm text-muted-foreground">
                  {accreditation?.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignalsSection;