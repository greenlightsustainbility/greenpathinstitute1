import React, { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Icon from '../../../components/AppIcon.jsx';
import Button from '../../../components/ui/Button.jsx';

const AnalyticsDashboard = ({ analyticsData, onAnalyticsAction }) => {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('engagement');

  const timeRangeOptions = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' }
  ];

  const metricOptions = [
    { value: 'engagement', label: 'Learning Engagement', icon: 'TrendingUp' },
    { value: 'completion', label: 'Course Completion', icon: 'CheckCircle' },
    { value: 'certificates', label: 'Certificates Issued', icon: 'Award' },
    { value: 'time-spent', label: 'Time Spent Learning', icon: 'Clock' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-popover-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-sm text-popover-foreground">
                {entry?.name}: {entry?.value}
                {selectedMetric === 'time-spent' ? ' hours' : ''}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const getMetricData = () => {
    return analyticsData?.[selectedMetric]?.[timeRange] || [];
  };

  const getMetricColor = () => {
    const colors = {
      'engagement': '#2E7D32',
      'completion': '#1565C0',
      'certificates': '#7B1FA2',
      'time-spent': '#FF8F00'
    };
    return colors?.[selectedMetric] || '#2E7D32';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Learning Analytics</h3>
          <p className="text-sm text-muted-foreground">Track engagement and learning outcomes</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            onClick={() => onAnalyticsAction('export-data')}
          >
            Export Data
          </Button>
          <Button
            variant="outline"
            iconName="FileBarChart"
            iconPosition="left"
            onClick={() => onAnalyticsAction('generate-report')}
          >
            Generate Report
          </Button>
        </div>
      </div>
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-muted-foreground">Time Range:</span>
          <div className="flex items-center space-x-1">
            {timeRangeOptions?.map((option) => (
              <button
                key={option?.value}
                onClick={() => setTimeRange(option?.value)}
                className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                  timeRange === option?.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {option?.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-muted-foreground">Metric:</span>
          <div className="flex items-center space-x-1">
            {metricOptions?.map((option) => (
              <button
                key={option?.value}
                onClick={() => setSelectedMetric(option?.value)}
                className={`flex items-center space-x-1 px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                  selectedMetric === option?.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={option?.icon} size={14} />
                <span className="hidden sm:inline">{option?.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Chart */}
      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={getMetricData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={getMetricColor()} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={getMetricColor()} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis
              dataKey="date"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={getMetricColor()}
              fillOpacity={1}
              fill="url(#colorMetric)"
              strokeWidth={2}
              name={metricOptions?.find(m => m?.value === selectedMetric)?.label}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {analyticsData?.insights?.map((insight, index) => (
          <div key={index} className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <div className={`w-8 h-8 rounded-lg ${insight?.color} flex items-center justify-center`}>
                <Icon name={insight?.icon} size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{insight?.title}</p>
              </div>
            </div>
            <p className="text-lg font-bold text-foreground mb-1">{insight?.value}</p>
            <p className="text-xs text-muted-foreground">{insight?.description}</p>
          </div>
        ))}
      </div>
      {/* Popular Courses */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-foreground">Popular Courses</h4>
          <Button
            variant="ghost"
            size="sm"
            iconName="ArrowRight"
            iconPosition="right"
            onClick={() => onAnalyticsAction('view-course-analytics')}
          >
            View Details
          </Button>
        </div>
        
        <div className="space-y-3">
          {analyticsData?.popularCourses?.map((course, index) => (
            <div key={course?.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-foreground">{index + 1}</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{course?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {course?.enrollments} enrollments • {course?.completionRate}% completion
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{course?.avgRating}/5</p>
                <div className="flex items-center space-x-1">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={12}
                      className={i < Math.floor(course?.avgRating) ? 'text-yellow-500' : 'text-muted-foreground'}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* ROI Metrics */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="font-medium text-foreground mb-4">Training ROI</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-success mb-1">{analyticsData?.roi?.costSavings}</p>
            <p className="text-sm text-muted-foreground">Estimated Cost Savings</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary mb-1">{analyticsData?.roi?.productivityGain}</p>
            <p className="text-sm text-muted-foreground">Productivity Improvement</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-warning mb-1">{analyticsData?.roi?.complianceScore}</p>
            <p className="text-sm text-muted-foreground">Compliance Score</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;