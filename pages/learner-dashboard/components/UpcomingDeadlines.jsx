import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon.jsx';
import Button from '../../../components/ui/Button.jsx';

const UpcomingDeadlines = ({ deadlines }) => {
  const navigate = useNavigate();

  const getUrgencyColor = (daysLeft) => {
    if (daysLeft <= 3) return 'text-destructive';
    if (daysLeft <= 7) return 'text-warning';
    return 'text-muted-foreground';
  };

  const getUrgencyBg = (daysLeft) => {
    if (daysLeft <= 3) return 'bg-destructive/10';
    if (daysLeft <= 7) return 'bg-warning/10';
    return 'bg-muted/50';
  };

  const handleContinueCourse = (courseId) => {
    navigate('/course-player', { state: { courseId } });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="font-heading font-semibold text-xl text-card-foreground mb-6">
        Upcoming Deadlines
      </h2>
      {deadlines?.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Calendar" size={24} className="text-muted-foreground" />
          </div>
          <p className="font-body text-muted-foreground">No upcoming deadlines</p>
          <p className="font-caption text-sm text-muted-foreground mt-1">
            You're all caught up with your courses!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {deadlines?.map((deadline) => (
            <div 
              key={deadline?.id} 
              className={`p-4 rounded-lg border ${getUrgencyBg(deadline?.daysLeft)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-body font-medium text-card-foreground mb-1">
                    {deadline?.title}
                  </h3>
                  <p className="font-caption text-sm text-muted-foreground mb-2">
                    {deadline?.courseName}
                  </p>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size={14} className="text-muted-foreground" />
                      <span className="font-caption text-xs text-muted-foreground">
                        Due: {deadline?.dueDate}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} className={getUrgencyColor(deadline?.daysLeft)} />
                      <span className={`font-caption text-xs font-medium ${getUrgencyColor(deadline?.daysLeft)}`}>
                        {deadline?.daysLeft === 0 ? 'Due today' : 
                         deadline?.daysLeft === 1 ? '1 day left' : 
                         `${deadline?.daysLeft} days left`}
                      </span>
                    </div>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleContinueCourse(deadline?.courseId)}
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  Continue
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingDeadlines;