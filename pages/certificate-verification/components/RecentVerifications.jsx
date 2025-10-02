import React from 'react';
import Icon from '../../../components/AppIcon.jsx';
import Button from '../../../components/ui/Button.jsx';

const RecentVerifications = ({ verifications, onVerifyAgain }) => {
  if (!verifications || verifications?.length === 0) return null;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'valid':
        return { icon: 'CheckCircle', color: 'text-success' };
      case 'revoked':
        return { icon: 'XCircle', color: 'text-destructive' };
      case 'not_found':
        return { icon: 'AlertCircle', color: 'text-warning' };
      default:
        return { icon: 'AlertTriangle', color: 'text-text-secondary' };
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'valid':
        return 'bg-success/10 text-success border-success/20';
      case 'revoked':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'not_found':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-muted text-text-secondary border-border';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Recent Verifications
        </h3>
        <Icon name="Clock" size={20} className="text-text-secondary" />
      </div>
      <div className="space-y-3">
        {verifications?.map((verification, index) => {
          const statusConfig = getStatusIcon(verification?.status);
          
          return (
            <div 
              key={index}
              className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-4 flex-1 min-w-0">
                <Icon 
                  name={statusConfig?.icon} 
                  size={20} 
                  className={statusConfig?.color} 
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-1">
                    <code className="font-mono text-sm bg-background px-2 py-1 rounded truncate">
                      {verification?.certificateId}
                    </code>
                    <span className={`px-2 py-1 rounded-full text-xs font-caption border ${getStatusBadge(verification?.status)}`}>
                      {verification?.status?.replace('_', ' ')?.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-text-secondary">
                    <span className="font-caption">
                      {verification?.recipientName || 'Unknown Recipient'}
                    </span>
                    <span className="font-caption">
                      Verified {new Date(verification.verifiedAt)?.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="RotateCcw"
                onClick={() => onVerifyAgain(verification?.certificateId)}
                className="ml-2 flex-shrink-0"
              />
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-text-secondary font-caption text-center">
          Recent verifications are stored locally for your convenience and are not shared.
        </p>
      </div>
    </div>
  );
};

export default RecentVerifications;