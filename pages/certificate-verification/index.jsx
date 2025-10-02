import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header.jsx';
import Breadcrumbs from '../../components/ui/Breadcrumbs.jsx';
import VerificationForm from './components/VerificationForm.jsx';
import VerificationResult from './components/VerificationResult.jsx';
import BulkVerification from './components/BulkVerification.jsx';
import BulkVerificationResults from './components/BulkVerificationResults.jsx';
import RecentVerifications from './components/RecentVerifications.jsx';
import Button from '../../components/ui/Button.jsx';
import Icon from '../../components/AppIcon.jsx';

const CertificateVerification = () => {
  const [activeTab, setActiveTab] = useState('single');
  const [verificationResult, setVerificationResult] = useState(null);
  const [bulkResults, setBulkResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recentVerifications, setRecentVerifications] = useState([]);

  // Mock certificate data
  const mockCertificates = {
    'GP-20241015-ABC123': {
      id: 'GP-20241015-ABC123',
      status: 'valid',
      certificate: {
        id: 'GP-20241015-ABC123',
        recipientName: 'Sarah Johnson',
        courseTitle: 'ESG Fundamentals for African Markets',
        completionDate: '2024-10-15',
        issuingInstitution: 'GreenPath Institute',
        grade: 92,
        gradeLevel: 'Distinction'
      }
    },
    'GP-20241016-DEF456': {
      id: 'GP-20241016-DEF456',
      status: 'valid',
      certificate: {
        id: 'GP-20241016-DEF456',
        recipientName: 'Michael Okonkwo',
        courseTitle: 'Sustainability Reporting Standards',
        completionDate: '2024-10-16',
        issuingInstitution: 'GreenPath Institute',
        grade: 87,
        gradeLevel: 'Merit'
      }
    },
    'GP-20241017-GHI789': {
      id: 'GP-20241017-GHI789',
      status: 'revoked',
      revokedReason: 'Certificate was issued in error and has been replaced with GP-20241018-JKL012'
    },
    'GP-20241018-JKL012': {
      id: 'GP-20241018-JKL012',
      status: 'valid',
      certificate: {
        id: 'GP-20241018-JKL012',
        recipientName: 'Amara Diallo',
        courseTitle: 'Carbon Accounting and Management',
        completionDate: '2024-10-18',
        issuingInstitution: 'GreenPath Institute',
        grade: 95,
        gradeLevel: 'Distinction'
      }
    }
  };

  useEffect(() => {
    // Load recent verifications from localStorage
    const saved = localStorage.getItem('recentVerifications');
    if (saved) {
      try {
        setRecentVerifications(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading recent verifications:', error);
      }
    }

    // Check for certificate ID in URL params
    const urlParams = new URLSearchParams(window.location.search);
    const certId = urlParams?.get('cert_id');
    if (certId) {
      handleVerification(certId);
    }
  }, []);

  const saveRecentVerification = (certificateId, result) => {
    const verification = {
      certificateId,
      status: result?.status,
      recipientName: result?.certificate?.recipientName,
      verifiedAt: new Date()?.toISOString()
    };

    const updated = [verification, ...recentVerifications?.filter(v => v?.certificateId !== certificateId)]?.slice(0, 10);
    setRecentVerifications(updated);
    localStorage.setItem('recentVerifications', JSON.stringify(updated));
  };

  const handleVerification = async (certificateId) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const result = mockCertificates?.[certificateId] || {
      id: certificateId,
      status: 'not_found'
    };
    
    setVerificationResult(result);
    saveRecentVerification(certificateId, result);
    setIsLoading(false);
  };

  const handleBulkVerification = async (file) => {
    setIsLoading(true);
    
    // Simulate file processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock bulk results
    const mockBulkResults = [
      {
        certificateId: 'GP-20241015-ABC123',
        status: 'valid',
        certificate: mockCertificates?.['GP-20241015-ABC123']?.certificate
      },
      {
        certificateId: 'GP-20241016-DEF456',
        status: 'valid',
        certificate: mockCertificates?.['GP-20241016-DEF456']?.certificate
      },
      {
        certificateId: 'GP-20241017-GHI789',
        status: 'revoked',
        revokedReason: 'Certificate was issued in error'
      },
      {
        certificateId: 'GP-20241099-XYZ999',
        status: 'not_found'
      }
    ];
    
    setBulkResults(mockBulkResults);
    setIsLoading(false);
  };

  const handleDownloadReport = () => {
    if (!bulkResults) return;
    
    const csvContent = [
      'Certificate ID,Status,Recipient Name,Course Title,Completion Date,Grade',
      ...bulkResults?.map(result => [
        result?.certificateId,
        result?.status,
        result?.certificate?.recipientName || '',
        result?.certificate?.courseTitle || '',
        result?.certificate?.completionDate || '',
        result?.certificate?.grade || ''
      ]?.join(','))
    ]?.join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `certificate_verification_report_${new Date()?.toISOString()?.split('T')?.[0]}.csv`;
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    window.URL?.revokeObjectURL(url);
  };

  const resetVerification = () => {
    setVerificationResult(null);
    setBulkResults(null);
  };

  const handleVerifyAgain = (certificateId) => {
    setActiveTab('single');
    resetVerification();
    handleVerification(certificateId);
  };

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Certificate Verification', path: '/certificate-verification', isLast: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Certificate Verification - GreenPath Institute</title>
        <meta name="description" content="Verify the authenticity of ESG and sustainability certificates issued by GreenPath Institute. Enter certificate ID for instant validation." />
        <meta name="keywords" content="certificate verification, ESG certificate, sustainability certification, credential validation" />
      </Helmet>
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="ShieldCheck" size={40} className="text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">
                Certificate Verification
              </h1>
              <p className="text-xl text-text-secondary font-body max-w-3xl mx-auto mb-8">
                Verify the authenticity of ESG and sustainability certificates issued by GreenPath Institute. 
                Our secure verification system uses HMAC signatures and unique identifiers to ensure credential integrity.
              </p>
              <Breadcrumbs customBreadcrumbs={breadcrumbs} className="justify-center" />
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Tab Navigation */}
            <div className="flex flex-col sm:flex-row justify-center mb-8">
              <div className="bg-muted rounded-lg p-1 inline-flex">
                <Button
                  variant={activeTab === 'single' ? 'default' : 'ghost'}
                  size="sm"
                  iconName="Search"
                  iconPosition="left"
                  onClick={() => setActiveTab('single')}
                  className="rounded-md"
                >
                  Single Verification
                </Button>
                <Button
                  variant={activeTab === 'bulk' ? 'default' : 'ghost'}
                  size="sm"
                  iconName="FileSpreadsheet"
                  iconPosition="left"
                  onClick={() => setActiveTab('bulk')}
                  className="rounded-md"
                >
                  Bulk Verification
                </Button>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Verification Area */}
              <div className="lg:col-span-2 space-y-8">
                {activeTab === 'single' && (
                  <>
                    {!verificationResult ? (
                      <VerificationForm 
                        onVerify={handleVerification}
                        isLoading={isLoading}
                      />
                    ) : (
                      <VerificationResult 
                        result={verificationResult}
                        onReset={resetVerification}
                      />
                    )}
                  </>
                )}

                {activeTab === 'bulk' && (
                  <>
                    {!bulkResults ? (
                      <BulkVerification 
                        onBulkVerify={handleBulkVerification}
                        isLoading={isLoading}
                      />
                    ) : (
                      <BulkVerificationResults 
                        results={bulkResults}
                        onReset={resetVerification}
                        onDownloadReport={handleDownloadReport}
                      />
                    )}
                  </>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Recent Verifications */}
                {recentVerifications?.length > 0 && (
                  <RecentVerifications 
                    verifications={recentVerifications}
                    onVerifyAgain={handleVerifyAgain}
                  />
                )}

                {/* Help Section */}
                <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                    Need Help?
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Icon name="HelpCircle" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-body font-medium text-text-primary mb-1">
                          Where to find Certificate ID?
                        </h4>
                        <p className="text-sm text-text-secondary font-caption">
                          The certificate ID is located at the bottom of your certificate document 
                          in the format GP-YYYYMMDD-XXXXXX.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Icon name="Clock" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-body font-medium text-text-primary mb-1">
                          Verification Timeline
                        </h4>
                        <p className="text-sm text-text-secondary font-caption">
                          Certificates are available for verification immediately after course completion 
                          and remain valid indefinitely unless revoked.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Icon name="Shield" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-body font-medium text-text-primary mb-1">
                          Security Features
                        </h4>
                        <p className="text-sm text-text-secondary font-caption">
                          All certificates include HMAC signatures, QR codes, and unique identifiers 
                          to prevent forgery and ensure authenticity.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-border">
                    <Button variant="outline" size="sm" iconName="Mail" fullWidth>
                      Contact Support
                    </Button>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                    Trust & Security
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Icon name="Lock" size={16} className="text-success" />
                      <span className="text-sm font-body text-text-primary">
                        256-bit SSL Encryption
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icon name="Database" size={16} className="text-success" />
                      <span className="text-sm font-body text-text-primary">
                        Secure Database Storage
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icon name="CheckCircle" size={16} className="text-success" />
                      <span className="text-sm font-body text-text-primary">
                        HMAC Signature Validation
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icon name="Clock" size={16} className="text-success" />
                      <span className="text-sm font-body text-text-primary">
                        Real-time Verification
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-text-primary mb-4">
                About Certificate Verification
              </h2>
              <p className="text-lg text-text-secondary font-body">
                Learn more about our verification process and security measures
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="FileCheck" size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-text-primary mb-3">
                  Instant Verification
                </h3>
                <p className="text-text-secondary font-body mb-4">
                  Our verification system provides immediate results, checking certificate authenticity 
                  against our secure database in real-time.
                </p>
                <ul className="space-y-2 text-sm text-text-secondary font-caption">
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-success" />
                    <span>Real-time database lookup</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-success" />
                    <span>HMAC signature validation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-success" />
                    <span>Comprehensive status reporting</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Users" size={24} className="text-secondary" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-text-primary mb-3">
                  Bulk Processing
                </h3>
                <p className="text-text-secondary font-body mb-4">
                  Organizations can verify multiple certificates simultaneously using our bulk 
                  verification feature with CSV upload and detailed reporting.
                </p>
                <ul className="space-y-2 text-sm text-text-secondary font-caption">
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-success" />
                    <span>CSV file upload support</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-success" />
                    <span>Detailed verification reports</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-success" />
                    <span>Up to 1000 certificates per batch</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-text-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Leaf" size={20} color="white" />
              </div>
              <span className="font-heading font-semibold text-xl">
                GreenPath Institute
              </span>
            </div>
            <p className="text-white/80 font-body mb-6">
              Leading ESG and sustainability education for African professionals
            </p>
            <p className="text-white/60 font-caption text-sm">
              © {new Date()?.getFullYear()} GreenPath Institute. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CertificateVerification;