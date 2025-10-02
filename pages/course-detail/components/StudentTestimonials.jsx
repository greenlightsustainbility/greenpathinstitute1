import React, { useState } from 'react';
import Icon from '../../../components/AppIcon.jsx';
import Image from '../../../components/AppImage.jsx';
import Button from '../../../components/ui/Button.jsx';

const RelatedCourses = ({ courses, currentCourseId }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    NGN: '₦',
    ZAR: 'R'
  };

  const formatPrice = (price, currency) => {
    const symbol = currencySymbols?.[currency] || '$';
    return `${symbol}${price?.toLocaleString()}`;
  };

  const filteredCourses = courses?.filter(course => course?.id !== currentCourseId);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={index < Math.floor(rating) ? "text-warning fill-current" : "text-border"}
      />
    ));
  };

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-bold text-text-primary mb-4">
              Related Courses
            </h2>
            <p className="text-lg text-text-secondary">
              Continue your learning journey with these recommended courses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses?.slice(0, 6)?.map((course) => (
              <div
                key={course?.id}
                className="bg-card border border-border rounded-lg shadow-elevation-sm overflow-hidden hover:shadow-elevation-md transition-shadow duration-200"
              >
                {/* Course Image */}
                <div className="relative aspect-video">
                  <Image
                    src={course?.thumbnail}
                    alt={course?.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/90 text-white">
                      {course?.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Heart"
                      className="bg-white/90 hover:bg-white text-text-primary w-8 h-8 rounded-full"
                    />
                  </div>
                  {course?.isNew && (
                    <div className="absolute bottom-4 left-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent text-white">
                        New
                      </span>
                    </div>
                  )}
                </div>

                {/* Course Content */}
                <div className="p-6">
                  {/* Course Title */}
                  <h3 className="font-heading font-semibold text-lg text-text-primary mb-2 line-clamp-2">
                    {course?.title}
                  </h3>

                  {/* Course Description */}
                  <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                    {course?.description}
                  </p>

                  {/* Instructor */}
                  <div className="flex items-center space-x-2 mb-4">
                    <Image
                      src={course?.instructor?.avatar}
                      alt={course?.instructor?.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-sm text-text-secondary">
                      {course?.instructor?.name}
                    </span>
                  </div>

                  {/* Course Stats */}
                  <div className="flex items-center justify-between mb-4 text-sm text-text-secondary">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={14} />
                        <span>{course?.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Users" size={14} />
                        <span>{course?.enrolledCount}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {renderStars(course?.rating)}
                      <span className="ml-1">({course?.reviewCount})</span>
                    </div>
                  </div>

                  {/* Level and Features */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted text-text-secondary">
                      {course?.level}
                    </span>
                    <div className="flex items-center space-x-2">
                      {course?.certified && (
                        <Icon name="Award" size={16} className="text-success" title="Certified Course" />
                      )}
                      {course?.hasQuiz && (
                        <Icon name="HelpCircle" size={16} className="text-primary" title="Includes Quizzes" />
                      )}
                      {course?.downloadableResources && (
                        <Icon name="Download" size={16} className="text-accent" title="Downloadable Resources" />
                      )}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-xl font-heading font-bold text-text-primary">
                        {formatPrice(course?.pricing?.[selectedCurrency], selectedCurrency)}
                      </span>
                      {course?.originalPrice && (
                        <span className="text-sm text-text-secondary line-through">
                          {formatPrice(course?.originalPrice?.[selectedCurrency], selectedCurrency)}
                        </span>
                      )}
                    </div>
                    {course?.discount && (
                      <span className="inline-flex items-center px-2 py-1 bg-success/10 text-success rounded-full text-xs font-medium">
                        {course?.discount}% OFF
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button variant="default" fullWidth>
                      View Course
                    </Button>
                    <Button variant="outline" fullWidth size="sm">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bundle Recommendation */}
          <div className="mt-12 bg-primary/5 border border-primary/20 rounded-lg p-8">
            <div className="text-center">
              <Icon name="Package" size={48} className="text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-heading font-semibold text-text-primary mb-4">
                Save More with Course Bundles
              </h3>
              <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
                Get access to multiple related courses at a discounted price. Perfect for comprehensive skill development in ESG and sustainability.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <Button variant="default" size="lg">
                  View Bundles
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
          </div>

          {/* View All Courses */}
          <div className="mt-8 text-center">
            <Button variant="outline" size="lg" iconName="ArrowRight" iconPosition="right">
              View All Courses
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedCourses;