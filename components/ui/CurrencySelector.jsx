import React, { useState, useEffect } from 'react';
import Select from './select.jsx';

const CurrencySelector = ({ className = '', size = 'default' }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const currencyOptions = [
    { value: 'USD', label: 'USD ($)', description: 'US Dollar' },
    { value: 'EUR', label: 'EUR (€)', description: 'Euro' },
    { value: 'GBP', label: 'GBP (£)', description: 'British Pound' },
    { value: 'ZAR', label: 'ZAR (R)', description: 'South African Rand' },
    { value: 'NGN', label: 'NGN (₦)', description: 'Nigerian Naira' },
    { value: 'KES', label: 'KES (KSh)', description: 'Kenyan Shilling' },
    { value: 'GHS', label: 'GHS (₵)', description: 'Ghanaian Cedi' },
    { value: 'EGP', label: 'EGP (£)', description: 'Egyptian Pound' },
  ];

  useEffect(() => {
    const savedCurrency = localStorage.getItem('selectedCurrency');
    if (savedCurrency) {
      setSelectedCurrency(savedCurrency);
    }
  }, []);

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    localStorage.setItem('selectedCurrency', currency);
    
    // Dispatch custom event for other components to listen
    window.dispatchEvent(new CustomEvent('currencyChanged', { 
      detail: { currency } 
    }));
  };

  return (
    <div className={className}>
      <Select
        options={currencyOptions}
        value={selectedCurrency}
        onChange={handleCurrencyChange}
        placeholder="Select currency"
        searchable={false}
        clearable={false}
      />
    </div>
  );
};

export default CurrencySelector;