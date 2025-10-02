import React from 'react';
import Icon from '../../../components/AppIcon.jsx';
import Button from '../../../components/ui/Button.jsx';


const VerificationResult = ({ result, onReset }) => {
  if (!result) return null;

  const getStatusConfig = (status) => {
    switch (status) {
      case 'valid':
        return {
          icon: 'CheckCircle',
          color: 'text-success',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20',
          title: 'Certificate Valid',
          description: 'This certificate is authentic and has been verified'
        };
      case 'revoked':
        return {
          icon: 'XCircle',
          color: 'text-destructive',
          bgColor: 'bg-destructive/10',
          borderColor: 'border-destructive/20',
          title: 'Certificate Revoked',
          description: 'This certificate has been revoked and is no longer valid'
        };
      case 'not_found':
        return {
          icon: 'AlertCircle',
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20',
          title: 'Certificate Not Found',
          description: 'No certificate found with this ID. Please check the ID and try again'
        };
      default:
        return {
          icon: 'AlertTriangle',
          color: 'text-text-secondary',
          bgColor: 'bg-muted',
          borderColor: 'border-border',
          title: 'Unknown Status',
          description: 'Unable to determine certificate status'
        };
    }
  };

  const statusConfig = getStatusConfig(result?.status);

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
      {/* Status Header */}
      <div className={`${statusConfig?.bgColor} ${statusConfig?.borderColor} border-b p-6`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 ${statusConfig?.bgColor} rounded-full flex items-center justify-center`}>
              <Icon name={statusConfig?.icon} size={24} className={statusConfig?.color} />
            </div>
            <div>
              <h3 className="text-xl font-heading font-semibold text-text-primary">
                {statusConfig?.title}
              </h3>
              <p className="text-text-secondary font-body mt-1">
                {statusConfig?.description}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onReset}
          />
        </div>
      </div>
      {/* Certificate Details */}
      {result?.status === 'valid' && result?.certificate && (
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Certificate Information */}
            <div className="space-y-4">
              <div>
                <h4 className="font-heading font-semibold text-text-primary mb-3">
                  Certificate Details
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-caption text-text-secondary">
                      Certificate ID
                    </label>
                    <p className="font-mono text-text-primary font-medium">
                      {result?.certificate?.id}
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-caption text-text-secondary">
                      Recipient Name
                    </label>
                    <p className="font-body text-text-primary font-medium">
                      {result?.certificate?.recipientName}
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-caption text-text-secondary">
                      Course Title
                    </label>
                    <p className="font-body text-text-primary font-medium">
                      {result?.certificate?.courseTitle}
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-caption text-text-secondary">
                      Completion Date
                    </label>
                    <p className="font-body text-text-primary font-medium">
                      {new Date(result.certificate.completionDate)?.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-caption text-text-secondary">
                      Issuing Institution
                    </label>
                    <p className="font-body text-text-primary font-medium">
                      {result?.certificate?.issuingInstitution}
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-caption text-text-secondary">
                      Grade Achieved
                    </label>
                    <p className="font-body text-text-primary font-medium">
                      {result?.certificate?.grade}% - {result?.certificate?.gradeLevel}
                    </p>
                  </div>
                </div>
              </div>

              {/* Verification Details */}
              <div className="pt-4 border-t border-border">
                <h5 className="font-heading font-medium text-text-primary mb-2">
                  Verification Details
                </h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary font-caption">Verified On:</span>
                    <span className="font-body text-text-primary">
                      {new Date()?.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary font-caption">HMAC Status:</span>
                    <span className="font-body text-success font-medium">Valid</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary font-caption">Digital Signature:</span>
                    <span className="font-body text-success font-medium">Verified</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Certificate Preview */}
            <div className="space-y-4">
              <h4 className="font-heading font-semibold text-text-primary">
                Certificate Preview
              </h4>
              <div className="bg-muted rounded-lg p-4 border-2 border-dashed border-border">
                <div className="aspect-[4/3] bg-white rounded border shadow-sm flex items-center justify-center relative overflow-hidden">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Leaf" size={32} color="white" />
                    </div>
                    <h3 className="text-lg font-heading font-bold text-primary mb-2">
                      GreenPath Institute
                    </h3>
                    <p className="text-sm font-body text-text-secondary mb-4">
                      Certificate of Completion
                    </p>
                    <div className="text-xs text-text-secondary space-y-1">
                      <p className="font-medium">{result?.certificate?.recipientName}</p>
                      <p>{result?.certificate?.courseTitle}</p>
                      <p>{new Date(result.certificate.completionDate)?.getFullYear()}</p>
                    </div>
                  </div>
                  
                  {/* QR Code */}
                  <div className="absolute bottom-2 right-2 w-8 h-8 bg-text-primary rounded flex items-center justify-center">
                    <Icon name="QrCode" size={16} color="white" />
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-text-secondary font-caption text-center">
                This is a preview only. The actual certificate contains additional security features.
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Error State Content */}
      {(result?.status === 'not_found' || result?.status === 'revoked') && (
        <div className="p-6">
          <div className="text-center">
            {result?.status === 'not_found' && (
              <div className="space-y-4">
                <p className="text-text-secondary font-body">
                  Common issues that might cause this error:
                </p>
                <ul className="text-sm text-text-secondary font-caption space-y-2 text-left max-w-md mx-auto">
                  <li className="flex items-start space-x-2">
                    <Icon name="Dot" size={16} className="mt-1 flex-shrink-0" />
                    <span>Incorrect certificate ID format or typos</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Dot" size={16} className="mt-1 flex-shrink-0" />
                    <span>Certificate may not have been issued yet</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Dot" size={16} className="mt-1 flex-shrink-0" />
                    <span>Certificate from a different institution</span>
                  </li>
                </ul>
              </div>
            )}
            
            {result?.status === 'revoked' && result?.revokedReason && (
              <div className="space-y-4">
                <p className="text-text-secondary font-body">
                  <strong>Reason for revocation:</strong> {result?.revokedReason}
                </p>
                <p className="text-sm text-text-secondary font-caption">
                  If you believe this is an error, please contact our support team.
                </p>
              </div>
            )}
            
            <div className="mt-6">
              <Button variant="outline" iconName="Mail">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerificationResult;