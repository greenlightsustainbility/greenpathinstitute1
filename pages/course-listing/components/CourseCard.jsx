import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage.jsx';
import Icon from '../../../components/AppIcon.jsx';
import Button from '../../../components/ui/Button.jsx';

const CourseCard = ({ course, selectedCurrency = 'USD' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(course?.pricing?.individual);

  const exchangeRates = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    ZAR: 18.50,
    NGN: 1650,
    KES: 150
  };

  const formatCurrency = (amount, currency) => {
    const symbols = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      ZAR: 'R',
      NGN: '₦',
      KES: 'KSh'
    };
    
    const convertedAmount = amount * exchangeRates?.[currency];
    return `${symbols?.[currency]}${convertedAmount?.toLocaleString()}`;
  };

  useEffect(() => {
    setCurrentPrice(course?.pricing?.individual * exchangeRates?.[selectedCurrency]);
  }, [selectedCurrency, course?.pricing?.individual]);

  const handlePreviewClick = (e) => {
    e?.preventDefault();
    setShowPreview(true);
    setTimeout(() => setShowPreview(false), 30000); // 30 second preview
  };

  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Course Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={course?.thumbnail}
          alt={course?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Preview Button */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
          {isHovered && (
            <Button
              variant="secondary"
              size="sm"
              iconName="Play"
              iconPosition="left"
              onClick={handlePreviewClick}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              Preview
            </Button>
          )}
        </div>

        {/* Course Bundle Badge */}
        {course?.isBundle && (
          <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs font-medium">
            Bundle
          </div>
        )}

        {/* Duration Badge */}
        <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-md text-xs">
          {course?.duration}
        </div>
      </div>
      {/* Course Content */}
      <div className="p-4">
        {/* Category & Difficulty */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-primary uppercase tracking-wide">
            {course?.category}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course?.level)}`}>
            {course?.level}
          </span>
        </div>

        {/* Course Title */}
        <Link to={`/course-detail?id=${course?.id}`}>
          <h3 className="font-heading font-semibold text-lg text-card-foreground mb-2 line-clamp-2 hover:text-primary transition-colors duration-200">
            {course?.title}
          </h3>
        </Link>

        {/* Course Description */}
        <p className="text-sm text-text-secondary mb-3 line-clamp-2">
          {course?.description}
        </p>

        {/* Instructor */}
        <div className="flex items-center mb-3">
          <Image
            src={course?.instructor?.avatar}
            alt={course?.instructor?.name}
            className="w-6 h-6 rounded-full mr-2"
          />
          <span className="text-sm text-text-secondary">
            {course?.instructor?.name}
          </span>
        </div>

        {/* Course Stats */}
        <div className="flex items-center justify-between mb-4 text-xs text-text-secondary">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Icon name="Users" size={14} className="mr-1" />
              <span>{course?.enrolledCount}</span>
            </div>
            <div className="flex items-center">
              <Icon name="Star" size={14} className="mr-1 text-yellow-500" />
              <span>{course?.rating}</span>
            </div>
            <div className="flex items-center">
              <Icon name="BookOpen" size={14} className="mr-1" />
              <span>{course?.lessonsCount} lessons</span>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-card-foreground">
                {formatCurrency(course?.pricing?.individual, selectedCurrency)}
              </span>
              {selectedCurrency !== 'USD' && (
                <span className="text-sm text-text-secondary">
                  ({formatCurrency(course?.pricing?.individual, 'USD')})
                </span>
              )}
            </div>
            {course?.pricing?.originalPrice && (
              <span className="text-sm text-text-secondary line-through">
                {formatCurrency(course?.pricing?.originalPrice, selectedCurrency)}
              </span>
            )}
          </div>
          
          {course?.pricing?.discount && (
            <div className="bg-success text-success-foreground px-2 py-1 rounded-md text-xs font-medium">
              {course?.pricing?.discount}% OFF
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="default"
            size="sm"
            fullWidth
            iconName="ShoppingCart"
            iconPosition="left"
            onClick={() => window.location.href = `/checkout-flow?courseId=${course?.id}`}
          >
            Enroll Now
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Heart"
            className="px-3"
          />
        </div>
      </div>
      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-heading font-semibold text-lg">
                Course Preview - {course?.title}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => setShowPreview(false)}
              />
            </div>
            <div className="aspect-video bg-black flex items-center justify-center">
              <div className="text-white text-center">
                <Icon name="Play" size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg">30-second preview would play here</p>
                <p className="text-sm opacity-75 mt-2">
                  Enroll to access full course content
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCard;