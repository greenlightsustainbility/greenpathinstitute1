import React from 'react';
import Icon from '../../../components/AppIcon.jsx';
import Image from '../../../components/AppImage.jsx';

const OrderSummary = ({ orderItems, currency, exchangeRate, subtotal, discount, tax, total }) => {
  const formatPrice = (price, showUSD = false) => {
    const symbols = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      NGN: '₦',
      ZAR: 'R'
    };

    const symbol = symbols?.[currency] || '$';
    const formattedPrice = `${symbol}${price?.toLocaleString()}`;
    
    if (showUSD && currency !== 'USD') {
      const usdPrice = (price / exchangeRate)?.toFixed(2);
      return `${formattedPrice} (~$${usdPrice})`;
    }
    
    return formattedPrice;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 h-fit">
      <h2 className="font-heading font-semibold text-xl text-card-foreground mb-6">
        Order Summary
      </h2>
      {/* Order Items */}
      <div className="space-y-4 mb-6">
        {orderItems?.map((item) => (
          <div key={item?.id} className="flex items-start space-x-4 p-4 bg-muted rounded-lg">
            <div className="w-16 h-12 rounded-md overflow-hidden flex-shrink-0">
              <Image
                src={item?.thumbnail}
                alt={item?.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-body font-medium text-sm text-card-foreground truncate">
                {item?.title}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <Icon name="Clock" size={14} className="text-text-secondary" />
                <span className="font-caption text-xs text-text-secondary">
                  {item?.duration}
                </span>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <Icon name="Award" size={14} className="text-text-secondary" />
                <span className="font-caption text-xs text-text-secondary">
                  Certificate included
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="font-body font-semibold text-sm text-card-foreground">
                {formatPrice(item?.price)}
              </p>
              {item?.originalPrice && item?.originalPrice > item?.price && (
                <p className="font-caption text-xs text-text-secondary line-through">
                  {formatPrice(item?.originalPrice)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Pricing Breakdown */}
      <div className="border-t border-border pt-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="font-body text-sm text-text-secondary">Subtotal</span>
          <span className="font-body font-medium text-sm text-card-foreground">
            {formatPrice(subtotal)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between items-center">
            <span className="font-body text-sm text-success">Discount</span>
            <span className="font-body font-medium text-sm text-success">
              -{formatPrice(discount)}
            </span>
          </div>
        )}

        {tax > 0 && (
          <div className="flex justify-between items-center">
            <span className="font-body text-sm text-text-secondary">Tax</span>
            <span className="font-body font-medium text-sm text-card-foreground">
              {formatPrice(tax)}
            </span>
          </div>
        )}

        <div className="border-t border-border pt-3">
          <div className="flex justify-between items-center">
            <span className="font-body font-semibold text-base text-card-foreground">
              Total
            </span>
            <div className="text-right">
              <span className="font-body font-bold text-lg text-primary">
                {formatPrice(total, true)}
              </span>
              {currency !== 'USD' && (
                <p className="font-caption text-xs text-text-secondary mt-1">
                  Exchange rate: 1 USD = {exchangeRate} {currency}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Security Badges */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="font-caption text-xs text-text-secondary">SSL Secured</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Lock" size={16} className="text-success" />
            <span className="font-caption text-xs text-text-secondary">PCI Compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;