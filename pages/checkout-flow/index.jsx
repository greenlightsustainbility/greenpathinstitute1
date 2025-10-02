import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header.jsx';
import Breadcrumbs from '../../components/ui/Breadcrumbs.jsx';
import CurrencySelector from '../../components/ui/CurrencySelector.jsx';
import Icon from '../../components/AppIcon.jsx';
import Button from '../../components/ui/Button.jsx';

// Import components
import OrderSummary from './components/OrderSummary.jsx';
import PaymentMethods from './components/PaymentMethods.jsx';
import BillingForm from './components/BillingForm.jsx';
import CouponCode from './components/CouponCode.jsx';
import RefundPolicy from './components/RefundPolicy.jsx';
import OrderConfirmation from './components/OrderConfirmation.jsx';

const CheckoutFlow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [currentStep, setCurrentStep] = useState('checkout'); // 'checkout' or 'confirmation'
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState({
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    NGN: 1650,
    ZAR: 18.5
  });
  
  // Order state
  const [orderItems, setOrderItems] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [billingData, setBillingData] = useState({});
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [billingErrors, setBillingErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(null);

  // Mock order items - in real app, this would come from cart/state
  const mockOrderItems = [
    {
      id: 1,
      title: "ESG Fundamentals for Professionals",
      thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
      duration: "8 hours",
      price: 299,
      originalPrice: 399,
      type: "course"
    },
    {
      id: 2,
      title: "Sustainability Reporting Standards",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      duration: "6 hours",
      price: 249,
      originalPrice: null,
      type: "course"
    }
  ];

  useEffect(() => {
    // Initialize order items
    setOrderItems(mockOrderItems);
    
    // Get saved currency
    const savedCurrency = localStorage.getItem('selectedCurrency') || 'USD';
    setSelectedCurrency(savedCurrency);

    // Listen for currency changes
    const handleCurrencyChange = (event) => {
      setSelectedCurrency(event?.detail?.currency);
    };

    window.addEventListener('currencyChanged', handleCurrencyChange);
    return () => window.removeEventListener('currencyChanged', handleCurrencyChange);
  }, []);

  // Calculate pricing
  const subtotal = orderItems?.reduce((sum, item) => sum + item?.price, 0);
  const discountAmount = appliedCoupon ? 
    (appliedCoupon?.type === 'percentage' ? 
      (subtotal * appliedCoupon?.discount / 100) : 
      appliedCoupon?.discount) : 0;
  const taxRate = selectedCurrency === 'NGN' ? 0.075 : 0; // 7.5% VAT for Nigeria
  const taxAmount = (subtotal - discountAmount) * taxRate;
  const total = subtotal - discountAmount + taxAmount;

  // Convert prices to selected currency
  const convertPrice = (usdPrice) => {
    return Math.round(usdPrice * exchangeRates?.[selectedCurrency]);
  };

  const convertedSubtotal = convertPrice(subtotal);
  const convertedDiscount = convertPrice(discountAmount);
  const convertedTax = convertPrice(taxAmount);
  const convertedTotal = convertPrice(total);

  const handleCouponApply = (coupon) => {
    setAppliedCoupon(coupon);
  };

  const validateBillingForm = () => {
    const errors = {};
    
    if (!billingData?.firstName?.trim()) errors.firstName = 'First name is required';
    if (!billingData?.lastName?.trim()) errors.lastName = 'Last name is required';
    if (!billingData?.email?.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/?.test(billingData?.email)) errors.email = 'Email is invalid';
    if (!billingData?.phone?.trim()) errors.phone = 'Phone number is required';
    if (!billingData?.address?.trim()) errors.address = 'Address is required';
    if (!billingData?.city?.trim()) errors.city = 'City is required';
    if (!billingData?.country?.trim()) errors.country = 'Country is required';
    if (!billingData?.state?.trim()) errors.state = 'State/Province is required';
    if (!billingData?.postalCode?.trim()) errors.postalCode = 'Postal code is required';
    if (!billingData?.agreeToTerms) errors.agreeToTerms = 'You must agree to the terms';

    setBillingErrors(errors);
    return Object.keys(errors)?.length === 0;
  };

  const handlePaymentSubmit = async () => {
    if (!selectedPaymentMethod) {
      alert('Please select a payment method');
      return;
    }

    if (!validateBillingForm()) {
      alert('Please fill in all required billing information');
      return;
    }

    setIsProcessing(true);

    // Mock payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Create order confirmation data
      const confirmationData = {
        orderNumber: `GP-${new Date()?.getFullYear()}${String(new Date()?.getMonth() + 1)?.padStart(2, '0')}${String(new Date()?.getDate())?.padStart(2, '0')}-${Math.random()?.toString(36)?.substr(2, 6)?.toUpperCase()}`,
        items: orderItems?.map(item => ({
          ...item,
          price: convertPrice(item?.price)
        })),
        subtotal: convertedSubtotal,
        discount: convertedDiscount,
        tax: convertedTax,
        total: convertedTotal,
        currency: selectedCurrency,
        couponCode: appliedCoupon?.code,
        paymentMethod: selectedPaymentMethod === 'stripe' ? 'Credit Card (Stripe)' : 
                     selectedPaymentMethod === 'paystack' ? 'Paystack' : 'Flutterwave',
        transactionId: `TXN_${Date.now()}_${Math.random()?.toString(36)?.substr(2, 8)?.toUpperCase()}`,
        paymentDate: new Date(),
        email: billingData?.email
      };

      setOrderConfirmation(confirmationData);
      setCurrentStep('confirmation');
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleContinueAfterConfirmation = (path) => {
    navigate(path);
  };

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Courses', path: '/course-listing' },
    { label: 'Checkout', path: '/checkout-flow', isLast: true }
  ];

  if (currentStep === 'confirmation' && orderConfirmation) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-8">
              <OrderConfirmation 
                orderData={orderConfirmation}
                onContinue={handleContinueAfterConfirmation}
              />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="py-4">
            <Breadcrumbs customBreadcrumbs={breadcrumbs} />
          </div>

          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-2">
                Secure Checkout
              </h1>
              <p className="font-body text-lg text-text-secondary">
                Complete your course enrollment with secure payment processing
              </p>
            </div>
            
            <div className="mt-4 lg:mt-0 flex items-center space-x-4">
              <div className="w-40">
                <CurrencySelector />
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Shield" size={16} className="text-success" />
                <span>Secure Payment</span>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <span className="font-body font-medium text-sm text-primary">
                  Payment Details
                </span>
              </div>
              <div className="flex-1 h-0.5 bg-border"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-border rounded-full flex items-center justify-center">
                  <span className="text-text-secondary text-sm font-bold">2</span>
                </div>
                <span className="font-body font-medium text-sm text-text-secondary">
                  Confirmation
                </span>
              </div>
            </div>
          </div>

          {/* Checkout Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Payment Methods */}
              <PaymentMethods
                selectedMethod={selectedPaymentMethod}
                onMethodSelect={setSelectedPaymentMethod}
                currency={selectedCurrency}
                onPaymentSubmit={handlePaymentSubmit}
                loading={isProcessing}
              />

              {/* Billing Form */}
              <BillingForm
                billingData={billingData}
                onBillingChange={setBillingData}
                errors={billingErrors}
                currency={selectedCurrency}
              />

              {/* Coupon Code */}
              <CouponCode
                onCouponApply={handleCouponApply}
                appliedCoupon={appliedCoupon}
                discount={convertedDiscount}
                currency={selectedCurrency}
                loading={isProcessing}
              />

              {/* Refund Policy */}
              <RefundPolicy />
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <OrderSummary
                  orderItems={orderItems?.map(item => ({
                    ...item,
                    price: convertPrice(item?.price),
                    originalPrice: item?.originalPrice ? convertPrice(item?.originalPrice) : null
                  }))}
                  currency={selectedCurrency}
                  exchangeRate={exchangeRates?.[selectedCurrency]}
                  subtotal={convertedSubtotal}
                  discount={convertedDiscount}
                  tax={convertedTax}
                  total={convertedTotal}
                />
              </div>
            </div>
          </div>

          {/* Mobile Checkout Button */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4 z-40">
            <Button
              variant="default"
              size="lg"
              fullWidth
              loading={isProcessing}
              disabled={!selectedPaymentMethod || isProcessing}
              onClick={handlePaymentSubmit}
              iconName="Lock"
              iconPosition="left"
            >
              {isProcessing ? 'Processing Payment...' : `Pay ${selectedCurrency === 'USD' ? '$' : selectedCurrency === 'EUR' ? '€' : selectedCurrency === 'GBP' ? '£' : selectedCurrency === 'NGN' ? '₦' : 'R'}${convertedTotal?.toLocaleString()}`}
            </Button>
          </div>
        </div>
      </main>
      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-8 max-w-sm mx-4 text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="font-heading font-semibold text-lg text-card-foreground mb-2">
              Processing Payment
            </h3>
            <p className="font-body text-sm text-text-secondary">
              Please don't close this window. This may take a few moments.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutFlow;