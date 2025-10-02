import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button.jsx';
import Icon from '../../../components/AppIcon.jsx';

const OrganizationalTrainingSection = () => {
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

  const bulkDiscounts = [
    {
      id: 1,
      range: "4-9 Staff",
      discount: "15%",
      description: "Perfect for small teams",
      icon: "Users",
      originalPrice: 299,
      discountedPrice: 254,
      popular: false
    },
    {
      id: 2,
      range: "10-49 Staff",
      discount: "25%",
      description: "Ideal for growing companies",
      icon: "Building",
      originalPrice: 299,
      discountedPrice: 224,
      popular: true
    },
    {
      id: 3,
      range: "50+ Staff",
      discount: "40%",
      description: "Enterprise-level training",
      icon: "Building2",
      originalPrice: 299,
      discountedPrice: 179,
      popular: false
    }
  ];

  const organizationalFeatures = [
    {
      id: 1,
      title: "Dedicated Admin Dashboard",
      description: "Track team progress, manage enrollments, and generate comprehensive reports",
      icon: "LayoutDashboard"
    },
    {
      id: 2,
      title: "Bulk Enrollment System",
      description: "Easily enroll multiple employees with CSV upload and automated invitations",
      icon: "Upload"
    },
    {
      id: 3,
      title: "Custom Learning Paths",
      description: "Create tailored learning journeys based on roles and departmental needs",
      icon: "Route"
    },
    {
      id: 4,
      title: "Progress Analytics",
      description: "Real-time insights into completion rates, engagement metrics, and performance",
      icon: "BarChart3"
    },
    {
      id: 5,
      title: "Certificate Management",
      description: "Centralized certificate tracking and verification for all team members",
      icon: "Award"
    },
    {
      id: 6,
      title: "Priority Support",
      description: "Dedicated account manager and 24/7 technical support for your organization",
      icon: "Headphones"
    }
  ];

  const handleContactSales = () => {
    navigate('/contact');
  };

  const handleGetStarted = () => {
    navigate('/user-registration');
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="Building" size={16} />
            <span>Enterprise Training</span>
          </div>
          
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Scale ESG Excellence Across Your Organization
          </h2>
          
          <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
            Empower your entire team with comprehensive ESG and sustainability training. Get bulk discounts, dedicated support, and powerful admin tools to track progress across your organization.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Features */}
          <div className="space-y-8">
            <div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                Everything You Need for Team Training
              </h3>
              
              <div className="grid gap-6">
                {organizationalFeatures?.map((feature) => (
                  <div key={feature?.id} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={feature?.icon} size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-body font-semibold text-foreground mb-2">
                        {feature?.title}
                      </h4>
                      <p className="font-caption text-sm text-muted-foreground">
                        {feature?.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                variant="default"
                size="lg"
                iconName="MessageSquare"
                iconPosition="left"
                onClick={handleContactSales}
                className="flex-1 sm:flex-none"
              >
                Contact Sales
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="ArrowRight"
                iconPosition="right"
                onClick={handleGetStarted}
                className="flex-1 sm:flex-none"
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Right Side - Pricing Cards */}
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                Bulk Discount Pricing
              </h3>
              <p className="font-body text-muted-foreground">
                Save more when you train more team members
              </p>
            </div>

            {bulkDiscounts?.map((tier) => (
              <div
                key={tier?.id}
                className={`relative bg-card rounded-xl p-6 border transition-all duration-300 hover:shadow-lg ${
                  tier?.popular
                    ? 'border-primary shadow-md ring-2 ring-primary/20'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                {tier?.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-white px-4 py-1 rounded-full text-xs font-medium">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={tier?.icon} size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-body font-semibold text-foreground">
                        {tier?.range}
                      </h4>
                      <p className="font-caption text-sm text-muted-foreground">
                        {tier?.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="bg-success/10 text-success px-3 py-1 rounded-full text-sm font-bold mb-2">
                      {tier?.discount} OFF
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-heading text-xl font-bold text-primary">
                        {formatPrice(tier?.discountedPrice)}
                      </span>
                      <span className="font-caption text-sm text-muted-foreground line-through">
                        {formatPrice(tier?.originalPrice)}
                      </span>
                    </div>
                    <div className="font-caption text-xs text-muted-foreground">
                      per person
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Icon name="Calculator" size={14} />
                    <span className="font-caption text-sm">
                      Total savings: {formatPrice((tier?.originalPrice - tier?.discountedPrice) * 10)}
                    </span>
                  </div>
                  <Button
                    variant={tier?.popular ? "default" : "outline"}
                    size="sm"
                    onClick={handleContactSales}
                  >
                    Get Quote
                  </Button>
                </div>
              </div>
            ))}

            {/* Additional Info */}
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Icon name="Info" size={16} className="text-primary" />
                <span className="font-body font-medium text-foreground">Custom Enterprise Solutions</span>
              </div>
              <p className="font-caption text-sm text-muted-foreground">
                Need training for 100+ employees? Contact us for custom pricing and dedicated implementation support.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-primary/5 to-success/5 rounded-2xl p-8 lg:p-12 text-center">
          <h3 className="font-heading text-2xl lg:text-3xl font-bold text-foreground mb-4">
            Ready to Transform Your Organization's ESG Capabilities?
          </h3>
          <p className="font-body text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join leading African organizations that have already started their sustainability journey with GreenPath Institute. Get a custom quote and implementation plan today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="default"
              size="lg"
              iconName="Calendar"
              iconPosition="left"
              onClick={handleContactSales}
            >
              Schedule Demo
            </Button>
            <Button
              variant="outline"
              size="lg"
              iconName="Download"
              iconPosition="left"
              onClick={handleContactSales}
            >
              Download Brochure
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-8 pt-8 border-t border-border">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Icon name="Shield" size={16} className="text-success" />
              <span className="font-caption text-sm">Enterprise Security</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Icon name="Clock" size={16} className="text-success" />
              <span className="font-caption text-sm">24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Icon name="Award" size={16} className="text-success" />
              <span className="font-caption text-sm">Certified Training</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Icon name="TrendingUp" size={16} className="text-success" />
              <span className="font-caption text-sm">Proven Results</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrganizationalTrainingSection;