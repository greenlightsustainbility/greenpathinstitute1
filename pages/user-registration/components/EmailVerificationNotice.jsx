import React, { useState } from 'react';
import Button from '../../../components/ui/Button.jsx';
import Icon from '../../../components/AppIcon.jsx';

const EmailVerificationNotice = ({ email, onResendVerification, onChangeEmail }) => {
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const handleResendVerification = async () => {
    setIsResending(true);
    try {
      await onResendVerification(email);
      // Start cooldown timer
      setResendCooldown(60);
      const timer = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error('Failed to resend verification email:', error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
          <Icon name="Mail" size={24} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Verify Your Email
          </h3>
          <p className="font-body text-sm text-muted-foreground">
            We've sent a verification link to your email
          </p>
        </div>
      </div>

      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Mail" size={16} color="var(--color-muted-foreground)" />
            <span className="font-body text-sm text-foreground">{email}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onChangeEmail}
            iconName="Edit"
            iconPosition="left"
          >
            Change
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
            <Icon name="Check" size={14} color="var(--color-primary)" />
          </div>
          <div>
            <p className="font-body text-sm text-foreground font-medium">
              Check your inbox
            </p>
            <p className="font-caption text-xs text-muted-foreground">
              Look for an email from GreenPath Institute with the subject "Verify your email address"
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
            <Icon name="MousePointer" size={14} color="var(--color-primary)" />
          </div>
          <div>
            <p className="font-body text-sm text-foreground font-medium">
              Click the verification link
            </p>
            <p className="font-caption text-xs text-muted-foreground">
              This will activate your account and redirect you to the dashboard
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
            <Icon name="BookOpen" size={14} color="var(--color-primary)" />
          </div>
          <div>
            <p className="font-body text-sm text-foreground font-medium">
              Start learning
            </p>
            <p className="font-caption text-xs text-muted-foreground">
              Access your personalized course recommendations and begin your ESG journey
            </p>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            fullWidth
            onClick={handleResendVerification}
            loading={isResending}
            disabled={resendCooldown > 0}
            iconName="RefreshCw"
            iconPosition="left"
          >
            {resendCooldown > 0 
              ? `Resend in ${resendCooldown}s` 
              : 'Resend Verification Email'
            }
          </Button>
          
          <Button
            variant="ghost"
            fullWidth
            onClick={() => window.open('https://gmail.com', '_blank')}
            iconName="ExternalLink"
            iconPosition="right"
          >
            Open Email App
          </Button>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Icon name="AlertTriangle" size={16} color="#F59E0B" className="mt-0.5" />
          <div>
            <p className="font-body text-sm text-yellow-800 font-medium">
              Didn't receive the email?
            </p>
            <ul className="font-caption text-xs text-yellow-700 mt-1 space-y-1">
              <li>• Check your spam or junk folder</li>
              <li>• Make sure {email} is correct</li>
              <li>• Add noreply@greenpathinstitute.com to your contacts</li>
              <li>• Try resending the verification email</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationNotice;