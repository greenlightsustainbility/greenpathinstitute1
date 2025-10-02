import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon.jsx';

const SecurityFeatures = ({ attemptCount = 0, isLocked = false, lockoutTime = null }) => {
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    if (lockoutTime && isLocked) {
      const interval = setInterval(() => {
        const remaining = Math.max(0, lockoutTime - Date.now());
        setTimeRemaining(remaining);
        
        if (remaining === 0) {
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [lockoutTime, isLocked]);

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds?.toString()?.padStart(2, '0')}`;
  };

  if (isLocked) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-red-600 mt-0.5" />
          <div>
            <h4 className="font-body font-medium text-red-800 mb-1">Account Temporarily Locked</h4>
            <p className="font-caption text-sm text-red-700 mb-2">
              Too many failed login attempts. Please try again in {formatTime(timeRemaining)}.
            </p>
            <div className="space-y-1 text-xs text-red-600">
              <p>• Contact support if you need immediate access</p>
              <p>• Check your email for password reset instructions</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (attemptCount > 0) {
    const remainingAttempts = 5 - attemptCount;
    const isWarning = attemptCount >= 3;
    
    return (
      <div className={`p-3 rounded-lg border ${isWarning ? 'bg-amber-50 border-amber-200' : 'bg-blue-50 border-blue-200'}`}>
        <div className="flex items-center space-x-2">
          <Icon 
            name={isWarning ? "AlertTriangle" : "Info"} 
            size={16} 
            className={isWarning ? 'text-amber-600' : 'text-blue-600'} 
          />
          <p className={`font-caption text-sm ${isWarning ? 'text-amber-800' : 'text-blue-800'}`}>
            {isWarning 
              ? `Warning: ${remainingAttempts} attempts remaining before account lockout`
              : `${remainingAttempts} login attempts remaining`
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center space-x-4 py-2">
      <div className="flex items-center space-x-2 text-green-600">
        <Icon name="Shield" size={16} />
        <span className="font-caption text-xs">Secure Login</span>
      </div>
      <div className="flex items-center space-x-2 text-green-600">
        <Icon name="Lock" size={16} />
        <span className="font-caption text-xs">SSL Protected</span>
      </div>
    </div>
  );
};

export default SecurityFeatures;