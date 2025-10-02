import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header.jsx';
import Breadcrumbs from '../../components/ui/Breadcrumbs.jsx';
import ContactForm from './components/ContactForm.jsx';
import EnterpriseForm from './components/EnterpriseForm.jsx';
import ContactInfo from './components/ContactInfo.jsx';
import FAQSection from './components/FAQSection.jsx';
import Icon from '../../components/AppIcon.jsx';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Contact Us - GreenPath Institute | ESG & Sustainability Education</title>
        <meta 
          name="description" 
          content="Get in touch with GreenPath Institute for ESG and sustainability education inquiries. Contact our team for course information, enterprise solutions, and support." 
        />
        <meta name="keywords" content="contact, ESG education, sustainability training, enterprise solutions, support" />
        <meta property="og:title" content="Contact Us - GreenPath Institute" />
        <meta property="og:description" content="Contact GreenPath Institute for ESG education inquiries and enterprise training solutions." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://greenpathinstitute.com/contact-page" />
      </Helmet>
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs className="mb-6" />
            
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Icon name="MessageCircle" size={24} className="text-primary" />
                </div>
                <h1 className="font-heading font-bold text-3xl lg:text-4xl text-foreground">
                  Contact Us
                </h1>
              </div>
              
              <p className="font-body text-lg text-text-secondary mb-8">
                Have questions about our ESG and sustainability courses? Need enterprise training solutions? 
                We're here to help you on your sustainability education journey.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Icon name="Clock" size={20} className="text-primary" />
                  </div>
                  <p className="font-body font-semibold text-sm text-foreground">24 Hour Response</p>
                  <p className="font-caption text-xs text-text-secondary">Average reply time</p>
                </div>
                
                <div className="text-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Icon name="Users" size={20} className="text-primary" />
                  </div>
                  <p className="font-body font-semibold text-sm text-foreground">Expert Support</p>
                  <p className="font-caption text-xs text-text-secondary">Dedicated team</p>
                </div>
                
                <div className="text-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Icon name="Globe" size={20} className="text-primary" />
                  </div>
                  <p className="font-body font-semibold text-sm text-foreground">Global Reach</p>
                  <p className="font-caption text-xs text-text-secondary">Serving Africa & beyond</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Forms Section */}
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* General Contact Form */}
              <div>
                <ContactForm />
              </div>

              {/* Enterprise Form */}
              <div>
                <EnterpriseForm />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information & FAQ Section */}
        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Contact Info */}
              <div className="lg:col-span-2">
                <ContactInfo />
              </div>

              {/* FAQ Section */}
              <div className="lg:col-span-3">
                <FAQSection />
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading font-semibold text-2xl lg:text-3xl text-foreground mb-4">
                Our Location
              </h2>
              <p className="font-body text-text-secondary max-w-2xl mx-auto">
                Based in Lagos, Nigeria, we serve sustainability professionals across the African continent 
                through our comprehensive online learning platform.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="h-96 w-full">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title="GreenPath Institute Location - Lagos, Nigeria"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=6.5244,3.3792&z=12&output=embed"
                  className="border-0"
                />
              </div>
              
              <div className="p-6 bg-card border-t border-border">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="MapPin" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-body font-semibold text-base text-card-foreground">
                      GreenPath Institute Headquarters
                    </h3>
                    <p className="font-body text-sm text-text-secondary">
                      Lagos, Nigeria - Serving professionals across Africa with world-class ESG education
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 lg:py-16 bg-primary/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading font-semibold text-2xl lg:text-3xl text-foreground mb-4">
              Ready to Start Your ESG Journey?
            </h2>
            <p className="font-body text-lg text-text-secondary mb-8">
              Explore our comprehensive course catalog and join thousands of professionals 
              advancing their sustainability expertise.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/course-listing"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 font-body font-medium"
              >
                <Icon name="BookOpen" size={20} />
                <span>Browse Courses</span>
              </a>
              
              <a
                href="/pricing-page"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors duration-200 font-body font-medium text-foreground"
              >
                <Icon name="DollarSign" size={20} />
                <span>View Pricing</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Leaf" size={20} color="white" />
              </div>
              <span className="font-heading font-semibold text-lg text-card-foreground">
                GreenPath Institute
              </span>
            </div>
            
            <p className="font-caption text-sm text-text-secondary">
              © {new Date()?.getFullYear()} GreenPath Institute. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;