import React from 'react';
import Icon from '../../../components/AppIcon.jsx';

const StatsOverview = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Staff Enrolled',
      value: stats?.totalStaff,
      change: '+12%',
      changeType: 'positive',
      icon: 'Users',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Courses Completed',
      value: stats?.completedCourses,
      change: '+8%',
      changeType: 'positive',
      icon: 'BookCheck',
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Certificates Issued',
      value: stats?.certificatesIssued,
      change: '+15%',
      changeType: 'positive',
      icon: 'Award',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Average Progress',
      value: `${stats?.averageProgress}%`,
      change: '+5%',
      changeType: 'positive',
      icon: 'TrendingUp',
      color: 'bg-orange-50 text-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg ${stat?.color} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={24} />
            </div>
            <span className={`text-sm font-medium ${
              stat?.changeType === 'positive' ? 'text-success' : 'text-destructive'
            }`}>
              {stat?.change}
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1">{stat?.value}</h3>
            <p className="text-sm text-muted-foreground">{stat?.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;