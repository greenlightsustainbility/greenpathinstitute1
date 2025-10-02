import React from 'react';
import Icon from '../../../components/AppIcon.jsx';
import Button from '../../../components/ui/Button.jsx';

const CertificateCard = ({ certificate }) => {
  const handleDownload = () => {
    // Mock download functionality
    const link = document.createElement('a');
    link.href = certificate?.downloadUrl;
    link.download = `${certificate?.courseName}_Certificate.pdf`;
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
  };

  const handleVerify = () => {
    window.open(`/verify?cert_id=${certificate?.certId}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location?.origin)}/verify?cert_id=${certificate?.certId}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="Award" size={32} className="text-success" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-semibold text-lg text-card-foreground mb-2">
            {certificate?.courseName}
          </h3>
          
          <div className="flex items-center space-x-4 mb-3">
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Icon name="Calendar" size={16} />
              <span className="font-caption text-sm">Earned: {certificate?.earnedDate}</span>
            </div>
            <div className="flex items-center space-x-1 text-success">
              <Icon name="CheckCircle" size={16} />
              <span className="font-caption text-sm font-medium">Verified</span>
            </div>
          </div>
          
          <div className="mb-4 p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-body text-sm font-medium text-card-foreground">Certificate ID</p>
                <p className="font-mono text-xs text-muted-foreground">{certificate?.certId}</p>
              </div>
              <div className="text-right">
                <p className="font-body text-sm font-medium text-card-foreground">Score</p>
                <p className="font-body text-sm text-success font-semibold">{certificate?.score}%</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="default"
              size="sm"
              onClick={handleDownload}
              iconName="Download"
              iconPosition="left"
            >
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleVerify}
              iconName="ExternalLink"
              iconPosition="left"
            >
              Verify
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleShareLinkedIn}
              iconName="Share"
              iconPosition="left"
            >
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;