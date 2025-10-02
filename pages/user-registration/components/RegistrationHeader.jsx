import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon.jsx';

const RegistrationHeader = () => {
  return (
    <div className="text-center space-y-4">
      {/* Logo */}
      <Link to="/home" className="inline-flex items-center space-x-2">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="Leaf" size={24} color="white" />
        </div>
        <span className="font-heading font-bold text-2xl text-foreground">
          GreenPath Institute
        </span>
      </Link>

      {/* Heading */}
      <div className="space-y-2">
        <h1 className="font-heading font-bold text-3xl lg:text-4xl text-foreground">
          Join the ESG Revolution
        </h1>
        <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
          Create your account to access world-class ESG and sustainability courses designed for African professionals
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <div className="flex items-center space-x-3 p-4 bg-card border border-border rounded-lg">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Award" size={20} color="var(--color-primary)" />
          </div>
          <div className="text-left">
            <p className="font-body font-semibold text-sm text-foreground">
              Certified Courses
            </p>
            <p className="font-caption text-xs text-muted-foreground">
              Industry-recognized certificates
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-card border border-border rounded-lg">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Users" size={20} color="var(--color-primary)" />
          </div>
          <div className="text-left">
            <p className="font-body font-semibold text-sm text-foreground">
              Expert Instructors
            </p>
            <p className="font-caption text-xs text-muted-foreground">
              Learn from industry leaders
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-card border border-border rounded-lg">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Globe" size={20} color="var(--color-primary)" />
          </div>
          <div className="text-left">
            <p className="font-body font-semibold text-sm text-foreground">
              Global Network
            </p>
            <p className="font-caption text-xs text-muted-foreground">
              Connect with professionals
            </p>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="flex items-center justify-center space-x-6 text-muted-foreground">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} />
          <span className="font-caption text-xs">Secure & Private</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} />
          <span className="font-caption text-xs">2 min setup</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="CheckCircle" size={16} />
          <span className="font-caption text-xs">Free to start</span>
        </div>
      </div>
    </div>
  );
};

export default RegistrationHeader;