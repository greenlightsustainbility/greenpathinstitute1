import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from "../../components/ui/Header.jsx";
import HeroSection from './components/HeroSection.jsx';
import FeaturedCoursesSection from './components/FeaturedCoursesSection.jsx';
import TrustSignalsSection from './components/TrustSignalsSection.jsx';
import OrganizationalTrainingSection from './components/OrganizationalTrainingSection.jsx';

const HomePage = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>GreenPath Institute - ESG & Sustainability Certification for African Professionals</title>
        <meta 
          name="description" 
          content="Master ESG and sustainability with Africa's leading certification programs. Join 5,000+ professionals advancing their careers with globally recognized credentials." 
        />
        <meta name="keywords" content="ESG certification, sustainability training, African professionals, environmental governance, climate risk management" />
        <meta property="og:title" content="GreenPath Institute - ESG & Sustainability Excellence" />
        <meta property="og:description" content="Transform your career with comprehensive ESG and sustainability certification programs designed for African professionals." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://greenpathinstitute.com/home" />
        <link rel="canonical" href="https://greenpathinstitute.com/home" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <HeroSection />
          <FeaturedCoursesSection />
          <TrustSignalsSection />
          <OrganizationalTrainingSection />
        </main>

        {/* Footer */}
        <footer className="bg-foreground text-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {/* Company Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="white"/>
                    </svg>
                  </div>
                  <span className="font-heading font-semibold text-xl">GreenPath Institute</span>
                </div>
                <p className="font-body text-sm text-gray-300 leading-relaxed">
                  Empowering African professionals with world-class ESG and sustainability education for a greener future.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-300 hover:text-primary transition-colors duration-300">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-primary transition-colors duration-300">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-primary transition-colors duration-300">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-body font-semibold text-lg mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="/courses" className="font-caption text-sm text-gray-300 hover:text-primary transition-colors duration-300">All Courses</a></li>
                  <li><a href="/pricing" className="font-caption text-sm text-gray-300 hover:text-primary transition-colors duration-300">Pricing</a></li>
                  <li><a href="/about" className="font-caption text-sm text-gray-300 hover:text-primary transition-colors duration-300">About Us</a></li>
                  <li><a href="/contact" className="font-caption text-sm text-gray-300 hover:text-primary transition-colors duration-300">Contact</a></li>
                  <li><a href="/verify" className="font-caption text-sm text-gray-300 hover:text-primary transition-colors duration-300">Verify Certificate</a></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="font-body font-semibold text-lg mb-4">Support</h4>
                <ul className="space-y-2">
                  <li><a href="/help" className="font-caption text-sm text-gray-300 hover:text-primary transition-colors duration-300">Help Center</a></li>
                  <li><a href="/privacy" className="font-caption text-sm text-gray-300 hover:text-primary transition-colors duration-300">Privacy Policy</a></li>
                  <li><a href="/terms" className="font-caption text-sm text-gray-300 hover:text-primary transition-colors duration-300">Terms of Service</a></li>
                  <li><a href="/refund" className="font-caption text-sm text-gray-300 hover:text-primary transition-colors duration-300">Refund Policy</a></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="font-body font-semibold text-lg mb-4">Contact Info</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" className="text-primary mt-1">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span className="font-caption text-sm text-gray-300">Lagos, Nigeria & Cape Town, South Africa</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" className="text-primary">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    <span className="font-caption text-sm text-gray-300">info@greenpathinstitute.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" className="text-primary">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    <span className="font-caption text-sm text-gray-300">+234 (0) 123 456 7890</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="font-caption text-sm text-gray-300 mb-4 md:mb-0">
                © {new Date()?.getFullYear()} GreenPath Institute. All rights reserved.
              </p>
              <div className="flex items-center space-x-6">
                <span className="font-caption text-sm text-gray-300">Powered by sustainable technology</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="font-caption text-xs text-success">Carbon Neutral Platform</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;