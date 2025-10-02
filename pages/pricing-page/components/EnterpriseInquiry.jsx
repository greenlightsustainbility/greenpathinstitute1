import React, { useState } from 'react';
import Button from '../../../components/ui/Button.jsx';
import Input from '../../../components/ui/Input.jsx';
import Select from '../../../components/ui/select.jsx';
import { Checkbox } from '../../../components/ui/Checkbox.jsx';
import Icon from '../../../components/AppIcon.jsx';


const EnterpriseInquiry = ({ className = '' }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    teamSize: '',
    industry: '',
    requirements: '',
    timeline: '',
    agreeToContact: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const teamSizeOptions = [
    { value: '10-49', label: '10-49 employees' },
    { value: '50-99', label: '50-99 employees' },
    { value: '100-499', label: '100-499 employees' },
    { value: '500-999', label: '500-999 employees' },
    { value: '1000+', label: '1000+ employees' }
  ];

  const industryOptions = [
    { value: 'financial-services', label: 'Financial Services' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'energy', label: 'Energy & Utilities' },
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'retail', label: 'Retail & Consumer Goods' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'government', label: 'Government & Public Sector' },
    { value: 'other', label: 'Other' }
  ];

  const timelineOptions = [
    { value: 'immediate', label: 'Immediate (within 1 month)' },
    { value: 'quarter', label: 'This quarter (1-3 months)' },
    { value: 'half-year', label: 'Next 6 months' },
    { value: 'year', label: 'Within a year' },
    { value: 'exploring', label: 'Just exploring options' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={`bg-card border border-border rounded-xl p-8 text-center ${className}`}>
        <div className="w-16 h-16 bg-success text-success-foreground rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Check" size={32} />
        </div>
        <h3 className="font-heading font-bold text-xl text-card-foreground mb-2">
          Thank You for Your Interest!
        </h3>
        <p className="text-text-secondary mb-4">
          We've received your enterprise inquiry and will contact you within 24 hours to discuss your custom training needs.
        </p>
        <Button 
          variant="outline" 
          onClick={() => setSubmitted(false)}
        >
          Submit Another Inquiry
        </Button>
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-xl p-6 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="font-heading font-bold text-xl text-card-foreground mb-2">
          Enterprise Custom Pricing
        </h3>
        <p className="text-text-secondary">
          Get a tailored quote for your organization's ESG training needs
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Company Name"
            name="companyName"
            value={formData?.companyName}
            onChange={handleInputChange}
            required
            placeholder="Enter your company name"
          />
          
          <Input
            label="Contact Name"
            name="contactName"
            value={formData?.contactName}
            onChange={handleInputChange}
            required
            placeholder="Your full name"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData?.email}
            onChange={handleInputChange}
            required
            placeholder="your.email@company.com"
          />
          
          <Input
            label="Phone Number"
            type="tel"
            name="phone"
            value={formData?.phone}
            onChange={handleInputChange}
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Team Size"
            options={teamSizeOptions}
            value={formData?.teamSize}
            onChange={(value) => handleSelectChange('teamSize', value)}
            required
            placeholder="Select team size"
          />
          
          <Select
            label="Industry"
            options={industryOptions}
            value={formData?.industry}
            onChange={(value) => handleSelectChange('industry', value)}
            required
            placeholder="Select your industry"
          />
        </div>

        <Select
          label="Implementation Timeline"
          options={timelineOptions}
          value={formData?.timeline}
          onChange={(value) => handleSelectChange('timeline', value)}
          placeholder="When do you plan to start?"
        />

        <Input
          label="Specific Requirements"
          name="requirements"
          value={formData?.requirements}
          onChange={handleInputChange}
          placeholder="Tell us about your specific training needs, compliance requirements, or custom content requests..."
          className="min-h-[100px]"
        />

        <Checkbox
          label="I agree to be contacted by GreenPath Institute regarding this inquiry"
          name="agreeToContact"
          checked={formData?.agreeToContact}
          onChange={handleInputChange}
          required
        />

        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={isSubmitting}
          disabled={!formData?.agreeToContact}
        >
          {isSubmitting ? 'Submitting...' : 'Request Custom Quote'}
        </Button>
      </form>
      <div className="mt-6 pt-4 border-t border-border text-center">
        <p className="text-sm text-text-secondary mb-2">
          <strong>Enterprise Benefits:</strong>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-text-secondary">
          <div>• Custom learning paths</div>
          <div>• Dedicated account manager</div>
          <div>• Advanced analytics</div>
          <div>• White-label options</div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseInquiry;