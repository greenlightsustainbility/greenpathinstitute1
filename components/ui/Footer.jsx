import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon.jsx';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    company: [
      { label: 'About GreenPath', href: '#about' },
      { label: 'Our Mission', href: '#mission' },
      { label: 'Careers', href: '#careers' },
      { label: 'News', href: '#news' }
    ],
    courses: [
      { label: 'All Courses', href: '/course-listing' },
      { label: 'ESG Fundamentals', href: '/course-listing?category=esg-fundamentals' },
      { label: 'Sustainability', href: '/course-listing?category=sustainability' },
      { label: 'Certification', href: '/certificate-verification' }
    ],
    support: [
      { label: 'Contact Us', href: '/contact-page' },
      { label: 'Help Center', href: '#help' },
      { label: 'Student Portal', href: '#portal' },
      { label: 'Technical Support', href: '#tech-support' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms of Service', href: '#terms' },
      { label: 'Cookie Policy', href: '#cookies' },
      { label: 'Data Protection', href: '#data-protection' }
    ]
  };

  const socialLinks = [
    { name: 'LinkedIn', icon: 'Linkedin', href: '#linkedin' },
    { name: 'Twitter', icon: 'Twitter', href: '#twitter' },
    { name: 'Facebook', icon: 'Facebook', href: '#facebook' },
    { name: 'Instagram', icon: 'Instagram', href: '#instagram' },
    { name: 'YouTube', icon: 'Youtube', href: '#youtube' }
  ];

  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Leaf" size={20} color="white" />
              </div>
              <span className="font-heading font-semibold text-xl text-text-primary">
                GreenPath Institute
              </span>
            </Link>
            <p className="text-text-secondary text-sm mb-6 leading-relaxed">
              Advance your career in sustainability with expert-led courses, practical skills, and globally recognized certifications. 
              The learning arm of GreenPath Sustainability.
            </p>
            <div className="flex space-x-4">
              {socialLinks?.map((social) => (
                <a
                  key={social?.name}
                  href={social?.href}
                  className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-text-secondary hover:bg-primary hover:text-white transition-all duration-200"
                  aria-label={social?.name}
                >
                  <Icon name={social?.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-heading font-semibold text-text-primary mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks?.company?.map((link) => (
                <li key={link?.label}>
                  <a
                    href={link?.href}
                    className="text-text-secondary text-sm hover:text-primary transition-colors duration-200"
                  >
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses Links */}
          <div>
            <h3 className="font-heading font-semibold text-text-primary mb-4">
              Courses
            </h3>
            <ul className="space-y-3">
              {footerLinks?.courses?.map((link) => (
                <li key={link?.label}>
                  <Link
                    to={link?.href}
                    className="text-text-secondary text-sm hover:text-primary transition-colors duration-200"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-heading font-semibold text-text-primary mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks?.support?.map((link) => (
                <li key={link?.label}>
                  <Link
                    to={link?.href?.startsWith('/') ? link?.href : '#'}
                    className="text-text-secondary text-sm hover:text-primary transition-colors duration-200"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-heading font-semibold text-text-primary mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks?.legal?.map((link) => (
                <li key={link?.label}>
                  <a
                    href={link?.href}
                    className="text-text-secondary text-sm hover:text-primary transition-colors duration-200"
                  >
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <Icon name="Mail" size={18} className="text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Email Us</p>
                <a 
                  href="mailto:support@greenpathinstitute.org"
                  className="text-sm font-medium text-text-primary hover:text-primary transition-colors duration-200"
                >
                  support@greenpathinstitute.org
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <Icon name="Phone" size={18} className="text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Call Us</p>
                <a 
                  href="tel:+234XXXXXXXXX"
                  className="text-sm font-medium text-text-primary hover:text-primary transition-colors duration-200"
                >
                  +234 XXX XXX XXXX
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <Icon name="MapPin" size={18} className="text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Visit Us</p>
                <p className="text-sm font-medium text-text-primary">
                  Lagos, Nigeria
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-text-secondary text-sm">
            © {currentYear} GreenPath Institute. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link
              to="/certificate-verification"
              className="flex items-center space-x-2 text-sm text-text-secondary hover:text-primary transition-colors duration-200"
            >
              <Icon name="Shield" size={16} />
              <span>Verify Certificate</span>
            </Link>
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Icon name="Award" size={16} />
              <span>Globally Recognized</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;