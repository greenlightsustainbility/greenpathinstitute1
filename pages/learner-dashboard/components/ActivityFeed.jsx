import React from 'react';
import Icon from '../../../components/AppIcon.jsx';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'lesson_completed':
        return { icon: 'CheckCircle', color: 'text-success' };
      case 'quiz_passed':
        return { icon: 'Trophy', color: 'text-warning' };
      case 'certificate_earned':
        return { icon: 'Award', color: 'text-primary' };
      case 'course_started':
        return { icon: 'Play', color: 'text-secondary' };
      default:
        return { icon: 'Activity', color: 'text-muted-foreground' };
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInHours = Math.floor((now - activityTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return activityTime?.toLocaleDateString();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="font-heading font-semibold text-xl text-card-foreground mb-6">
        Recent Activity
      </h2>
      <div className="space-y-4">
        {activities?.map((activity) => {
          const { icon, color } = getActivityIcon(activity?.type);
          
          return (
            <div key={activity?.id} className="flex items-start space-x-3">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center`}>
                <Icon name={icon} size={16} className={color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm text-card-foreground">
                  {activity?.description}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="font-caption text-xs text-muted-foreground">
                    {formatTimeAgo(activity?.timestamp)}
                  </span>
                  {activity?.score && (
                    <>
                      <span className="font-caption text-xs text-muted-foreground">•</span>
                      <span className="font-caption text-xs text-success font-medium">
                        Score: {activity?.score}%
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <button className="font-body text-sm text-primary hover:text-primary/80 transition-colors duration-200">
          View all activity
        </button>
      </div>
    </div>
  );
};

export default ActivityFeed;