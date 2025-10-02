import React, { useState } from 'react';
import Image from '../../../components/AppImage.jsx';
import Icon from '../../../components/AppIcon.jsx';
import Button from '../../../components/ui/Button.jsx';

const CourseHero = ({ course, onEnroll, onPreview, isEnrolled }) => {
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

  return (
    <div className="bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {course?.category}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                  {course?.level}
                </span>
                {course?.certified && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                    <Icon name="Award" size={14} className="mr-1" />
                    Certified
                  </span>
                )}
              </div>

              <h1 className="text-3xl lg:text-4xl font-heading font-bold text-text-primary">
                {course?.title}
              </h1>

              <p className="text-lg text-text-secondary leading-relaxed">
                {course?.description}
              </p>

              {/* Course Stats */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-text-secondary">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} />
                  <span>{course?.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={16} />
                  <span>{course?.enrolledCount} enrolled</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="BookOpen" size={16} />
                  <span>{course?.moduleCount} modules</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Star" size={16} />
                  <span>{course?.rating} ({course?.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                <Image
                  src={course?.instructor?.avatar}
                  alt={course?.instructor?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-body font-semibold text-text-primary">
                    {course?.instructor?.name}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {course?.instructor?.title}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {course?.instructor?.experience}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Course Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card border border-border rounded-lg shadow-elevation-sm overflow-hidden">
              {/* Video Preview */}
              <div className="relative aspect-video bg-muted">
                <Image
                  src={course?.thumbnail}
                  alt={course?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    variant="default"
                    size="lg"
                    iconName="Play"
                    onClick={onPreview}
                    className="rounded-full w-16 h-16 shadow-elevation-md"
                  />
                </div>
                {!isEnrolled && (
                  <div className="absolute top-4 right-4 bg-black/80 text-white px-2 py-1 rounded text-xs">
                    30s Preview
                  </div>
                )}
              </div>

              <div className="p-6 space-y-6">
                {/* Pricing */}
                <div className="space-y-4">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-heading font-bold text-text-primary">
                      {formatPrice(course?.pricing?.[selectedCurrency], selectedCurrency)}
                    </span>
                    {course?.originalPrice && (
                      <span className="text-lg text-text-secondary line-through">
                        {formatPrice(course?.originalPrice?.[selectedCurrency], selectedCurrency)}
                      </span>
                    )}
                  </div>
                  
                  {selectedCurrency !== 'USD' && (
                    <p className="text-sm text-text-secondary">
                      Approximately {formatPrice(course?.pricing?.USD, 'USD')} USD
                    </p>
                  )}

                  {course?.discount && (
                    <div className="inline-flex items-center px-3 py-1 bg-success/10 text-success rounded-full text-sm font-medium">
                      <Icon name="Tag" size={14} className="mr-1" />
                      {course?.discount}% OFF
                    </div>
                  )}
                </div>

                {/* Enrollment Button */}
                <div className="space-y-3">
                  {isEnrolled ? (
                    <Button variant="success" fullWidth size="lg">
                      <Icon name="CheckCircle" size={20} className="mr-2" />
                      Enrolled - Continue Learning
                    </Button>
                  ) : (
                    <Button variant="default" fullWidth size="lg" onClick={onEnroll}>
                      Enroll Now
                    </Button>
                  )}
                  
                  <Button variant="outline" fullWidth>
                    <Icon name="Heart" size={16} className="mr-2" />
                    Add to Wishlist
                  </Button>
                </div>

                {/* Course Includes */}
                <div className="space-y-3">
                  <h4 className="font-body font-semibold text-text-primary">
                    This course includes:
                  </h4>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li className="flex items-center space-x-2">
                      <Icon name="Video" size={16} className="text-primary" />
                      <span>{course?.videoHours} hours of video content</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Icon name="FileText" size={16} className="text-primary" />
                      <span>{course?.resources} downloadable resources</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Icon name="Award" size={16} className="text-primary" />
                      <span>Certificate of completion</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Icon name="Smartphone" size={16} className="text-primary" />
                      <span>Access on mobile and desktop</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Icon name="Clock" size={16} className="text-primary" />
                      <span>Lifetime access</span>
                    </li>
                  </ul>
                </div>

                {/* Money Back Guarantee */}
                <div className="flex items-center space-x-2 p-3 bg-success/5 border border-success/20 rounded-lg">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span className="text-sm text-success font-medium">
                    7-day money-back guarantee
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHero;