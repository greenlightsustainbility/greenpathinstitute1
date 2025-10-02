import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage.jsx';
import Icon from '../../../components/AppIcon.jsx';
import Button from '../../../components/ui/Button.jsx';

const CourseBundleCard = ({ bundle, selectedCurrency = 'USD' }) => {
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

  const calculateSavings = () => {
    const totalIndividualPrice = bundle?.courses?.reduce((sum, course) => sum + course?.price, 0);
    const savings = totalIndividualPrice - bundle?.bundlePrice;
    const savingsPercentage = Math.round((savings / totalIndividualPrice) * 100);
    return { savings, savingsPercentage };
  };

  const { savings, savingsPercentage } = calculateSavings();

  return (
    <div className="bg-card border-2 border-accent rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 relative">
      {/* Bundle Badge */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
          <Icon name="Package" size={16} />
          <span>BUNDLE</span>
        </div>
      </div>
      {/* Savings Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-success text-success-foreground px-3 py-1 rounded-full text-sm font-bold">
          Save {savingsPercentage}%
        </div>
      </div>
      {/* Bundle Header */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <div className="text-center text-white">
            <Icon name="Package" size={48} className="mx-auto mb-2" />
            <h3 className="font-heading font-bold text-xl mb-1">{bundle?.title}</h3>
            <p className="text-sm opacity-90">{bundle?.courses?.length} Courses Included</p>
          </div>
        </div>
      </div>
      {/* Bundle Content */}
      <div className="p-6">
        {/* Bundle Description */}
        <p className="text-text-secondary mb-4 line-clamp-2">
          {bundle?.description}
        </p>

        {/* Course List */}
        <div className="mb-4">
          <h4 className="font-body font-semibold text-sm text-card-foreground mb-3">
            Included Courses:
          </h4>
          <div className="space-y-2">
            {bundle?.courses?.slice(0, 3)?.map((course, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 bg-muted rounded-md">
                <Image
                  src={course?.thumbnail}
                  alt={course?.title}
                  className="w-12 h-8 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-body font-medium text-sm text-card-foreground truncate">
                    {course?.title}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {course?.duration} • {course?.level}
                  </p>
                </div>
                <span className="text-xs text-text-secondary">
                  {formatCurrency(course?.price, selectedCurrency)}
                </span>
              </div>
            ))}
            {bundle?.courses?.length > 3 && (
              <div className="text-center py-2">
                <span className="text-sm text-text-secondary">
                  +{bundle?.courses?.length - 3} more courses
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Bundle Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
          <div>
            <div className="text-lg font-bold text-card-foreground">
              {bundle?.totalDuration}
            </div>
            <div className="text-xs text-text-secondary">Total Duration</div>
          </div>
          <div>
            <div className="text-lg font-bold text-card-foreground">
              {bundle?.totalLessons}
            </div>
            <div className="text-xs text-text-secondary">Total Lessons</div>
          </div>
          <div>
            <div className="text-lg font-bold text-card-foreground flex items-center justify-center">
              <Icon name="Star" size={16} className="text-yellow-500 mr-1" />
              {bundle?.averageRating}
            </div>
            <div className="text-xs text-text-secondary">Avg Rating</div>
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-2xl font-bold text-card-foreground">
                {formatCurrency(bundle?.bundlePrice, selectedCurrency)}
              </div>
              {selectedCurrency !== 'USD' && (
                <div className="text-sm text-text-secondary">
                  ({formatCurrency(bundle?.bundlePrice, 'USD')})
                </div>
              )}
            </div>
            <div className="text-right">
              <div className="text-sm text-text-secondary line-through">
                {formatCurrency(bundle?.courses?.reduce((sum, course) => sum + course?.price, 0), selectedCurrency)}
              </div>
              <div className="text-sm font-medium text-success">
                Save {formatCurrency(savings, selectedCurrency)}
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center space-x-1 text-xs text-text-secondary">
              <Icon name="Award" size={14} />
              <span>Certificates</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-text-secondary">
              <Icon name="Clock" size={14} />
              <span>Lifetime Access</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-text-secondary">
              <Icon name="Download" size={14} />
              <span>Resources</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-text-secondary">
              <Icon name="Users" size={14} />
              <span>Community</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="default"
            size="sm"
            fullWidth
            iconName="ShoppingCart"
            iconPosition="left"
            onClick={() => window.location.href = `/checkout-flow?bundleId=${bundle?.id}`}
          >
            Enroll in Bundle
          </Button>
          <Link to={`/course-detail?bundleId=${bundle?.id}`}>
            <Button
              variant="outline"
              size="sm"
              iconName="Eye"
              className="px-3"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseBundleCard;