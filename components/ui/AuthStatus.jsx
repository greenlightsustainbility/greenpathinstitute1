import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button.jsx';
import Icon from '../AppIcon.jsx';

const AuthStatus = ({ className = '' }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token) {
      setIsAuthenticated(true);
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    }

    // Listen for auth changes
    const handleAuthChange = () => {
      const newToken = localStorage.getItem('authToken');
      const newUserData = localStorage.getItem('userData');
      
      setIsAuthenticated(!!newToken);
      if (newUserData) {
        try {
          setUser(JSON.parse(newUserData));
        } catch (error) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    window.addEventListener('authChanged', handleAuthChange);
    return () => window.removeEventListener('authChanged', handleAuthChange);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef?.current && !menuRef?.current?.contains(event?.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUserMenuToggle = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUser(null);
    setUserMenuOpen(false);
    
    // Dispatch auth change event
    window.dispatchEvent(new CustomEvent('authChanged'));
  };

  const handleLogin = () => {
    // Mock login for demo
    const mockUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: null,
      role: 'student'
    };
    
    localStorage.setItem('authToken', 'mock-jwt-token');
    localStorage.setItem('userData', JSON.stringify(mockUser));
    setIsAuthenticated(true);
    setUser(mockUser);
    
    // Dispatch auth change event
    window.dispatchEvent(new CustomEvent('authChanged'));
  };

  if (!isAuthenticated) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleLogin}
        >
          Sign In
        </Button>
        <Button 
          variant="default" 
          size="sm"
          onClick={handleLogin}
        >
          Sign Up
        </Button>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={menuRef}>
      <Button
        variant="ghost"
        size="sm"
        iconName="User"
        iconPosition="left"
        onClick={handleUserMenuToggle}
        className="flex items-center space-x-2"
      >
        <span className="hidden sm:inline">
          {user?.name || 'Account'}
        </span>
      </Button>

      {userMenuOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-elevation-md z-50">
          <div className="px-4 py-3 border-b border-border">
            <p className="font-body font-medium text-sm text-popover-foreground">
              {user?.name || 'User'}
            </p>
            <p className="font-caption text-xs text-text-secondary truncate">
              {user?.email || 'user@example.com'}
            </p>
          </div>
          
          <div className="py-1">
            <Link
              to="/dashboard"
              className="flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
              onClick={() => setUserMenuOpen(false)}
            >
              <Icon name="LayoutDashboard" size={16} />
              <span>Dashboard</span>
            </Link>
            
            <Link
              to="/my-courses"
              className="flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
              onClick={() => setUserMenuOpen(false)}
            >
              <Icon name="BookOpen" size={16} />
              <span>My Courses</span>
            </Link>
            
            <Link
              to="/certificates"
              className="flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
              onClick={() => setUserMenuOpen(false)}
            >
              <Icon name="Award" size={16} />
              <span>Certificates</span>
            </Link>
            
            <Link
              to="/profile"
              className="flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
              onClick={() => setUserMenuOpen(false)}
            >
              <Icon name="Settings" size={16} />
              <span>Settings</span>
            </Link>
          </div>
          
          <div className="border-t border-border py-1">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200 w-full text-left"
            >
              <Icon name="LogOut" size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthStatus;