import React, { useState } from 'react';
import Button from '../../../components/ui/Button.jsx';
import Input from '../../../components/ui/Input.jsx';
import Icon from '../../../components/AppIcon.jsx';

const CouponCode = ({ onCouponApply, className = '' }) => {
  const [couponCode, setCouponCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [error, setError] = useState('');

  const mockCoupons = {
    'WELCOME20': {
      code: 'WELCOME20',
      discount: 20,
      type: 'percentage',
      description: '20% off your first course',
      expiresAt: '2025-12-31',
      usageLimit: 100,
      usedCount: 45
    },
    'STUDENT15': {
      code: 'STUDENT15',
      discount: 15,
      type: 'percentage',
      description: '15% student discount',
      expiresAt: '2025-12-31',
      usageLimit: 500,
      usedCount: 234
    },
    'EARLY50': {
      code: 'EARLY50',
      discount: 50,
      type: 'fixed',
      description: '$50 off any bundle',
      expiresAt: '2025-10-31',
      usageLimit: 50,
      usedCount: 12
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode?.trim()) {
      setError('Please enter a coupon code');
      return;
    }

    setIsApplying(true);
    setError('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const coupon = mockCoupons?.[couponCode?.toUpperCase()];
    
    if (!coupon) {
      setError('Invalid coupon code');
      setIsApplying(false);
      return;
    }

    if (new Date(coupon.expiresAt) < new Date()) {
      setError('This coupon has expired');
      setIsApplying(false);
      return;
    }

    if (coupon?.usedCount >= coupon?.usageLimit) {
      setError('This coupon has reached its usage limit');
      setIsApplying(false);
      return;
    }

    setAppliedCoupon(coupon);
    setIsApplying(false);
    
    if (onCouponApply) {
      onCouponApply(coupon);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setError('');
    
    if (onCouponApply) {
      onCouponApply(null);
    }
  };

  const handleInputChange = (e) => {
    setCouponCode(e?.target?.value);
    setError('');
  };

  return (
    <div className={`bg-muted rounded-lg p-4 ${className}`}>
      <h3 className="font-heading font-semibold text-lg text-foreground mb-3">
        Have a Coupon Code?
      </h3>
      {appliedCoupon ? (
        <div className="bg-success/10 border border-success/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-success text-success-foreground rounded-full flex items-center justify-center">
                <Icon name="Check" size={16} />
              </div>
              <div>
                <div className="font-body font-semibold text-success">
                  {appliedCoupon?.code} Applied!
                </div>
                <div className="text-sm text-success/80">
                  {appliedCoupon?.description}
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
          
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-success/80">
              Discount: {appliedCoupon?.type === 'percentage' ? `${appliedCoupon?.discount}%` : `$${appliedCoupon?.discount}`}
            </span>
            <span className="text-success/80">
              Expires: {new Date(appliedCoupon.expiresAt)?.toLocaleDateString()}
            </span>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex space-x-2">
            <div className="flex-1">
              <Input
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={handleInputChange}
                error={error}
                className="uppercase"
              />
            </div>
            <Button
              variant="outline"
              onClick={handleApplyCoupon}
              loading={isApplying}
              disabled={!couponCode?.trim()}
            >
              Apply
            </Button>
          </div>

          <div className="text-sm text-text-secondary">
            <p className="mb-2">Available coupons:</p>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="font-mono">WELCOME20</span>
                <span>20% off first course</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono">STUDENT15</span>
                <span>15% student discount</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono">EARLY50</span>
                <span>$50 off bundles</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponCode;