import React, { useState } from 'react';
import Input from '../../../components/ui/Input.jsx';
import Button from '../../../components/ui/Button.jsx';
import Icon from '../../../components/AppIcon.jsx';

const VerificationForm = ({ onVerify, isLoading }) => {
  const [certificateId, setCertificateId] = useState('');
  const [error, setError] = useState('');

  const formatCertificateId = (value) => {
    // Remove all non-alphanumeric characters
    const cleaned = value?.replace(/[^A-Za-z0-9]/g, '')?.toUpperCase();
    
    // Format as GP-YYYYMMDD-XXXXXX
    if (cleaned?.length <= 2) {
      return cleaned;
    } else if (cleaned?.length <= 10) {
      return `${cleaned?.slice(0, 2)}-${cleaned?.slice(2)}`;
    } else {
      return `${cleaned?.slice(0, 2)}-${cleaned?.slice(2, 10)}-${cleaned?.slice(10, 16)}`;
    }
  };

  const validateCertificateId = (id) => {
    const pattern = /^GP-\d{8}-[A-Z0-9]{6}$/;
    return pattern?.test(id);
  };

  const handleInputChange = (e) => {
    const formatted = formatCertificateId(e?.target?.value);
    setCertificateId(formatted);
    
    if (error) {
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!certificateId?.trim()) {
      setError('Please enter a certificate ID');
      return;
    }

    if (!validateCertificateId(certificateId)) {
      setError('Please enter a valid certificate ID in format GP-YYYYMMDD-XXXXXX');
      return;
    }

    setError('');
    onVerify(certificateId);
  };

  const handleQRScan = () => {
    // Mock QR scan functionality
    const mockScannedId = 'GP-20241015-ABC123';
    setCertificateId(mockScannedId);
    setError('');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Shield" size={32} className="text-primary" />
        </div>
        <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
          Verify Certificate
        </h2>
        <p className="text-text-secondary font-body">
          Enter the certificate ID to verify its authenticity and view details
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            label="Certificate ID"
            type="text"
            placeholder="GP-YYYYMMDD-XXXXXX"
            value={certificateId}
            onChange={handleInputChange}
            error={error}
            description="Enter the certificate ID found on your certificate document"
            maxLength={17}
            className="font-mono text-center"
          />
          <div className="mt-2 text-xs text-text-secondary font-caption">
            Format: GP-YYYYMMDD-XXXXXX (e.g., GP-20241015-ABC123)
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="submit"
            variant="default"
            loading={isLoading}
            iconName="Search"
            iconPosition="left"
            className="flex-1"
          >
            Verify Certificate
          </Button>
          
          <Button
            type="button"
            variant="outline"
            iconName="QrCode"
            iconPosition="left"
            onClick={handleQRScan}
            className="sm:w-auto"
          >
            Scan QR Code
          </Button>
        </div>
      </form>

      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-body font-medium text-text-primary mb-1">
              How Certificate Verification Works
            </p>
            <p className="text-text-secondary font-caption leading-relaxed">
              Each certificate is secured with HMAC signature verification and unique identifiers. 
              Valid certificates will display complete details including recipient information, 
              course completion date, and issuing authority.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationForm;