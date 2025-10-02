import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon.jsx';


const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Browse Courses',
      description: 'Explore our ESG and sustainability course catalog',
      icon: 'Search',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      onClick: () => navigate('/courses')
    },
    {
      title: 'Download Certificates',
      description: 'Access and download your earned certificates',
      icon: 'Download',
      color: 'text-success',
      bgColor: 'bg-success/10',
      onClick: () => {
        // Scroll to certificates section
        document.getElementById('certificates-section')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      title: 'Profile Settings',
      description: 'Update your account and learning preferences',
      icon: 'Settings',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      onClick: () => navigate('/profile')
    },
    {
      title: 'Get Help',
      description: 'Contact support or browse help resources',
      icon: 'HelpCircle',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      onClick: () => navigate('/help')
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="font-heading font-semibold text-xl text-card-foreground mb-6">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions?.map((action, index) => (
          <button
            key={index}
            onClick={action?.onClick}
            className="text-left p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/50 transition-all duration-200 group"
          >
            <div className="flex items-start space-x-3">
              <div className={`flex-shrink-0 w-10 h-10 ${action?.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={action?.icon} size={20} className={action?.color} />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-body font-medium text-card-foreground mb-1">
                  {action?.title}
                </h3>
                <p className="font-caption text-sm text-muted-foreground">
                  {action?.description}
                </p>
              </div>
              
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="text-muted-foreground group-hover:text-primary transition-colors duration-200" 
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;