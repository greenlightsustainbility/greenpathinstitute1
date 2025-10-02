import React, { useState } from 'react';
import Select from '../../../components/ui/select.jsx';
import { Checkbox } from '../../../components/ui/Checkbox.jsx';
import Button from '../../../components/ui/Button.jsx';
import Icon from '../../../components/AppIcon.jsx';

const FilterPanel = ({ 
  filters, 
  onFiltersChange, 
  isOpen, 
  onToggle, 
  courseCount = 0,
  className = '' 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'esg-fundamentals', label: 'ESG Fundamentals' },
    { value: 'sustainability-reporting', label: 'Sustainability Reporting' },
    { value: 'carbon-accounting', label: 'Carbon Accounting' },
    { value: 'green-finance', label: 'Green Finance' },
    { value: 'environmental-management', label: 'Environmental Management' },
    { value: 'social-impact', label: 'Social Impact Assessment' },
    { value: 'corporate-governance', label: 'Corporate Governance' },
    { value: 'climate-risk', label: 'Climate Risk Management' }
  ];

  const levelOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const priceRanges = [
    { id: 'free', label: 'Free', min: 0, max: 0 },
    { id: 'under-100', label: 'Under $100', min: 0, max: 100 },
    { id: '100-300', label: '$100 - $300', min: 100, max: 300 },
    { id: '300-500', label: '$300 - $500', min: 300, max: 500 },
    { id: 'over-500', label: 'Over $500', min: 500, max: 999999 }
  ];

  const features = [
    { id: 'certificate', label: 'Certificate Included' },
    { id: 'video', label: 'Video Content' },
    { id: 'quiz', label: 'Interactive Quizzes' },
    { id: 'downloadable', label: 'Downloadable Resources' },
    { id: 'mobile', label: 'Mobile Friendly' },
    { id: 'lifetime', label: 'Lifetime Access' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handlePriceRangeChange = (rangeId, checked) => {
    const currentRanges = localFilters?.priceRanges || [];
    const newRanges = checked 
      ? [...currentRanges, rangeId]
      : currentRanges?.filter(id => id !== rangeId);
    
    handleFilterChange('priceRanges', newRanges);
  };

  const handleFeatureChange = (featureId, checked) => {
    const currentFeatures = localFilters?.features || [];
    const newFeatures = checked 
      ? [...currentFeatures, featureId]
      : currentFeatures?.filter(id => id !== featureId);
    
    handleFilterChange('features', newFeatures);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      category: 'all',
      level: 'all',
      priceRanges: [],
      features: []
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters?.category && localFilters?.category !== 'all') count++;
    if (localFilters?.level && localFilters?.level !== 'all') count++;
    if (localFilters?.priceRanges && localFilters?.priceRanges?.length > 0) count++;
    if (localFilters?.features && localFilters?.features?.length > 0) count++;
    return count;
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} />
          <h3 className="font-heading font-semibold text-lg">Filters</h3>
          {getActiveFilterCount() > 0 && (
            <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
              {getActiveFilterCount()}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary">
            {courseCount} courses
          </span>
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-xs"
            >
              Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <Select
          label="Category"
          options={categoryOptions}
          value={localFilters?.category || 'all'}
          onChange={(value) => handleFilterChange('category', value)}
          className="w-full"
        />
      </div>

      {/* Level Filter */}
      <div>
        <Select
          label="Difficulty Level"
          options={levelOptions}
          value={localFilters?.level || 'all'}
          onChange={(value) => handleFilterChange('level', value)}
          className="w-full"
        />
      </div>

      {/* Price Range Filter */}
      <div>
        <h4 className="font-body font-medium text-sm text-card-foreground mb-3">
          Price Range
        </h4>
        <div className="space-y-2">
          {priceRanges?.map((range) => (
            <Checkbox
              key={range?.id}
              label={range?.label}
              checked={(localFilters?.priceRanges || [])?.includes(range?.id)}
              onChange={(e) => handlePriceRangeChange(range?.id, e?.target?.checked)}
              size="sm"
            />
          ))}
        </div>
      </div>

      {/* Features Filter */}
      <div>
        <h4 className="font-body font-medium text-sm text-card-foreground mb-3">
          Course Features
        </h4>
        <div className="space-y-2">
          {features?.map((feature) => (
            <Checkbox
              key={feature?.id}
              label={feature?.label}
              checked={(localFilters?.features || [])?.includes(feature?.id)}
              onChange={(e) => handleFeatureChange(feature?.id, e?.target?.checked)}
              size="sm"
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filter Panel */}
      <div className={`hidden lg:block ${className}`}>
        <div className="bg-card border border-border rounded-lg p-6">
          <FilterContent />
        </div>
      </div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          onClick={onToggle}
          iconName="Filter"
          iconPosition="left"
          className="w-full sm:w-auto"
        >
          Filters
          {getActiveFilterCount() > 0 && (
            <span className="ml-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs">
              {getActiveFilterCount()}
            </span>
          )}
        </Button>
      </div>

      {/* Mobile Filter Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-background border-l border-border overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading font-semibold text-lg">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={onToggle}
                />
              </div>
              <FilterContent />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterPanel;