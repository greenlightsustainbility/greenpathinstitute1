import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon.jsx';
import Image from '../../../components/AppImage.jsx';
import Button from '../../../components/ui/Button.jsx';

const RecommendedCourses = ({ courses }) => {
  const navigate = useNavigate();

  const handleEnrollNow = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-semibold text-xl text-card-foreground">
          Recommended for You
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/courses')}
          iconName="ArrowRight"
          iconPosition="right"
        >
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses?.map((course) => (
          <div key={course?.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
            <div className="mb-3">
              <Image
                src={course?.thumbnail}
                alt={course?.title}
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
            
            <div className="space-y-3">
              <h3 className="font-body font-semibold text-card-foreground line-clamp-2">
                {course?.title}
              </h3>
              
              <div className="flex items-center space-x-4 text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} />
                  <span className="font-caption text-xs">{course?.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={14} />
                  <span className="font-caption text-xs">{course?.enrolledCount} enrolled</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <div className="flex items-center">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={12}
                      className={i < Math.floor(course?.rating) ? 'text-warning fill-current' : 'text-muted-foreground'}
                    />
                  ))}
                </div>
                <span className="font-caption text-xs text-muted-foreground">
                  {course?.rating} ({course?.reviewCount} reviews)
                </span>
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <div className="text-card-foreground">
                  <span className="font-body font-bold text-lg">${course?.price}</span>
                  {course?.originalPrice && (
                    <span className="font-caption text-sm text-muted-foreground line-through ml-2">
                      ${course?.originalPrice}
                    </span>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEnrollNow(course?.id)}
                >
                  Enroll Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedCourses;