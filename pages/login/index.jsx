import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from "../../components/ui/Header.jsx";
import LoginForm from './components/LoginForm.jsx';
import SocialAuthButton from './components/SocialAuthButton.jsx';
import SecurityFeatures from './components/SecurityFeatures.jsx';
import BiometricAuth from './components/BiometricAuth.jsx';
import Icon from "../../components/AppIcon.jsx";


const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(null);
  const [socialLoading, setSocialLoading] = useState(null);

  // Mock credentials for testing
  const mockCredentials = {
    learner: { email: 'learner@greenpath.edu', password: 'learner123' },
    organization: { email: 'admin@company.com', password: 'admin123' }
  };

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('authToken');
    if (token) {
      let userRole = localStorage.getItem('userRole');
      redirectToDashboard(userRole);
    }

    // Check for account lockout
    const lockout = localStorage.getItem('accountLockout');
    if (lockout) {
      const lockoutData = JSON.parse(lockout);
      if (Date.now() < lockoutData?.until) {
        setIsLocked(true);
        setLockoutTime(lockoutData?.until);
      } else {
        localStorage.removeItem('accountLockout');
        localStorage.removeItem('loginAttempts');
      }
    }

    // Get current attempt count
    const attempts = localStorage.getItem('loginAttempts');
    if (attempts) {
      setAttemptCount(parseInt(attempts));
    }
  }, []);

  const redirectToDashboard = (userRole) => {
    const from = location?.state?.from?.pathname || 
                 (userRole === 'organization' ? '/organization-dashboard' : '/learner-dashboard');
    navigate(from, { replace: true });
  };

  const handleLogin = async (formData) => {
    if (isLocked) return;

    setLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check credentials
      let userRole = null;
      let isValid = false;

      if (formData?.email === mockCredentials?.learner?.email && 
          formData?.password === mockCredentials?.learner?.password) {
        userRole = 'learner';
        isValid = true;
      } else if (formData?.email === mockCredentials?.organization?.email && 
                 formData?.password === mockCredentials?.organization?.password) {
        userRole = 'organization';
        isValid = true;
      }

      if (isValid) {
        // Successful login
        const token = `jwt_token_${Date.now()}_${userRole}`;
        localStorage.setItem('authToken', token);
        localStorage.setItem('userRole', userRole);
        localStorage.removeItem('loginAttempts');
        localStorage.removeItem('accountLockout');

        if (formData?.rememberMe) {
          localStorage.setItem('rememberUser', formData?.email);
        }

        redirectToDashboard(userRole);
      } else {
        // Failed login
        const newAttemptCount = attemptCount + 1;
        setAttemptCount(newAttemptCount);
        localStorage.setItem('loginAttempts', newAttemptCount?.toString());

        if (newAttemptCount >= 5) {
          // Lock account for 15 minutes
          const lockUntil = Date.now() + (15 * 60 * 1000);
          setIsLocked(true);
          setLockoutTime(lockUntil);
          localStorage.setItem('accountLockout', JSON.stringify({ until: lockUntil }));
          setError('Account locked due to too many failed attempts. Try again in 15 minutes.');
        } else {
          setError(`Invalid email or password. Use: learner@greenpath.edu / learner123 or admin@company.com / admin123`);
        }
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = async (provider) => {
    setSocialLoading(provider);
    setError('');

    try {
      // Simulate OAuth flow
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful social login
      const token = `social_jwt_token_${Date.now()}_${provider}`;
      let userRole = 'learner'; // Default to learner for social auth
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', userRole);
      localStorage.removeItem('loginAttempts');
      localStorage.removeItem('accountLockout');

      redirectToDashboard(userRole);
    } catch (err) {
      setError(`${provider} authentication failed. Please try again.`);
    } finally {
      setSocialLoading(null);
    }
  };

  const handleBiometricLogin = (result) => {
    if (result?.success) {
      const token = `biometric_jwt_token_${Date.now()}`;
      let userRole = 'learner';
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', userRole);
      localStorage.removeItem('loginAttempts');
      localStorage.removeItem('accountLockout');

      redirectToDashboard(userRole);
    } else {
      setError(`Biometric authentication failed: ${result?.error}`);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign In - GreenPath Institute</title>
        <meta name="description" content="Sign in to your GreenPath Institute account to access ESG and sustainability courses, track your progress, and earn certifications." />
        <meta name="keywords" content="login, sign in, ESG courses, sustainability education, GreenPath Institute" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
              {/* Header */}
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
                    <Icon name="Leaf" size={32} color="white" />
                  </div>
                </div>
                <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
                  Welcome Back
                </h1>
                <p className="font-body text-muted-foreground">
                  Sign in to continue your ESG learning journey
                </p>
              </div>

              {/* Security Features */}
              <SecurityFeatures 
                attemptCount={attemptCount}
                isLocked={isLocked}
                lockoutTime={lockoutTime}
              />

              {/* Login Form */}
              <div className="bg-card rounded-xl shadow-sm border border-border p-8">
                <LoginForm 
                  onSubmit={handleLogin}
                  loading={loading}
                  error={error}
                />

                {/* Social Authentication */}
                <div className="mt-6 space-y-3">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-card text-muted-foreground font-caption">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <SocialAuthButton 
                      provider="google"
                      onClick={handleSocialAuth}
                      disabled={loading || isLocked}
                      loading={socialLoading === 'google'}
                    />
                    <SocialAuthButton 
                      provider="linkedin"
                      onClick={handleSocialAuth}
                      disabled={loading || isLocked}
                      loading={socialLoading === 'linkedin'}
                    />
                    <SocialAuthButton 
                      provider="microsoft"
                      onClick={handleSocialAuth}
                      disabled={loading || isLocked}
                      loading={socialLoading === 'microsoft'}
                    />
                  </div>
                </div>

                {/* Biometric Authentication */}
                <div className="mt-6">
                  <BiometricAuth 
                    onBiometricLogin={handleBiometricLogin}
                    disabled={loading || isLocked}
                  />
                </div>
              </div>

              {/* Registration Link */}
              <div className="text-center">
                <p className="font-body text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link 
                    to="/user-registration" 
                    className="font-medium text-primary hover:text-primary/80 transition-colors duration-200"
                  >
                    Create your account
                  </Link>
                </p>
              </div>

              {/* Help Links */}
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                  <button className="hover:text-foreground transition-colors duration-200">
                    Need Help?
                  </button>
                  <span>•</span>
                  <button className="hover:text-foreground transition-colors duration-200">
                    Contact Support
                  </button>
                </div>
                <p className="font-caption text-xs text-muted-foreground">
                  Secure login powered by industry-standard encryption
                </p>
              </div>

              {/* Mock Credentials Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                <div className="flex items-start space-x-2">
                  <Icon name="Info" size={16} className="text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-body font-medium text-blue-800 text-sm mb-1">Demo Credentials</h4>
                    <div className="space-y-1 text-xs text-blue-700">
                      <p><strong>Learner:</strong> learner@greenpath.edu / learner123</p>
                      <p><strong>Organization:</strong> admin@company.com / admin123</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Login;