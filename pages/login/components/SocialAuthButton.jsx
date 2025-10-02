import React from 'react';

import Icon from '../../../components/AppIcon.jsx';

const SocialAuthButton = ({ provider, onClick, disabled, loading }) => {
  const getProviderConfig = (provider) => {
    switch (provider) {
      case 'google':
        return {
          name: 'Google',
          iconName: 'Chrome',
          bgColor: 'bg-white hover:bg-gray-50',
          textColor: 'text-gray-900',
          borderColor: 'border-gray-300'
        };
      case 'linkedin':
        return {
          name: 'LinkedIn',
          iconName: 'Linkedin',
          bgColor: 'bg-blue-600 hover:bg-blue-700',
          textColor: 'text-white',
          borderColor: 'border-blue-600'
        };
      case 'microsoft':
        return {
          name: 'Microsoft',
          iconName: 'User',
          bgColor: 'bg-gray-800 hover:bg-gray-900',
          textColor: 'text-white',
          borderColor: 'border-gray-800'
        };
      default:
        return {
          name: provider,
          iconName: 'User',
          bgColor: 'bg-gray-100 hover:bg-gray-200',
          textColor: 'text-gray-900',
          borderColor: 'border-gray-300'
        };
    }
  };

  const config = getProviderConfig(provider);

  return (
    <button
      onClick={() => onClick(provider)}
      disabled={disabled || loading}
      className={`w-full flex items-center justify-center space-x-3 px-4 py-3 rounded-lg border transition-all duration-200 ${config?.bgColor} ${config?.textColor} ${config?.borderColor} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <Icon name={config?.iconName} size={20} />
      <span className="font-body font-medium">Continue with {config?.name}</span>
      {loading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin ml-2" />
      )}
    </button>
  );
};

export default SocialAuthButton;