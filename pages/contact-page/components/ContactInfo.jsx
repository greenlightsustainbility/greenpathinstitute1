import React from 'react';
import Icon from '../../../components/AppIcon.jsx';

const ContactInfo = () => {
  const contactDetails = [
    {
      icon: 'Mail',
      title: 'Email Us',
      primary: 'info@greenpathinstitute.com',
      secondary: 'support@greenpathinstitute.com',
      description: 'General inquiries and support'
    },
    {
      icon: 'Phone',
      title: 'Call Us',
      primary: '+234 (0) 123 456 7890',
      secondary: '+1 (555) 123-4567',
      description: 'Mon-Fri, 9:00 AM - 6:00 PM WAT'
    },
    {
      icon: 'MapPin',
      title: 'Visit Us',
      primary: 'Lagos, Nigeria',
      secondary: 'Virtual Campus Available',
      description: 'Serving professionals across Africa'
    },
    {
      icon: 'Clock',
      title: 'Business Hours',
      primary: 'Monday - Friday',
      secondary: '9:00 AM - 6:00 PM WAT',
      description: 'Weekend support available'
    }
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: 'Linkedin',
      url: 'https://linkedin.com/company/greenpath-institute',
      description: 'Connect with us professionally'
    },
    {
      name: 'Twitter',
      icon: 'Twitter',
      url: 'https://twitter.com/greenpathinst',
      description: 'Follow for updates'
    },
    {
      name: 'YouTube',
      icon: 'Youtube',
      url: 'https://youtube.com/greenpathinstitute',
      description: 'Watch course previews'
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      url: 'https://facebook.com/greenpathinstitute',
      description: 'Join our community'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Contact Details */}
      <div className="bg-card border border-border rounded-lg p-6 lg:p-8">
        <h2 className="font-heading font-semibold text-2xl text-card-foreground mb-6">
          Contact Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactDetails?.map((detail, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={detail?.icon} size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-body font-semibold text-base text-card-foreground mb-1">
                  {detail?.title}
                </h3>
                <p className="font-body text-sm text-text-primary mb-1">
                  {detail?.primary}
                </p>
                {detail?.secondary && (
                  <p className="font-body text-sm text-text-secondary mb-1">
                    {detail?.secondary}
                  </p>
                )}
                <p className="font-caption text-xs text-text-secondary">
                  {detail?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Response Time */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Clock" size={16} className="text-primary" />
          </div>
          <h3 className="font-body font-semibold text-base text-card-foreground">
            Response Time
          </h3>
        </div>
        <p className="font-body text-sm text-text-secondary mb-2">
          We typically respond to all inquiries within 24 hours during business days.
        </p>
        <p className="font-caption text-xs text-text-secondary">
          For urgent matters, please call us directly during business hours.
        </p>
      </div>
      {/* Social Media */}
      <div className="bg-card border border-border rounded-lg p-6 lg:p-8">
        <h2 className="font-heading font-semibold text-xl text-card-foreground mb-4">
          Connect With Us
        </h2>
        <p className="font-body text-sm text-text-secondary mb-6">
          Follow us on social media for the latest updates, course announcements, and sustainability insights.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {socialLinks?.map((social, index) => (
            <a
              key={index}
              href={social?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 border border-border rounded-lg hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 group"
            >
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center mb-2 group-hover:bg-primary/10 transition-colors duration-200">
                <Icon name={social?.icon} size={20} className="text-text-secondary group-hover:text-primary transition-colors duration-200" />
              </div>
              <span className="font-body font-medium text-sm text-card-foreground mb-1">
                {social?.name}
              </span>
              <span className="font-caption text-xs text-text-secondary text-center">
                {social?.description}
              </span>
            </a>
          ))}
        </div>
      </div>
      {/* Office Information */}
      <div className="bg-card border border-border rounded-lg p-6 lg:p-8">
        <h2 className="font-heading font-semibold text-xl text-card-foreground mb-4">
          Our Presence
        </h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="MapPin" size={16} className="text-primary" />
            </div>
            <div>
              <h3 className="font-body font-semibold text-base text-card-foreground mb-1">
                Headquarters
              </h3>
              <p className="font-body text-sm text-text-secondary mb-2">
                Lagos, Nigeria - Serving the African continent with world-class ESG education
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Globe" size={16} className="text-primary" />
            </div>
            <div>
              <h3 className="font-body font-semibold text-base text-card-foreground mb-1">
                Virtual Campus
              </h3>
              <p className="font-body text-sm text-text-secondary mb-2">
                Access our courses from anywhere in Africa with our fully online learning platform
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;