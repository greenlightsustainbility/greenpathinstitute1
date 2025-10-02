import React, { useState } from 'react';
import Button from '../../../components/ui/Button.jsx';
import Icon from '../../../components/AppIcon.jsx';

const SocialAuthSection = ({ onSocialAuth, isLoading }) => {
  const [loadingProvider, setLoadingProvider] = useState(null);

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'bg-red-500 hover:bg-red-600',
      textColor: 'text-white'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white'
    },
    {
      id: 'microsoft',
      name: 'Microsoft',
      icon: 'Square',
      color: 'bg-gray-800 hover:bg-gray-900',
      textColor: 'text-white'
    }
  ];

  const handleSocialAuth = async (provider) => {
    setLoadingProvider(provider?.id);
    try {
      await onSocialAuth(provider?.id);
    } catch (error) {
      console.error(`${provider?.name} authentication failed:`, error);
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground font-body">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {socialProviders?.map((provider) => (
          <Button
            key={provider?.id}
            variant="outline"
            size="lg"
            fullWidth
            onClick={() => handleSocialAuth(provider)}
            loading={loadingProvider === provider?.id}
            disabled={isLoading || loadingProvider !== null}
            className="relative"
          >
            <div className="flex items-center justify-center space-x-3">
              <div className={`w-5 h-5 rounded flex items-center justify-center ${provider?.color}`}>
                <Icon 
                  name={provider?.icon} 
                  size={16} 
                  color="white"
                />
              </div>
              <span className="font-body font-medium">
                Continue with {provider?.name}
              </span>
            </div>
          </Button>
        ))}
      </div>
      <div className="text-center">
        <p className="font-caption text-xs text-muted-foreground">
          By continuing, you agree to our{' '}
          <a href="/terms" className="text-primary hover:text-primary/80 underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-primary hover:text-primary/80 underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default SocialAuthSection;