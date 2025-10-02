import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon.jsx';
import Image from '../../../components/AppImage.jsx';
import Button from '../../../components/ui/Button.jsx';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleContinueLearning = () => {
    navigate('/course-player', { state: { courseId: course?.id } });
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 50) return 'bg-warning';
    return 'bg-primary';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <Image
            src={course?.thumbnail}
            alt={course?.title}
            className="w-16 h-16 rounded-lg object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-semibold text-lg text-card-foreground mb-2 truncate">
            {course?.title}
          </h3>
          
          <div className="flex items-center space-x-4 mb-3">
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Icon name="Clock" size={16} />
              <span className="font-caption text-sm">{course?.duration}</span>
            </div>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Icon name="BookOpen" size={16} />
              <span className="font-caption text-sm">{course?.lessonsCompleted}/{course?.totalLessons} lessons</span>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-body text-sm text-muted-foreground">Progress</span>
              <span className="font-body text-sm font-medium text-card-foreground">{course?.progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(course?.progress)}`}
                style={{ width: `${course?.progress}%` }}
              />
            </div>
          </div>
          
          {course?.nextLesson && (
            <div className="mb-4 p-3 bg-muted rounded-lg">
              <p className="font-body text-sm text-muted-foreground mb-1">Next Lesson:</p>
              <p className="font-body text-sm font-medium text-card-foreground">{course?.nextLesson}</p>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground">
              <span className="font-caption text-xs">Est. completion: {course?.estimatedCompletion}</span>
            </div>
            <Button
              variant="default"
              size="sm"
              onClick={handleContinueLearning}
              iconName="Play"
              iconPosition="left"
            >
              Continue Learning
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;