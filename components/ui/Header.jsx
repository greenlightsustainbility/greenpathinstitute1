import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon.jsx';
import Button from './Button.jsx';
import Select from './select.jsx';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Home', path: '/', icon: 'Home' },
    { label: 'Courses', path: '/course-listing', icon: 'BookOpen' },
    { label: 'Pricing', path: '/pricing-page', icon: 'DollarSign' },
    { label: 'Contact', path: '/contact-page', icon: 'MessageCircle' },
  ];

  const currencyOptions = [
    { value: 'USD', label: 'USD ($)' },
    { value: 'EUR', label: 'EUR (€)' },
    { value: 'GBP', label: 'GBP (£)' },
    { value: 'ZAR', label: 'ZAR (R)' },
    { value: 'NGN', label: 'NGN (₦)' },
    { value: 'KES', label: 'KES (KSh)' },
  ];

  useEffect(() => {
    const savedCurrency = localStorage.getItem('selectedCurrency');
    if (savedCurrency) {
      setSelectedCurrency(savedCurrency);
    }

    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    localStorage.setItem('selectedCurrency', currency);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleUserMenuToggle = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setUserMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border shadow-elevation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Leaf" size={20} color="white" />
            </div>
            <span className="font-heading font-semibold text-xl text-text-primary">
              GreenPath Institute
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`font-body font-medium text-sm transition-colors duration-200 hover:text-primary ${
                  isActivePath(item?.path)
                    ? 'text-primary border-b-2 border-primary pb-1' :'text-text-secondary'
                }`}
              >
                {item?.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Currency Selector */}
            <div className="w-32">
              <Select
                options={currencyOptions}
                value={selectedCurrency}
                onChange={handleCurrencyChange}
                placeholder="Currency"
                className="text-sm"
              />
            </div>

            {/* Verify Certificate Button */}
            <Button
              variant="outline"
              size="sm"
              iconName="Shield"
              iconPosition="left"
              onClick={() => window.location.href = '/certificate-verification'}
            >
              Verify
            </Button>

            {/* Authentication Section */}
            {isAuthenticated ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="User"
                  iconPosition="left"
                  onClick={handleUserMenuToggle}
                >
                  Account
                </Button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevation-md z-50">
                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
                <Button variant="default" size="sm">
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Shield"
              onClick={() => window.location.href = '/certificate-verification'}
            />
            <Button
              variant="ghost"
              size="sm"
              iconName={isMobileMenuOpen ? 'X' : 'Menu'}
              onClick={handleMobileMenuToggle}
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-surface">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-body font-medium transition-colors duration-200 ${
                    isActivePath(item?.path)
                      ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-primary hover:bg-muted'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon name={item?.icon} size={20} />
                  {item?.label}
                </Link>
              ))}
              
              <div className="px-3 py-2">
                <div className="w-full">
                  <Select
                    label="Currency"
                    options={currencyOptions}
                    value={selectedCurrency}
                    onChange={handleCurrencyChange}
                    className="text-sm"
                  />
                </div>
              </div>

              <div className="px-3 py-2 border-t border-border mt-2 pt-2">
                {isAuthenticated ? (
                  <div className="space-y-1">
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-body font-medium text-text-secondary hover:text-primary hover:bg-muted transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon name="LayoutDashboard" size={20} />
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-body font-medium text-text-secondary hover:text-primary hover:bg-muted transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon name="User" size={20} />
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-body font-medium text-text-secondary hover:text-primary hover:bg-muted transition-colors duration-200 w-full text-left"
                    >
                      <Icon name="LogOut" size={20} />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button variant="ghost" fullWidth className="justify-start">
                      <Icon name="LogIn" size={20} className="mr-3" />
                      Sign In
                    </Button>
                    <Button variant="default" fullWidth className="justify-start">
                      <Icon name="UserPlus" size={20} className="mr-3" />
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;