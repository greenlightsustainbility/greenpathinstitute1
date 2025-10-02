import React from 'react';
import Icon from '../../../components/AppIcon.jsx';
import Button from '../../../components/ui/Button.jsx';
import Image from '../../../components/AppImage.jsx';

const OrderConfirmation = ({ orderData, onContinue }) => {
  const formatPrice = (price, currency) => {
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

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(date);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Check" size={40} className="text-white" />
        </div>
        <h1 className="font-heading font-bold text-3xl text-card-foreground mb-2">
          Payment Successful!
        </h1>
        <p className="font-body text-lg text-text-secondary">
          Thank you for your purchase. Your enrollment is now active.
        </p>
      </div>
      {/* Order Details */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading font-semibold text-xl text-card-foreground">
            Order Details
          </h2>
          <div className="text-right">
            <p className="font-caption text-xs text-text-secondary">Order #</p>
            <p className="font-mono text-sm font-medium text-card-foreground">
              {orderData?.orderNumber}
            </p>
          </div>
        </div>

        {/* Order Items */}
        <div className="space-y-4 mb-6">
          {orderData?.items?.map((item) => (
            <div key={item?.id} className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
              <div className="w-16 h-12 rounded-md overflow-hidden flex-shrink-0">
                <Image
                  src={item?.thumbnail}
                  alt={item?.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-body font-medium text-sm text-card-foreground">
                  {item?.title}
                </h3>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} className="text-text-secondary" />
                    <span className="font-caption text-xs text-text-secondary">
                      {item?.duration}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Award" size={14} className="text-text-secondary" />
                    <span className="font-caption text-xs text-text-secondary">
                      Certificate
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-body font-semibold text-sm text-card-foreground">
                  {formatPrice(item?.price, orderData?.currency)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Summary */}
        <div className="border-t border-border pt-4 space-y-2">
          <div className="flex justify-between">
            <span className="font-body text-sm text-text-secondary">Subtotal</span>
            <span className="font-body text-sm text-card-foreground">
              {formatPrice(orderData?.subtotal, orderData?.currency)}
            </span>
          </div>
          {orderData?.discount > 0 && (
            <div className="flex justify-between">
              <span className="font-body text-sm text-success">
                Discount ({orderData?.couponCode})
              </span>
              <span className="font-body text-sm text-success">
                -{formatPrice(orderData?.discount, orderData?.currency)}
              </span>
            </div>
          )}
          {orderData?.tax > 0 && (
            <div className="flex justify-between">
              <span className="font-body text-sm text-text-secondary">Tax</span>
              <span className="font-body text-sm text-card-foreground">
                {formatPrice(orderData?.tax, orderData?.currency)}
              </span>
            </div>
          )}
          <div className="flex justify-between pt-2 border-t border-border">
            <span className="font-body font-semibold text-base text-card-foreground">
              Total Paid
            </span>
            <span className="font-body font-bold text-lg text-primary">
              {formatPrice(orderData?.total, orderData?.currency)}
            </span>
          </div>
        </div>
      </div>
      {/* Payment Information */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <h3 className="font-heading font-semibold text-lg text-card-foreground mb-4">
          Payment Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-caption text-xs text-text-secondary mb-1">Payment Method</p>
            <p className="font-body text-sm text-card-foreground">
              {orderData?.paymentMethod}
            </p>
          </div>
          <div>
            <p className="font-caption text-xs text-text-secondary mb-1">Transaction ID</p>
            <p className="font-mono text-sm text-card-foreground">
              {orderData?.transactionId}
            </p>
          </div>
          <div>
            <p className="font-caption text-xs text-text-secondary mb-1">Payment Date</p>
            <p className="font-body text-sm text-card-foreground">
              {formatDate(orderData?.paymentDate)}
            </p>
          </div>
          <div>
            <p className="font-caption text-xs text-text-secondary mb-1">Receipt</p>
            <Button variant="link" size="sm" iconName="Download">
              Download PDF
            </Button>
          </div>
        </div>
      </div>
      {/* Next Steps */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-6">
        <h3 className="font-heading font-semibold text-lg text-primary mb-4">
          What's Next?
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">1</span>
            </div>
            <div>
              <p className="font-body font-medium text-sm text-card-foreground">
                Check your email for course access details
              </p>
              <p className="font-caption text-xs text-text-secondary mt-1">
                We've sent login instructions to {orderData?.email}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">2</span>
            </div>
            <div>
              <p className="font-body font-medium text-sm text-card-foreground">
                Access your courses in the learner dashboard
              </p>
              <p className="font-caption text-xs text-text-secondary mt-1">
                Start learning immediately with lifetime access
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">3</span>
            </div>
            <div>
              <p className="font-body font-medium text-sm text-card-foreground">
                Complete courses to earn certificates
              </p>
              <p className="font-caption text-xs text-text-secondary mt-1">
                Downloadable certificates upon successful completion
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="default"
          size="lg"
          fullWidth
          iconName="BookOpen"
          iconPosition="left"
          onClick={() => onContinue('/dashboard')}
        >
          Go to Dashboard
        </Button>
        <Button
          variant="outline"
          size="lg"
          fullWidth
          iconName="Download"
          iconPosition="left"
          onClick={() => window.print()}
        >
          Print Receipt
        </Button>
      </div>
      {/* Support Information */}
      <div className="mt-8 text-center">
        <p className="font-caption text-xs text-text-secondary mb-2">
          Need help? Contact our support team
        </p>
        <div className="flex items-center justify-center space-x-4">
          <Button variant="link" size="sm" iconName="Mail">
            support@greenpathinstitute.com
          </Button>
          <Button variant="link" size="sm" iconName="Phone">
            +234 123 456 7890
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;