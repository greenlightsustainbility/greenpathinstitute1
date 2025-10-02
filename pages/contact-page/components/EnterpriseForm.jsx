import React, { useState } from 'react';
import Input from '../../../components/ui/Input.jsx';
import Button from '../../../components/ui/Button.jsx';
import Select from '../../../components/ui/select.jsx';
import Icon from '../../../components/AppIcon.jsx';

const EnterpriseForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    teamSize: '',
    trainingRequirements: '',
    budgetRange: '',
    timeline: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [discountInfo, setDiscountInfo] = useState(null);

  const teamSizeOptions = [
    { value: '1-3', label: '1-3 employees' },
    { value: '4-9', label: '4-9 employees', discount: '15%' },
    { value: '10-49', label: '10-49 employees', discount: '25%' },
    { value: '50-99', label: '50-99 employees', discount: '40%' },
    { value: '100+', label: '100+ employees', discount: '40%' }
  ];

  const budgetRangeOptions = [
    { value: 'under-5k', label: 'Under $5,000' },
    { value: '5k-15k', label: '$5,000 - $15,000' },
    { value: '15k-50k', label: '$15,000 - $50,000' },
    { value: '50k-100k', label: '$50,000 - $100,000' },
    { value: 'over-100k', label: 'Over $100,000' }
  ];

  const timelineOptions = [
    { value: 'immediate', label: 'Immediate (Within 1 month)' },
    { value: '1-3months', label: '1-3 months' },
    { value: '3-6months', label: '3-6 months' },
    { value: '6-12months', label: '6-12 months' },
    { value: 'planning', label: 'Still planning' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.companyName?.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData?.contactName?.trim()) {
      newErrors.contactName = 'Contact name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.teamSize) {
      newErrors.teamSize = 'Please select team size';
    }

    if (!formData?.trainingRequirements?.trim()) {
      newErrors.trainingRequirements = 'Training requirements are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Update discount info when team size changes
    if (field === 'teamSize') {
      const selectedOption = teamSizeOptions?.find(option => option?.value === value);
      if (selectedOption && selectedOption?.discount) {
        setDiscountInfo({
          discount: selectedOption?.discount,
          teamSize: selectedOption?.label
        });
      } else {
        setDiscountInfo(null);
      }
    }

    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        teamSize: '',
        trainingRequirements: '',
        budgetRange: '',
        timeline: '',
        message: ''
      });
      setDiscountInfo(null);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Building2" size={32} className="text-primary" />
        </div>
        <h3 className="font-heading font-semibold text-xl text-card-foreground mb-2">
          Enterprise Inquiry Submitted!
        </h3>
        <p className="font-body text-text-secondary mb-6">
          Thank you for your interest in our enterprise solutions. Our sales team will contact you within 24 hours to discuss your training needs.
        </p>
        <Button 
          variant="outline" 
          onClick={() => setIsSubmitted(false)}
        >
          Submit Another Inquiry
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 lg:p-8">
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Building2" size={20} className="text-primary" />
          </div>
          <h2 className="font-heading font-semibold text-2xl text-card-foreground">
            Enterprise Solutions
          </h2>
        </div>
        <p className="font-body text-text-secondary">
          Looking to train your team? Get bulk discounts and customized training solutions.
        </p>
      </div>
      {discountInfo && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Tag" size={16} className="text-primary" />
            <span className="font-body font-medium text-sm text-primary">
              Bulk Discount Available
            </span>
          </div>
          <p className="font-body text-sm text-text-secondary">
            Teams with {discountInfo?.teamSize?.toLowerCase()} qualify for {discountInfo?.discount} discount on all courses.
          </p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Company Name"
            type="text"
            placeholder="Enter your company name"
            value={formData?.companyName}
            onChange={(e) => handleInputChange('companyName', e?.target?.value)}
            error={errors?.companyName}
            required
          />

          <Input
            label="Contact Name"
            type="text"
            placeholder="Enter your full name"
            value={formData?.contactName}
            onChange={(e) => handleInputChange('contactName', e?.target?.value)}
            error={errors?.contactName}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your work email"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="Enter your phone number"
            value={formData?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            error={errors?.phone}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Team Size"
            placeholder="Select team size"
            options={teamSizeOptions}
            value={formData?.teamSize}
            onChange={(value) => handleInputChange('teamSize', value)}
            error={errors?.teamSize}
            required
          />

          <Select
            label="Budget Range"
            placeholder="Select budget range"
            options={budgetRangeOptions}
            value={formData?.budgetRange}
            onChange={(value) => handleInputChange('budgetRange', value)}
            error={errors?.budgetRange}
          />
        </div>

        <Select
          label="Timeline"
          placeholder="When do you plan to start training?"
          options={timelineOptions}
          value={formData?.timeline}
          onChange={(value) => handleInputChange('timeline', value)}
          error={errors?.timeline}
        />

        <div>
          <label className="block font-body font-medium text-sm text-card-foreground mb-2">
            Training Requirements <span className="text-destructive">*</span>
          </label>
          <textarea
            placeholder="Describe your training needs, specific courses of interest, or any custom requirements..."
            value={formData?.trainingRequirements}
            onChange={(e) => handleInputChange('trainingRequirements', e?.target?.value)}
            rows={4}
            className={`w-full px-3 py-2 border rounded-lg font-body text-sm placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none ${
              errors?.trainingRequirements 
                ? 'border-destructive bg-destructive/5' :'border-border bg-input'
            }`}
          />
          {errors?.trainingRequirements && (
            <p className="mt-1 text-sm text-destructive font-body">
              {errors?.trainingRequirements}
            </p>
          )}
        </div>

        <div>
          <label className="block font-body font-medium text-sm text-card-foreground mb-2">
            Additional Message
          </label>
          <textarea
            placeholder="Any additional information or questions..."
            value={formData?.message}
            onChange={(e) => handleInputChange('message', e?.target?.value)}
            rows={3}
            className="w-full px-3 py-2 border border-border bg-input rounded-lg font-body text-sm placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
          />
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          loading={isSubmitting}
          iconName="Send"
          iconPosition="right"
          fullWidth
        >
          {isSubmitting ? 'Submitting Inquiry...' : 'Submit Enterprise Inquiry'}
        </Button>
      </form>
    </div>
  );
};

export default EnterpriseForm;