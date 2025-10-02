import React, { useState, useRef, useEffect } from 'react';
import Input from '../../../components/ui/Input.jsx';
import Select from '../../../components/ui/select.jsx';
import Button from '../../../components/ui/Button.jsx';
import Icon from '../../../components/AppIcon.jsx';

const SearchAndSort = ({ 
  searchQuery, 
  onSearchChange, 
  sortBy, 
  onSortChange, 
  className = '' 
}) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const debounceRef = useRef(null);

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'duration-short', label: 'Duration: Short to Long' },
    { value: 'duration-long', label: 'Duration: Long to Short' }
  ];

  const mockSuggestions = [
    'ESG Fundamentals',
    'Sustainability Reporting',
    'Carbon Accounting',
    'Green Finance',
    'Environmental Management',
    'Social Impact Assessment',
    'Corporate Governance',
    'Climate Risk Management',
    'Renewable Energy',
    'Circular Economy',
    'Biodiversity Conservation',
    'Water Management',
    'Waste Management',
    'Supply Chain Sustainability'
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setShowSuggestions(false);
        setIsSearchExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    onSearchChange(value);

    // Clear previous debounce
    if (debounceRef?.current) {
      clearTimeout(debounceRef?.current);
    }

    // Debounce search suggestions
    debounceRef.current = setTimeout(() => {
      if (value?.trim()) {
        const filtered = mockSuggestions?.filter(suggestion =>
          suggestion?.toLowerCase()?.includes(value?.toLowerCase())
        );
        setSuggestions(filtered?.slice(0, 8)); // Limit to 8 suggestions
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);
  };

  const handleSuggestionClick = (suggestion) => {
    onSearchChange(suggestion);
    setShowSuggestions(false);
    setIsSearchExpanded(false);
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    setShowSuggestions(false);
    setIsSearchExpanded(false);
  };

  const handleClearSearch = () => {
    onSearchChange('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const toggleSearchExpanded = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        
        {/* Search Section */}
        <div className="flex-1 max-w-2xl" ref={searchRef}>
          {/* Mobile Search Toggle */}
          <div className="lg:hidden">
            {!isSearchExpanded ? (
              <div className="flex items-center justify-between">
                <h2 className="font-heading font-semibold text-lg">
                  Browse Courses
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Search"
                  onClick={toggleSearchExpanded}
                />
              </div>
            ) : (
              <form onSubmit={handleSearchSubmit} className="relative">
                <Input
                  type="search"
                  placeholder="Search ESG and sustainability courses..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pr-20"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-1">
                  {searchQuery && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      iconName="X"
                      onClick={handleClearSearch}
                    />
                  )}
                  <Button
                    type="submit"
                    variant="ghost"
                    size="sm"
                    iconName="Search"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    iconName="X"
                    onClick={toggleSearchExpanded}
                  />
                </div>
              </form>
            )}
          </div>

          {/* Desktop Search */}
          <div className="hidden lg:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Input
                type="search"
                placeholder="Search ESG and sustainability courses..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pr-20"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-1">
                {searchQuery && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    iconName="X"
                    onClick={handleClearSearch}
                  />
                )}
                <Button
                  type="submit"
                  variant="ghost"
                  size="sm"
                  iconName="Search"
                />
              </div>
            </form>
          </div>

          {/* Search Suggestions */}
          {showSuggestions && suggestions?.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-elevation-md z-50 max-h-60 overflow-y-auto">
              {suggestions?.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  className="w-full text-left px-4 py-3 hover:bg-muted transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg flex items-center space-x-3"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <Icon name="Search" size={16} className="text-text-secondary" />
                  <span className="font-body text-sm text-popover-foreground">
                    {suggestion}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sort Section */}
        <div className="flex items-center space-x-4">
          <div className="hidden lg:block">
            <span className="font-body text-sm text-text-secondary whitespace-nowrap">
              Sort by:
            </span>
          </div>
          <div className="w-full lg:w-48">
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={onSortChange}
              placeholder="Sort by"
              className="w-full"
            />
          </div>
        </div>
      </div>
      {/* Quick Filter Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          iconName="Zap"
          iconPosition="left"
          onClick={() => onSearchChange('ESG Fundamentals')}
        >
          ESG Basics
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="FileText"
          iconPosition="left"
          onClick={() => onSearchChange('Sustainability Reporting')}
        >
          Reporting
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="Leaf"
          iconPosition="left"
          onClick={() => onSearchChange('Carbon Accounting')}
        >
          Carbon
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="DollarSign"
          iconPosition="left"
          onClick={() => onSearchChange('Green Finance')}
        >
          Finance
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="Award"
          iconPosition="left"
          onClick={() => onSortChange('rating')}
        >
          Top Rated
        </Button>
      </div>
    </div>
  );
};

export default SearchAndSort;