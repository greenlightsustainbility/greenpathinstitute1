import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon.jsx';

const Breadcrumbs = ({ customBreadcrumbs = null, className = '' }) => {
  const location = useLocation();

  const routeLabels = {
    '/': 'Home',
    '/course-listing': 'Courses',
    '/course-detail': 'Course Details',
    '/pricing-page': 'Pricing',
    '/contact-page': 'Contact',
    '/checkout-flow': 'Checkout',
    '/certificate-verification': 'Verify Certificate',
    '/dashboard': 'Dashboard',
    '/my-courses': 'My Courses',
    '/profile': 'Profile',
    '/certificates': 'Certificates',
  };

  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location?.pathname?.split('/')?.filter(segment => segment);
    const breadcrumbs = [{ label: 'Home', path: '/' }];

    let currentPath = '';
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const label = routeLabels?.[currentPath] || segment?.charAt(0)?.toUpperCase() + segment?.slice(1);
      
      breadcrumbs?.push({
        label,
        path: currentPath,
        isLast: index === pathSegments?.length - 1
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on home page
  if (location?.pathname === '/' || breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav 
      className={`flex items-center space-x-2 text-sm font-body ${className}`}
      aria-label="Breadcrumb"
    >
      {breadcrumbs?.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb?.path}>
          {index > 0 && (
            <Icon 
              name="ChevronRight" 
              size={16} 
              className="text-text-secondary" 
            />
          )}
          
          {breadcrumb?.isLast ? (
            <span 
              className="text-text-primary font-medium"
              aria-current="page"
            >
              {breadcrumb?.label}
            </span>
          ) : (
            <Link
              to={breadcrumb?.path}
              className="text-text-secondary hover:text-primary transition-colors duration-200"
            >
              {breadcrumb?.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;