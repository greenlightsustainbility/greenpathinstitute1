import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../components/ui/Header.jsx";
import RegistrationHeader from './components/RegistrationHeader.jsx';
import RegistrationForm from './components/RegistrationForm.jsx';
import SocialAuthSection from './components/SocialAuthSection.jsx';
import EmailVerificationNotice from './components/EmailVerificationNotice.jsx';
import Icon from "../../components/AppIcon.jsx";

const UserRegistration = () => {
  const navigate = useNavigate();
  const [registrationStep, setRegistrationStep] = useState('form'); // 'form', 'verification'
  const [isLoading, setIsLoading] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  // Mock registration data for demonstration
  const mockCredentials = {
    testUser: {
      email: 'test@greenpath.com',
      password: 'GreenPath123!',
      fullName: 'John Doe'
    }
  };

  const handleFormSubmission = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock registration logic
      console.log('Registration data:', formData);
      
      // Store user data in localStorage (mock authentication)
      const userData = {
        id: Date.now(),
        email: formData?.email,
        fullName: formData?.fullName,
        jobTitle: formData?.jobTitle,
        organization: formData?.organization,
        industry: formData?.industry,
        country: formData?.country,
        currency: formData?.currency,
        isVerified: false,
        registrationDate: new Date()?.toISOString()
      };
      
      localStorage.setItem('pendingUser', JSON.stringify(userData));
      setRegisteredEmail(formData?.email);
      setRegistrationStep('verification');
      
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration error
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = async (provider) => {
    setIsLoading(true);
    
    try {
      // Simulate OAuth flow delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock social authentication
      const socialUserData = {
        id: Date.now(),
        email: `user@${provider}.com`,
        fullName: `${provider?.charAt(0)?.toUpperCase() + provider?.slice(1)} User`,
        provider: provider,
        isVerified: true,
        registrationDate: new Date()?.toISOString()
      };
      
      // Store auth token and user data
      localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
      localStorage.setItem('userRole', 'learner');
      localStorage.setItem('userData', JSON.stringify(socialUserData));
      
      // Redirect to dashboard
      navigate('/learner-dashboard');
      
    } catch (error) {
      console.error(`${provider} authentication failed:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async (email) => {
    // Simulate resending verification email
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Verification email resent to:', email);
  };

  const handleChangeEmail = () => {
    setRegistrationStep('form');
    setRegisteredEmail('');
  };

  const handleEmailVerification = () => {
    // This would typically be handled by a link in the email
    // For demo purposes, we'll simulate successful verification
    const pendingUser = JSON.parse(localStorage.getItem('pendingUser') || '{}');
    
    if (pendingUser?.email) {
      const verifiedUser = { ...pendingUser, isVerified: true };
      localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
      localStorage.setItem('userRole', 'learner');
      localStorage.setItem('userData', JSON.stringify(verifiedUser));
      localStorage.removeItem('pendingUser');
      
      navigate('/learner-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <RegistrationHeader />
            
            <div className="mt-12">
              {registrationStep === 'form' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Registration Form */}
                  <div className="space-y-8">
                    <div className="bg-card border border-border rounded-lg p-8">
                      <div className="mb-6">
                        <h2 className="font-heading font-semibold text-2xl text-foreground mb-2">
                          Create Your Account
                        </h2>
                        <p className="font-body text-muted-foreground">
                          Fill in your details to get started with your ESG learning journey
                        </p>
                      </div>
                      
                      <RegistrationForm 
                        onSubmit={handleFormSubmission}
                        isLoading={isLoading}
                      />
                    </div>
                  </div>

                  {/* Social Authentication */}
                  <div className="space-y-8">
                    <div className="bg-card border border-border rounded-lg p-8">
                      <div className="mb-6">
                        <h2 className="font-heading font-semibold text-2xl text-foreground mb-2">
                          Quick Registration
                        </h2>
                        <p className="font-body text-muted-foreground">
                          Use your existing account to register instantly
                        </p>
                      </div>
                      
                      <SocialAuthSection 
                        onSocialAuth={handleSocialAuth}
                        isLoading={isLoading}
                      />
                    </div>

                    {/* Additional Information */}
                    <div className="bg-card border border-border rounded-lg p-6">
                      <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                        Why Choose GreenPath Institute?
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                            <Icon name="BookOpen" size={14} color="var(--color-primary)" />
                          </div>
                          <div>
                            <p className="font-body text-sm font-medium text-foreground">
                              Comprehensive ESG Curriculum
                            </p>
                            <p className="font-caption text-xs text-muted-foreground">
                              From fundamentals to advanced sustainability strategies
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                            <Icon name="MapPin" size={14} color="var(--color-primary)" />
                          </div>
                          <div>
                            <p className="font-body text-sm font-medium text-foreground">
                              Africa-Focused Content
                            </p>
                            <p className="font-caption text-xs text-muted-foreground">
                              Tailored for African markets and regulatory environments
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                            <Icon name="TrendingUp" size={14} color="var(--color-primary)" />
                          </div>
                          <div>
                            <p className="font-body text-sm font-medium text-foreground">
                              Career Advancement
                            </p>
                            <p className="font-caption text-xs text-muted-foreground">
                              Boost your career with in-demand ESG skills
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                            <Icon name="Users" size={14} color="var(--color-primary)" />
                          </div>
                          <div>
                            <p className="font-body text-sm font-medium text-foreground">
                              Professional Network
                            </p>
                            <p className="font-caption text-xs text-muted-foreground">
                              Connect with sustainability professionals across Africa
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="max-w-2xl mx-auto">
                  <EmailVerificationNotice
                    email={registeredEmail}
                    onResendVerification={handleResendVerification}
                    onChangeEmail={handleChangeEmail}
                  />
                  
                  {/* Demo verification button - remove in production */}
                  <div className="mt-6 text-center">
                    <button
                      onClick={handleEmailVerification}
                      className="text-sm text-primary hover:text-primary/80 underline"
                    >
                      [Demo] Simulate Email Verification
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-card border-t border-border">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                <a href="/privacy" className="hover:text-foreground transition-colors duration-200">
                  Privacy Policy
                </a>
                <a href="/terms" className="hover:text-foreground transition-colors duration-200">
                  Terms of Service
                </a>
                <a href="/contact" className="hover:text-foreground transition-colors duration-200">
                  Support
                </a>
              </div>
              
              <div className="flex items-center justify-center space-x-4">
                <Icon name="Shield" size={16} color="var(--color-muted-foreground)" />
                <span className="font-caption text-xs text-muted-foreground">
                  Your data is protected with enterprise-grade security
                </span>
              </div>
              
              <p className="font-caption text-xs text-muted-foreground">
                © {new Date()?.getFullYear()} GreenPath Institute. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default UserRegistration;