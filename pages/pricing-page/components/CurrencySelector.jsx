import React from 'react';
import Select from '../../../components/ui/select.jsx';

const CurrencySelector = ({ selectedCurrency, onCurrencyChange, className = '' }) => {
  const currencyOptions = [
    { value: 'USD', label: 'USD ($)', description: 'US Dollar' },
    { value: 'EUR', label: 'EUR (€)', description: 'Euro' },
    { value: 'GBP', label: 'GBP (£)', description: 'British Pound' },
    { value: 'NGN', label: 'NGN (₦)', description: 'Nigerian Naira' },
    { value: 'ZAR', label: 'ZAR (R)', description: 'South African Rand' },
  ];

  const exchangeRates = {
    USD: { NGN: 1650, EUR: 0.92, GBP: 0.79, ZAR: 18.5 },
    EUR: { USD: 1.09, NGN: 1800, GBP: 0.86, ZAR: 20.1 },
    GBP: { USD: 1.27, NGN: 2100, EUR: 1.16, ZAR: 23.4 },
    NGN: { USD: 0.00061, EUR: 0.00056, GBP: 0.00048, ZAR: 0.011 },
    ZAR: { USD: 0.054, EUR: 0.050, GBP: 0.043, NGN: 89.1 }
  };

  const getCurrentRate = () => {
    const baseRate = exchangeRates?.['USD']?.[selectedCurrency] || 1;
    return selectedCurrency === 'USD' ? 1 : baseRate;
  };

  return (
    <div className={`bg-muted rounded-lg p-4 ${className}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0 sm:space-x-4">
        <div className="flex-1">
          <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
            Select Your Currency
          </h3>
          <p className="text-text-secondary text-sm">
            Prices are automatically converted using live exchange rates
          </p>
        </div>
        
        <div className="w-full sm:w-48">
          <Select
            options={currencyOptions}
            value={selectedCurrency}
            onChange={onCurrencyChange}
            placeholder="Select currency"
          />
        </div>
      </div>
      <div className="mt-3 text-xs text-text-secondary">
        Exchange rate: 1 USD = {getCurrentRate()?.toFixed(2)} {selectedCurrency}
        <span className="ml-2">• Updated: {new Date()?.toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default CurrencySelector;