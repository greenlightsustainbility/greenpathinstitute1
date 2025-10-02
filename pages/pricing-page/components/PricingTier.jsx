import React from 'react';
import Button from '../../../components/ui/Button.jsx';
import Icon from '../../../components/AppIcon.jsx';

const PricingTier = ({ 
  tier, 
  isPopular = false, 
  selectedCurrency = 'USD',
  onEnroll 
}) => {
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

  const getDiscountBadge = () => {
    if (tier?.discount > 0) {
      return (
        <div className="absolute -top-3 -right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">Save {tier?.discount}%
                  </div>
      );
    }
    return null;
  };

  return (
    <div className={`relative bg-card border border-border rounded-xl p-6 ${
      isPopular ? 'ring-2 ring-primary shadow-elevation-lg' : 'shadow-elevation'
    }`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold">
            Most Popular
          </div>
        </div>
      )}
      {getDiscountBadge()}
      <div className="text-center mb-6">
        <h3 className="font-heading font-bold text-xl text-card-foreground mb-2">
          {tier?.name}
        </h3>
        <p className="text-text-secondary text-sm mb-4">
          {tier?.description}
        </p>
        
        <div className="mb-4">
          <div className="text-3xl font-bold text-card-foreground">
            {formatPrice(tier?.prices?.[selectedCurrency], selectedCurrency)}
          </div>
          <div className="text-text-secondary text-sm">
            {tier?.billingPeriod}
          </div>
          {tier?.originalPrice && (
            <div className="text-text-secondary text-sm line-through">
              {formatPrice(tier?.originalPrice?.[selectedCurrency], selectedCurrency)}
            </div>
          )}
        </div>
      </div>
      <div className="space-y-4 mb-6">
        {tier?.features?.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <Icon 
              name={feature?.included ? "Check" : "X"} 
              size={16} 
              className={feature?.included ? "text-success mt-0.5" : "text-text-secondary mt-0.5"} 
            />
            <span className={`text-sm ${
              feature?.included ? "text-card-foreground" : "text-text-secondary"
            }`}>
              {feature?.text}
            </span>
          </div>
        ))}
      </div>
      <Button
        variant={isPopular ? "default" : "outline"}
        fullWidth
        onClick={() => onEnroll(tier)}
        className="mb-4"
      >
        {tier?.buttonText}
      </Button>
      {tier?.additionalInfo && (
        <p className="text-xs text-text-secondary text-center">
          {tier?.additionalInfo}
        </p>
      )}
    </div>
  );
};

export default PricingTier;