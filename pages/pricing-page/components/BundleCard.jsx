import React from 'react';
import Button from '../../../components/ui/Button.jsx';
import Icon from '../../../components/AppIcon.jsx';

const BundleCard = ({ bundle, selectedCurrency, onEnroll }) => {
  const formatPrice = (price, currency) => {
    const symbols = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      NGN: '₦',
      ZAR: 'R'
    };
    
    return `${symbols?.[currency] || '$'}${price?.toLocaleString()}`;
  };

  const calculateSavings = () => {
    const originalPrice = bundle?.originalPrice?.[selectedCurrency];
    const bundlePrice = bundle?.price?.[selectedCurrency];
    const savings = originalPrice - bundlePrice;
    const percentage = Math.round((savings / originalPrice) * 100);
    
    return {
      amount: savings,
      percentage
    };
  };

  const savings = calculateSavings();

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-elevation hover:shadow-elevation-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-heading font-bold text-xl text-card-foreground mb-2">
            {bundle?.name}
          </h3>
          <p className="text-text-secondary text-sm mb-3">
            {bundle?.description}
          </p>
        </div>
        
        {bundle?.badge && (
          <div className="bg-success text-success-foreground px-3 py-1 rounded-full text-xs font-semibold ml-4">
            {bundle?.badge}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-2xl font-bold text-card-foreground">
            {formatPrice(bundle?.price?.[selectedCurrency], selectedCurrency)}
          </div>
          <div className="text-text-secondary text-sm line-through">
            {formatPrice(bundle?.originalPrice?.[selectedCurrency], selectedCurrency)}
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-success font-semibold">
            Save {formatPrice(savings?.amount, selectedCurrency)}
          </div>
          <div className="text-success text-sm">
            ({savings?.percentage}% off)
          </div>
        </div>
      </div>
      <div className="space-y-3 mb-6">
        <h4 className="font-body font-semibold text-sm text-card-foreground">
          Included Courses:
        </h4>
        {bundle?.courses?.map((course, index) => (
          <div key={index} className="flex items-center space-x-3">
            <Icon name="BookOpen" size={16} className="text-primary" />
            <span className="text-sm text-card-foreground">{course}</span>
          </div>
        ))}
      </div>
      <div className="space-y-3 mb-6">
        <h4 className="font-body font-semibold text-sm text-card-foreground">
          Bundle Benefits:
        </h4>
        {bundle?.benefits?.map((benefit, index) => (
          <div key={index} className="flex items-center space-x-3">
            <Icon name="Check" size={16} className="text-success" />
            <span className="text-sm text-card-foreground">{benefit}</span>
          </div>
        ))}
      </div>
      <Button
        variant="default"
        fullWidth
        onClick={() => onEnroll(bundle)}
        iconName="ShoppingCart"
        iconPosition="left"
      >
        Enroll in Bundle
      </Button>
      <p className="text-xs text-text-secondary text-center mt-3">
        {bundle?.additionalInfo}
      </p>
    </div>
  );
};

export default BundleCard;