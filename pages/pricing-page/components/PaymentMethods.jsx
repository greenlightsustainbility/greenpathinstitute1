import React from 'react';
import Icon from '../../../components/AppIcon.jsx';

const PaymentMethods = ({ className = '' }) => {
  const paymentMethods = [
    {
      name: 'Stripe',
      description: 'Global payments with card support',
      icon: 'CreditCard',
      regions: ['Global', 'USD', 'EUR', 'GBP'],
      color: 'text-blue-600'
    },
    {
      name: 'Paystack',
      description: 'Nigerian payment gateway',
      icon: 'Banknote',
      regions: ['Nigeria', 'NGN'],
      color: 'text-green-600'
    },
    {
      name: 'Flutterwave',
      description: 'African payment solutions',
      icon: 'Wallet',
      regions: ['Africa', 'Multi-currency'],
      color: 'text-orange-600'
    }
  ];

  const securityFeatures = [
    'SSL Encrypted Transactions',
    'PCI DSS Compliant',
    '3D Secure Authentication',
    'Fraud Protection',
    'Instant Payment Confirmation'
  ];

  return (
    <div className={`bg-muted rounded-xl p-6 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="font-heading font-bold text-xl text-foreground mb-2">
          Secure Payment Methods
        </h3>
        <p className="text-text-secondary">
          Choose from multiple trusted payment providers for your region
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {paymentMethods?.map((method, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4 text-center">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-background mb-3`}>
              <Icon name={method?.icon} size={24} className={method?.color} />
            </div>
            
            <h4 className="font-body font-semibold text-card-foreground mb-1">
              {method?.name}
            </h4>
            <p className="text-text-secondary text-sm mb-2">
              {method?.description}
            </p>
            
            <div className="flex flex-wrap justify-center gap-1">
              {method?.regions?.map((region, idx) => (
                <span key={idx} className="bg-muted text-text-secondary px-2 py-1 rounded text-xs">
                  {region}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-border pt-4">
        <h4 className="font-body font-semibold text-foreground mb-3 text-center">
          Security & Trust
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {securityFeatures?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-success" />
              <span className="text-sm text-text-secondary">{feature}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-xs text-text-secondary">
          All payments are processed securely. We never store your payment information.
        </p>
      </div>
    </div>
  );
};

export default PaymentMethods;