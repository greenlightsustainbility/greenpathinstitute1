import React, { useState, useEffect, useRef } from 'react';
import Input from './Input.jsx';
import Icon from '../AppIcon.jsx';
import Button from './Button.jsx';

const SearchBar = ({ 
  onSearch, 
  placeholder = "Search courses...", 
  className = '',
  showFilters = false,
  expanded = false 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const debounceRef = useRef(null);

  const mockSuggestions = [
    'ESG Fundamentals',
    'Sustainability Reporting',
    'Carbon Accounting',
    'Green Finance',
    'Environmental Management',
    'Social Impact Assessment',
    'Corporate Governance',
    'Climate Risk Management',
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchQuery(value);

    // Clear previous debounce
    if (debounceRef?.current) {
      clearTimeout(debounceRef?.current);
    }

    // Debounce search
    debounceRef.current = setTimeout(() => {
      if (value?.trim()) {
        const filtered = mockSuggestions?.filter(suggestion =>
          suggestion?.toLowerCase()?.includes(value?.toLowerCase())
        );
        setSuggestions(filtered);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }

      if (onSearch) {
        onSearch(value);
      }
    }, 300);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    if (onSearch) {
      onSearch(suggestion);
    }
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    setShowSuggestions(false);
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    if (onSearch) {
      onSearch('');
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="relative">
          {/* Mobile Search Toggle */}
          <div className="lg:hidden">
            {!isExpanded ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                iconName="Search"
                onClick={toggleExpanded}
              />
            ) : (
              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <Input
                    type="search"
                    placeholder={placeholder}
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
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={toggleExpanded}
                />
              </div>
            )}
          </div>

          {/* Desktop Search */}
          <div className="hidden lg:block">
            <Input
              type="search"
              placeholder={placeholder}
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
          </div>
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
      </form>
      {/* Filters Section */}
      {showFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="outline" size="sm" iconName="Filter">
            All Categories
          </Button>
          <Button variant="outline" size="sm">
            Beginner
          </Button>
          <Button variant="outline" size="sm">
            Intermediate
          </Button>
          <Button variant="outline" size="sm">
            Advanced
          </Button>
          <Button variant="outline" size="sm">
            Certified
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;