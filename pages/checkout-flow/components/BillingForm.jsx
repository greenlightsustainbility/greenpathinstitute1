import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input.jsx';
import Select from '../../../components/ui/select.jsx';
import { Checkbox } from '../../../components/ui/Checkbox.jsx';
import Icon from '../../../components/AppIcon.jsx';

const BillingForm = ({ billingData, onBillingChange, errors, currency }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const countryOptions = [
    { value: 'NG', label: 'Nigeria' },
    { value: 'US', label: 'United States' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'ZA', label: 'South Africa' },
    { value: 'KE', label: 'Kenya' },
    { value: 'GH', label: 'Ghana' },
    { value: 'EG', label: 'Egypt' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' },
    { value: 'CA', label: 'Canada' }
  ];

  const nigerianStates = [
    { value: 'AB', label: 'Abia' },
    { value: 'FC', label: 'Abuja' },
    { value: 'AD', label: 'Adamawa' },
    { value: 'AK', label: 'Akwa Ibom' },
    { value: 'AN', label: 'Anambra' },
    { value: 'BA', label: 'Bauchi' },
    { value: 'BY', label: 'Bayelsa' },
    { value: 'BE', label: 'Benue' },
    { value: 'BO', label: 'Borno' },
    { value: 'CR', label: 'Cross River' },
    { value: 'DE', label: 'Delta' },
    { value: 'EB', label: 'Ebonyi' },
    { value: 'ED', label: 'Edo' },
    { value: 'EK', label: 'Ekiti' },
    { value: 'EN', label: 'Enugu' },
    { value: 'GO', label: 'Gombe' },
    { value: 'IM', label: 'Imo' },
    { value: 'JI', label: 'Jigawa' },
    { value: 'KD', label: 'Kaduna' },
    { value: 'KN', label: 'Kano' },
    { value: 'KT', label: 'Katsina' },
    { value: 'KE', label: 'Kebbi' },
    { value: 'KO', label: 'Kogi' },
    { value: 'KW', label: 'Kwara' },
    { value: 'LA', label: 'Lagos' },
    { value: 'NA', label: 'Nasarawa' },
    { value: 'NI', label: 'Niger' },
    { value: 'OG', label: 'Ogun' },
    { value: 'ON', label: 'Ondo' },
    { value: 'OS', label: 'Osun' },
    { value: 'OY', label: 'Oyo' },
    { value: 'PL', label: 'Plateau' },
    { value: 'RI', label: 'Rivers' },
    { value: 'SO', label: 'Sokoto' },
    { value: 'TA', label: 'Taraba' },
    { value: 'YO', label: 'Yobe' },
    { value: 'ZA', label: 'Zamfara' }
  ];

  useEffect(() => {
    setCountries(countryOptions);
    if (billingData?.country === 'NG') {
      setStates(nigerianStates);
    } else {
      setStates([]);
    }
  }, [billingData?.country]);

  const handleInputChange = (field, value) => {
    onBillingChange({
      ...billingData,
      [field]: value
    });
  };

  const handleCountryChange = (country) => {
    onBillingChange({
      ...billingData,
      country,
      state: '' // Reset state when country changes
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="CreditCard" size={20} className="text-primary" />
        <h2 className="font-heading font-semibold text-xl text-card-foreground">
          Billing Information
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Name */}
        <Input
          label="First Name"
          type="text"
          placeholder="Enter first name"
          value={billingData?.firstName || ''}
          onChange={(e) => handleInputChange('firstName', e?.target?.value)}
          error={errors?.firstName}
          required
        />

        {/* Last Name */}
        <Input
          label="Last Name"
          type="text"
          placeholder="Enter last name"
          value={billingData?.lastName || ''}
          onChange={(e) => handleInputChange('lastName', e?.target?.value)}
          error={errors?.lastName}
          required
        />

        {/* Email */}
        <div className="md:col-span-2">
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter email address"
            value={billingData?.email || ''}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
          />
        </div>

        {/* Phone */}
        <Input
          label="Phone Number"
          type="tel"
          placeholder="Enter phone number"
          value={billingData?.phone || ''}
          onChange={(e) => handleInputChange('phone', e?.target?.value)}
          error={errors?.phone}
          required
        />

        {/* Organization (Optional) */}
        <Input
          label="Organization"
          type="text"
          placeholder="Enter organization name (optional)"
          value={billingData?.organization || ''}
          onChange={(e) => handleInputChange('organization', e?.target?.value)}
        />

        {/* Address */}
        <div className="md:col-span-2">
          <Input
            label="Street Address"
            type="text"
            placeholder="Enter street address"
            value={billingData?.address || ''}
            onChange={(e) => handleInputChange('address', e?.target?.value)}
            error={errors?.address}
            required
          />
        </div>

        {/* City */}
        <Input
          label="City"
          type="text"
          placeholder="Enter city"
          value={billingData?.city || ''}
          onChange={(e) => handleInputChange('city', e?.target?.value)}
          error={errors?.city}
          required
        />

        {/* Country */}
        <Select
          label="Country"
          options={countries}
          value={billingData?.country || ''}
          onChange={handleCountryChange}
          placeholder="Select country"
          error={errors?.country}
          required
        />

        {/* State/Province */}
        {billingData?.country === 'NG' ? (
          <Select
            label="State"
            options={states}
            value={billingData?.state || ''}
            onChange={(state) => handleInputChange('state', state)}
            placeholder="Select state"
            error={errors?.state}
            required
          />
        ) : (
          <Input
            label="State/Province"
            type="text"
            placeholder="Enter state or province"
            value={billingData?.state || ''}
            onChange={(e) => handleInputChange('state', e?.target?.value)}
            error={errors?.state}
            required
          />
        )}

        {/* Postal Code */}
        <Input
          label="Postal Code"
          type="text"
          placeholder="Enter postal code"
          value={billingData?.postalCode || ''}
          onChange={(e) => handleInputChange('postalCode', e?.target?.value)}
          error={errors?.postalCode}
          required
        />
      </div>
      {/* Tax Information */}
      {currency === 'NGN' && (
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div>
              <h4 className="font-body font-medium text-sm text-card-foreground mb-2">
                VAT Information
              </h4>
              <p className="font-caption text-xs text-text-secondary mb-3">
                VAT will be calculated based on your billing address. Nigerian customers are subject to 7.5% VAT.
              </p>
              <Input
                label="VAT Number (Optional)"
                type="text"
                placeholder="Enter VAT number if applicable"
                value={billingData?.vatNumber || ''}
                onChange={(e) => handleInputChange('vatNumber', e?.target?.value)}
                description="For business purchases only"
              />
            </div>
          </div>
        </div>
      )}
      {/* Terms Agreement */}
      <div className="mt-6 pt-4 border-t border-border">
        <Checkbox
          label="I agree to the Terms of Service and Privacy Policy"
          checked={billingData?.agreeToTerms || false}
          onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
          error={errors?.agreeToTerms}
          required
        />
        
        <div className="mt-3">
          <Checkbox
            label="I would like to receive course updates and promotional emails"
            checked={billingData?.subscribeToUpdates || false}
            onChange={(e) => handleInputChange('subscribeToUpdates', e?.target?.checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default BillingForm;