import React, { useState } from 'react';
import Input from '../../../components/ui/Input.jsx';
import Button from '../../../components/ui/Button.jsx';
import Icon from '../../../components/AppIcon.jsx';

const CouponCode = ({ onCouponApply, appliedCoupon, discount, loading, currency }) => {
  const [couponCode, setCouponCode] = useState('');
  const [error, setError] = useState('');

  const formatPrice = (price) => {
    const symbols = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      NGN: '₦',
      ZAR: 'R'
    };
    const symbol = symbols?.[currency] || '$';
    return `${symbol}${price?.toLocaleString()}`;
  };

  const handleApplyCoupon = async () => {
    if (!couponCode?.trim()) {
      setError('Please enter a coupon code');
      return;
    }

    setError('');
    
    // Mock coupon validation
    const mockCoupons = {
      'WELCOME10': { discount: 10, type: 'percentage', description: '10% off your first course' },
      'SAVE20': { discount: 20, type: 'percentage', description: '20% off all courses' },
      'STUDENT50': { discount: 50, type: 'fixed', description: '$50 off for students' },
      'BULK15': { discount: 15, type: 'percentage', description: '15% bulk discount' },
      'EARLY25': { discount: 25, type: 'percentage', description: '25% early bird discount' }
    };

    const coupon = mockCoupons?.[couponCode?.toUpperCase()];
    
    if (coupon) {
      onCouponApply({
        code: couponCode?.toUpperCase(),
        ...coupon
      });
      setCouponCode('');
    } else {
      setError('Invalid coupon code. Please check and try again.');
    }
  };

  const handleRemoveCoupon = () => {
    onCouponApply(null);
    setCouponCode('');
    setError('');
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      handleApplyCoupon();
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Tag" size={20} className="text-primary" />
        <h3 className="font-heading font-semibold text-lg text-card-foreground">
          Coupon Code
        </h3>
      </div>
      {!appliedCoupon ? (
        <div className="space-y-4">
          <div className="flex space-x-2">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e?.target?.value?.toUpperCase())}
                onKeyPress={handleKeyPress}
                error={error}
              />
            </div>
            <Button
              variant="outline"
              onClick={handleApplyCoupon}
              loading={loading}
              disabled={!couponCode?.trim() || loading}
            >
              Apply
            </Button>
          </div>

          {/* Sample Coupons for Demo */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-body font-medium text-sm text-card-foreground mb-3">
              Available Coupons:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <code className="px-2 py-1 bg-primary/10 text-primary text-xs rounded font-mono">
                  WELCOME10
                </code>
                <span className="font-caption text-xs text-text-secondary">10% off</span>
              </div>
              <div className="flex items-center space-x-2">
                <code className="px-2 py-1 bg-primary/10 text-primary text-xs rounded font-mono">
                  SAVE20
                </code>
                <span className="font-caption text-xs text-text-secondary">20% off</span>
              </div>
              <div className="flex items-center space-x-2">
                <code className="px-2 py-1 bg-primary/10 text-primary text-xs rounded font-mono">
                  STUDENT50
                </code>
                <span className="font-caption text-xs text-text-secondary">$50 off</span>
              </div>
              <div className="flex items-center space-x-2">
                <code className="px-2 py-1 bg-primary/10 text-primary text-xs rounded font-mono">
                  EARLY25
                </code>
                <span className="font-caption text-xs text-text-secondary">25% off</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-success/10 border border-success/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                <Icon name="Check" size={16} className="text-white" />
              </div>
              <div>
                <h4 className="font-body font-medium text-sm text-success">
                  Coupon Applied Successfully!
                </h4>
                <p className="font-caption text-xs text-success/80 mt-1">
                  {appliedCoupon?.description}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <code className="px-2 py-1 bg-success/20 text-success text-xs rounded font-mono">
                    {appliedCoupon?.code}
                  </code>
                  <span className="font-body font-semibold text-sm text-success">
                    You saved {formatPrice(discount)}!
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={handleRemoveCoupon}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponCode;