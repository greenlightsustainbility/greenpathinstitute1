import React from 'react';
import Icon from '../../../components/AppIcon.jsx';

const AchievementMetrics = ({ metrics }) => {
  const metricItems = [
    {
      icon: 'Clock',
      label: 'Learning Hours',
      value: metrics?.totalHours,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: 'BookOpen',
      label: 'Courses Completed',
      value: metrics?.coursesCompleted,
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      icon: 'Award',
      label: 'Certificates Earned',
      value: metrics?.certificatesEarned,
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      icon: 'TrendingUp',
      label: 'Current Level',
      value: metrics?.currentLevel,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="font-heading font-semibold text-xl text-card-foreground mb-6">
        Your Achievements
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricItems?.map((item, index) => (
          <div key={index} className="text-center">
            <div className={`w-16 h-16 ${item?.bgColor} rounded-full flex items-center justify-center mx-auto mb-3`}>
              <Icon name={item?.icon} size={24} className={item?.color} />
            </div>
            <div className="space-y-1">
              <p className="font-heading font-bold text-2xl text-card-foreground">{item?.value}</p>
              <p className="font-body text-sm text-muted-foreground">{item?.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementMetrics;