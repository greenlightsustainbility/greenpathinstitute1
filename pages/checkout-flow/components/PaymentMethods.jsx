import React, { useState } from 'react';
import Icon from '../../../components/AppIcon.jsx';
import Button from '../../../components/ui/Button.jsx';

const PaymentMethods = ({ selectedMethod, onMethodSelect, currency, onPaymentSubmit, loading }) => {
  const [showMethods, setShowMethods] = useState(true);

  const paymentMethods = [
    {
      id: 'stripe',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, American Express',
      icon: 'CreditCard',
      available: true,
      recommended: currency !== 'NGN'
    },
    {
      id: 'paystack',
      name: 'Paystack',
      description: 'Bank transfer, card, USSD',
      icon: 'Building2',
      available: currency === 'NGN',
      recommended: currency === 'NGN'
    },
    {
      id: 'flutterwave',
      name: 'Flutterwave',
      description: 'Mobile money, bank transfer',
      icon: 'Smartphone',
      available: currency === 'NGN',
      recommended: false
    }
  ];

  const availableMethods = paymentMethods?.filter(method => method?.available);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-semibold text-xl text-card-foreground">
          Payment Method
        </h2>
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="font-caption text-xs text-success">Secure Payment</span>
        </div>
      </div>
      {/* Payment Method Selection */}
      <div className="space-y-3 mb-6">
        {availableMethods?.map((method) => (
          <div
            key={method?.id}
            className={`relative border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
              selectedMethod === method?.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onClick={() => onMethodSelect(method?.id)}
          >
            <div className="flex items-center space-x-4">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedMethod === method?.id
                  ? 'border-primary bg-primary' :'border-border'
              }`}>
                {selectedMethod === method?.id && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              
              <div className="flex items-center space-x-3 flex-1">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  selectedMethod === method?.id ? 'bg-primary text-white' : 'bg-muted'
                }`}>
                  <Icon name={method?.icon} size={20} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-body font-medium text-sm text-card-foreground">
                      {method?.name}
                    </h3>
                    {method?.recommended && (
                      <span className="px-2 py-1 bg-accent text-white text-xs font-caption rounded-full">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="font-caption text-xs text-text-secondary mt-1">
                    {method?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Gateway Information */}
      {selectedMethod && (
        <div className="bg-muted rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div>
              <h4 className="font-body font-medium text-sm text-card-foreground mb-2">
                Payment Gateway Information
              </h4>
              {selectedMethod === 'stripe' && (
                <div className="space-y-2">
                  <p className="font-caption text-xs text-text-secondary">
                    • Secure international payment processing
                  </p>
                  <p className="font-caption text-xs text-text-secondary">
                    • 3D Secure authentication for added security
                  </p>
                  <p className="font-caption text-xs text-text-secondary">
                    • Instant payment confirmation
                  </p>
                </div>
              )}
              {selectedMethod === 'paystack' && (
                <div className="space-y-2">
                  <p className="font-caption text-xs text-text-secondary">
                    • Leading Nigerian payment processor
                  </p>
                  <p className="font-caption text-xs text-text-secondary">
                    • Support for all major Nigerian banks
                  </p>
                  <p className="font-caption text-xs text-text-secondary">
                    • USSD and mobile banking options
                  </p>
                </div>
              )}
              {selectedMethod === 'flutterwave' && (
                <div className="space-y-2">
                  <p className="font-caption text-xs text-text-secondary">
                    • African-focused payment solutions
                  </p>
                  <p className="font-caption text-xs text-text-secondary">
                    • Mobile money integration
                  </p>
                  <p className="font-caption text-xs text-text-secondary">
                    • Multi-currency support
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Payment Button */}
      <Button
        variant="default"
        size="lg"
        fullWidth
        loading={loading}
        disabled={!selectedMethod || loading}
        onClick={onPaymentSubmit}
        iconName="Lock"
        iconPosition="left"
      >
        {loading ? 'Processing Payment...' : 'Proceed to Payment'}
      </Button>
      {/* Security Notice */}
      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Shield" size={14} className="text-success mt-0.5" />
          <p className="font-caption text-xs text-text-secondary">
            Your payment information is encrypted and secure. We never store your card details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;