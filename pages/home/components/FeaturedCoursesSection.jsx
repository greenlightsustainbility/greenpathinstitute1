import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button.jsx';
import Icon from '../../../components/AppIcon.jsx';

const FeaturedCoursesSection = () => {
  const navigate = useNavigate();
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  useEffect(() => {
    const savedCurrency = localStorage.getItem('selectedCurrency') || 'USD';
    setSelectedCurrency(savedCurrency);
  }, []);

  const exchangeRates = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    ZAR: 18.50,
    NGN: 750.00
  };

  const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    ZAR: 'R',
    NGN: '₦'
  };

  const convertPrice = (usdPrice) => {
    const converted = usdPrice * exchangeRates?.[selectedCurrency];
    return Math.round(converted);
  };

  const formatPrice = (usdPrice) => {
    const converted = convertPrice(usdPrice);
    const symbol = currencySymbols?.[selectedCurrency];
    return `${symbol}${converted?.toLocaleString()}`;
  };

  const featuredCourses = [
    {
      id: 1,
      title: "ESG Fundamentals for African Markets",
      description: "Master the core principles of Environmental, Social, and Governance frameworks with focus on African business contexts and regulatory requirements.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "8 weeks",
      level: "Beginner",
      students: 1247,
      rating: 4.8,
      originalPrice: 299,
      currentPrice: 199,
      badge: "Most Popular",
      modules: 12,
      certificate: true,
      slug: "esg-fundamentals-african-markets"
    },
    {
      id: 2,
      title: "Sustainable Finance & Investment",
      description: "Learn sustainable investment strategies, green bonds, and impact measurement frameworks tailored for African financial markets.",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "10 weeks",
      level: "Intermediate",
      students: 892,
      rating: 4.9,
      originalPrice: 399,
      currentPrice: 299,
      badge: "New",
      modules: 15,
      certificate: true,
      slug: "sustainable-finance-investment"
    },
    {
      id: 3,
      title: "Climate Risk Management",
      description: "Develop expertise in climate risk assessment, adaptation strategies, and resilience planning for African organizations.",
      image: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "6 weeks",
      level: "Advanced",
      students: 634,
      rating: 4.7,
      originalPrice: 349,
      currentPrice: 249,
      badge: "Expert Level",
      modules: 10,
      certificate: true,
      slug: "climate-risk-management"
    }
  ];

  const handleCourseClick = (slug) => {
    navigate(`/courses/${slug}`);
  };

  const handleViewAllCourses = () => {
    navigate('/courses');
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="Star" size={16} />
            <span>Featured Courses</span>
          </div>
          
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Start Your ESG Journey Today
          </h2>
          
          <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
            Choose from our most popular certification programs designed specifically for African professionals. Each course includes practical case studies, expert mentorship, and globally recognized certificates.
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredCourses?.map((course) => (
            <div
              key={course?.id}
              className="bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-border"
              onClick={() => handleCourseClick(course?.slug)}
            >
              {/* Course Image */}
              <div className="relative overflow-hidden">
                <img
                  src={course?.image}
                  alt={course?.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }}
                />
                
                {/* Badge */}
                {course?.badge && (
                  <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                    {course?.badge}
                  </div>
                )}

                {/* Level Badge */}
                <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm text-foreground px-3 py-1 rounded-full text-xs font-medium border border-border">
                  {course?.level}
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {course?.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground line-clamp-3">
                    {course?.description}
                  </p>
                </div>

                {/* Course Meta */}
                <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} />
                      <span>{course?.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="BookOpen" size={14} />
                      <span>{course?.modules} modules</span>
                    </div>
                  </div>
                  {course?.certificate && (
                    <div className="flex items-center space-x-1 text-success">
                      <Icon name="Award" size={14} />
                      <span className="text-xs">Certificate</span>
                    </div>
                  )}
                </div>

                {/* Rating and Students */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={14} className="text-warning fill-current" />
                      <span className="font-medium text-sm text-foreground">{course?.rating}</span>
                    </div>
                    <span className="text-muted-foreground text-sm">({course?.students?.toLocaleString()} students)</span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="font-heading text-2xl font-bold text-primary">
                      {formatPrice(course?.currentPrice)}
                    </span>
                    <span className="font-body text-sm text-muted-foreground line-through">
                      {formatPrice(course?.originalPrice)}
                    </span>
                  </div>
                  <div className="bg-success/10 text-success px-2 py-1 rounded text-xs font-medium">
                    Save {Math.round(((course?.originalPrice - course?.currentPrice) / course?.originalPrice) * 100)}%
                  </div>
                </div>

                {/* Enroll Button */}
                <Button
                  variant="default"
                  fullWidth
                  iconName="ArrowRight"
                  iconPosition="right"
                  onClick={(e) => {
                    e?.stopPropagation();
                    handleCourseClick(course?.slug);
                  }}
                >
                  Enroll Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Courses Button */}
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            iconName="Grid3x3"
            iconPosition="left"
            onClick={handleViewAllCourses}
          >
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCoursesSection;