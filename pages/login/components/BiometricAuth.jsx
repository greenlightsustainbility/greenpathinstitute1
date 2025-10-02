import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button.jsx';
import Icon from '../../../components/AppIcon.jsx';

const BiometricAuth = ({ onBiometricLogin, disabled }) => {
  const [isSupported, setIsSupported] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [availableMethods, setAvailableMethods] = useState([]);

  useEffect(() => {
    checkBiometricSupport();
  }, []);

  const checkBiometricSupport = async () => {
    try {
      // Check if Web Authentication API is supported
      if (window.PublicKeyCredential) {
        const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
        setIsSupported(available);
        
        if (available) {
          // Mock available methods based on device capabilities
          const methods = [];
          if (navigator.userAgent?.includes('Mobile')) {
            methods?.push('fingerprint', 'face');
          } else {
            methods?.push('fingerprint');
          }
          setAvailableMethods(methods);
        }
      }
    } catch (error) {
      console.log('Biometric check failed:', error);
      setIsSupported(false);
    }
  };

  const handleBiometricLogin = async (method) => {
    setIsLoading(true);
    try {
      // Mock biometric authentication
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success/failure
      const success = Math.random() > 0.2; // 80% success rate
      
      if (success) {
        onBiometricLogin({
          method,
          success: true,
          user: {
            email: 'user@greenpath.edu',
            name: 'John Doe'
          }
        });
      } else {
        throw new Error('Biometric authentication failed');
      }
    } catch (error) {
      onBiometricLogin({
        method,
        success: false,
        error: error?.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isSupported || availableMethods?.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500 font-caption">Or continue with</span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {availableMethods?.includes('fingerprint') && (
          <Button
            variant="outline"
            onClick={() => handleBiometricLogin('fingerprint')}
            disabled={disabled || isLoading}
            loading={isLoading}
            iconName="Fingerprint"
            iconPosition="left"
            fullWidth
          >
            Use Fingerprint
          </Button>
        )}
        
        {availableMethods?.includes('face') && (
          <Button
            variant="outline"
            onClick={() => handleBiometricLogin('face')}
            disabled={disabled || isLoading}
            loading={isLoading}
            iconName="Scan"
            iconPosition="left"
            fullWidth
          >
            Use Face Recognition
          </Button>
        )}
      </div>
      <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
        <Icon name="Shield" size={12} />
        <span className="font-caption">Your biometric data stays on your device</span>
      </div>
    </div>
  );
};

export default BiometricAuth;