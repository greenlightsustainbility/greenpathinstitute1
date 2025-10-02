import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header.jsx';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import Icon from '../../components/AppIcon.jsx';
import PricingTier from './components/PricingTier.jsx';
import CurrencySelector from './components/CurrencySelector.jsx';
import BundleCard from './components/BundleCard.jsx';
import PaymentMethods from './components/PaymentMethods.jsx';
import EnterpriseInquiry from './components/EnterpriseInquiry.jsx';
import CouponCode from './components/CouponCode.jsx';
import PricingFAQ from './components/PricingFAQ.jsx';
import Button from '../../components/ui/Button.jsx';


const PricingPage = () => {
  const navigate = useNavigate();
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  useEffect(() => {
    const savedCurrency = localStorage.getItem('selectedCurrency');
    if (savedCurrency) {
      setSelectedCurrency(savedCurrency);
    }
  }, []);

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    localStorage.setItem('selectedCurrency', currency);
  };

  const handleCouponApply = (coupon) => {
    setAppliedCoupon(coupon);
  };

  const handleEnroll = (item) => {
    const enrollmentData = {
      item,
      currency: selectedCurrency,
      coupon: appliedCoupon
    };
    
    localStorage.setItem('enrollmentData', JSON.stringify(enrollmentData));
    navigate('/checkout-flow');
  };

  const pricingTiers = [
    {
      name: "Individual Learner",
      description: "Perfect for professionals starting their ESG journey",
      prices: {
        USD: 299,
        EUR: 275,
        GBP: 235,
        NGN: 493350,
        ZAR: 5535
      },
      billingPeriod: "per course",
      features: [
        { text: "Access to 1 course", included: true },
        { text: "Lifetime course access", included: true },
        { text: "Downloadable resources", included: true },
        { text: "Certificate of completion", included: true },
        { text: "Email support", included: true },
        { text: "Mobile app access", included: true },
        { text: "Progress tracking", included: true },
        { text: "Community forum access", included: false },
        { text: "1-on-1 mentoring sessions", included: false },
        { text: "Priority support", included: false }
      ],
      buttonText: "Enroll Now",
      additionalInfo: "7-day money-back guarantee"
    },
    {
      name: "Small Team",
      description: "Ideal for small teams and departments",
      prices: {
        USD: 1019,
        EUR: 937,
        GBP: 804,
        NGN: 1681350,
        ZAR: 18852
      },
      originalPrice: {
        USD: 1196,
        EUR: 1100,
        GBP: 940,
        NGN: 1973400,
        ZAR: 22140
      },
      discount: 15,
      billingPeriod: "for 4-9 staff",
      features: [
        { text: "Access to all courses", included: true },
        { text: "Lifetime course access", included: true },
        { text: "Downloadable resources", included: true },
        { text: "Certificates for all staff", included: true },
        { text: "Priority email support", included: true },
        { text: "Mobile app access", included: true },
        { text: "Advanced progress tracking", included: true },
        { text: "Community forum access", included: true },
        { text: "Team dashboard", included: true },
        { text: "Bulk enrollment tools", included: false }
      ],
      buttonText: "Get Team Access",
      additionalInfo: "15% discount automatically applied",
      isPopular: true
    },
    {
      name: "Medium Organization",
      description: "Comprehensive training for growing organizations",
      prices: {
        USD: 2243,
        EUR: 2063,
        GBP: 1772,
        NGN: 3700950,
        ZAR: 41496
      },
      originalPrice: {
        USD: 2990,
        EUR: 2750,
        GBP: 2350,
        NGN: 4933500,
        ZAR: 55330
      },
      discount: 25,
      billingPeriod: "for 10-49 staff",
      features: [
        { text: "Access to all courses", included: true },
        { text: "Lifetime course access", included: true },
        { text: "Downloadable resources", included: true },
        { text: "Certificates for all staff", included: true },
        { text: "Priority support", included: true },
        { text: "Mobile app access", included: true },
        { text: "Advanced analytics", included: true },
        { text: "Community forum access", included: true },
        { text: "Team dashboard", included: true },
        { text: "Bulk enrollment tools", included: true }
      ],
      buttonText: "Scale Your Team",
      additionalInfo: "25% discount automatically applied"
    },
    {
      name: "Enterprise",
      description: "Custom solutions for large organizations",
      prices: {
        USD: 1794,
        EUR: 1650,
        GBP: 1416,
        NGN: 2960100,
        ZAR: 33189
      },
      originalPrice: {
        USD: 2990,
        EUR: 2750,
        GBP: 2350,
        NGN: 4933500,
        ZAR: 55330
      },
      discount: 40,
      billingPeriod: "for 50+ staff",
      features: [
        { text: "Access to all courses", included: true },
        { text: "Lifetime course access", included: true },
        { text: "Custom learning paths", included: true },
        { text: "Unlimited certificates", included: true },
        { text: "Dedicated account manager", included: true },
        { text: "White-label options", included: true },
        { text: "Advanced analytics & reporting", included: true },
        { text: "API integration", included: true },
        { text: "Custom content creation", included: true },
        { text: "24/7 priority support", included: true }
      ],
      buttonText: "Contact Sales",
      additionalInfo: "40% discount + custom features"
    }
  ];

  const courseBundles = [
    {
      name: "ESG Fundamentals Bundle",
      description: "Complete foundation in ESG principles and practices",
      price: {
        USD: 799,
        EUR: 735,
        GBP: 631,
        NGN: 1318350,
        ZAR: 14782
      },
      originalPrice: {
        USD: 1197,
        EUR: 1100,
        GBP: 945,
        NGN: 1973550,
        ZAR: 22140
      },
      courses: [
        "Introduction to ESG",
        "Environmental Management Systems",
        "Social Impact Assessment",
        "Corporate Governance Basics"
      ],
      benefits: [
        "33% savings compared to individual courses",
        "Structured learning pathway",
        "4 certificates upon completion",
        "Lifetime access to all content",
        "Priority email support"
      ],
      badge: "Best Value",
      additionalInfo: "Most popular choice for beginners"
    },
    {
      name: "Advanced ESG Professional",
      description: "Advanced certification for ESG professionals",
      price: {
        USD: 1299,
        EUR: 1195,
        GBP: 1027,
        NGN: 2143350,
        ZAR: 24032
      },
      originalPrice: {
        USD: 1796,
        EUR: 1652,
        GBP: 1418,
        NGN: 2963400,
        ZAR: 33234
      },
      courses: [
        "Advanced ESG Strategy",
        "Climate Risk Management",
        "Sustainability Reporting (GRI/SASB)",
        "ESG Data Analytics",
        "Stakeholder Engagement",
        "Green Finance & Investment"
      ],
      benefits: [
        "28% savings on advanced courses",
        "Professional certification pathway",
        "6 specialized certificates",
        "Access to exclusive webinars",
        "1-on-1 mentoring session included"
      ],
      badge: "Professional",
      additionalInfo: "Recommended for experienced professionals"
    },
    {
      name: "Complete ESG Mastery",
      description: "Comprehensive ESG education from basics to expert level",
      price: {
        USD: 1999,
        EUR: 1839,
        GBP: 1579,
        NGN: 3298350,
        ZAR: 36982
      },
      originalPrice: {
        USD: 2993,
        EUR: 2752,
        GBP: 2363,
        NGN: 4938450,
        ZAR: 55367
      },
      courses: [
        "All ESG Fundamentals courses (4)",
        "All Advanced ESG courses (6)",
        "Bonus: ESG Leadership & Change Management",
        "Bonus: International ESG Frameworks"
      ],
      benefits: [
        "33% savings on complete curriculum",
        "12 course certificates + Master Certificate",
        "Priority access to new courses",
        "Quarterly 1-on-1 mentoring sessions",
        "Alumni network access",
        "Job placement assistance"
      ],
      badge: "Complete",
      additionalInfo: "Ultimate ESG education package"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Breadcrumbs */}
        <div className="bg-muted border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs />
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
              Transparent Pricing for Every Need
            </h1>
            <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
              Choose the perfect plan for your ESG education journey. From individual learners to enterprise organizations, we have flexible pricing options with no hidden fees.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 text-sm text-text-secondary">
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={16} className="text-success" />
                <span>7-day money-back guarantee</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={16} className="text-success" />
                <span>Lifetime course access</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={16} className="text-success" />
                <span>Official certificates included</span>
              </div>
            </div>
          </div>
        </section>

        {/* Currency Selector */}
        <section className="py-8 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CurrencySelector
              selectedCurrency={selectedCurrency}
              onCurrencyChange={handleCurrencyChange}
            />
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-heading font-bold text-3xl text-foreground mb-4">
                Choose Your Learning Plan
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Flexible pricing options designed for individuals, teams, and organizations of all sizes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {pricingTiers?.map((tier, index) => (
                <PricingTier
                  key={index}
                  tier={tier}
                  isPopular={tier?.isPopular}
                  selectedCurrency={selectedCurrency}
                  onEnroll={handleEnroll}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Course Bundles */}
        <section className="py-16 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-heading font-bold text-3xl text-foreground mb-4">
                Course Bundles & Packages
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Save more with our carefully curated course bundles designed for comprehensive ESG education
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {courseBundles?.map((bundle, index) => (
                <BundleCard
                  key={index}
                  bundle={bundle}
                  selectedCurrency={selectedCurrency}
                  onEnroll={handleEnroll}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Coupon Code Section */}
        <section className="py-16 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <CouponCode onCouponApply={handleCouponApply} />
          </div>
        </section>

        {/* Payment Methods */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PaymentMethods />
          </div>
        </section>

        {/* Enterprise Inquiry */}
        <section className="py-16 bg-muted">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <EnterpriseInquiry />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <PricingFAQ />
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-primary to-secondary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading font-bold text-3xl text-primary-foreground mb-4">
              Ready to Start Your ESG Journey?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Join thousands of professionals advancing their careers with our comprehensive ESG education programs.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate('/course-listing')}
                iconName="BookOpen"
                iconPosition="left"
              >
                Browse All Courses
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/contact-page')}
                iconName="MessageCircle"
                iconPosition="left"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Leaf" size={20} color="white" />
                </div>
                <span className="font-heading font-semibold text-xl text-card-foreground">
                  GreenPath Institute
                </span>
              </div>
              <p className="text-text-secondary mb-4 max-w-md">
                Leading provider of ESG and sustainability education for African professionals, helping build a more sustainable future through comprehensive training programs.
              </p>
              <div className="flex space-x-4">
                <Icon name="Mail" size={20} className="text-text-secondary" />
                <Icon name="Phone" size={20} className="text-text-secondary" />
                <Icon name="MapPin" size={20} className="text-text-secondary" />
              </div>
            </div>
            
            <div>
              <h3 className="font-heading font-semibold text-card-foreground mb-4">Quick Links</h3>
              <div className="space-y-2">
                <div className="text-text-secondary hover:text-primary cursor-pointer">About Us</div>
                <div className="text-text-secondary hover:text-primary cursor-pointer">Courses</div>
                <div className="text-text-secondary hover:text-primary cursor-pointer">Pricing</div>
                <div className="text-text-secondary hover:text-primary cursor-pointer">Contact</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-heading font-semibold text-card-foreground mb-4">Support</h3>
              <div className="space-y-2">
                <div className="text-text-secondary hover:text-primary cursor-pointer">Help Center</div>
                <div className="text-text-secondary hover:text-primary cursor-pointer">Privacy Policy</div>
                <div className="text-text-secondary hover:text-primary cursor-pointer">Terms of Service</div>
                <div className="text-text-secondary hover:text-primary cursor-pointer">Refund Policy</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-text-secondary text-sm">
              © {new Date()?.getFullYear()} GreenPath Institute. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PricingPage;