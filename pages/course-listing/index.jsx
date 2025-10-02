import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header.jsx';
import Breadcrumbs from '../../components/ui/Breadcrumbs.jsx';
import CurrencySelector from '../../components/ui/CurrencySelector.jsx';
import CourseCard from './components/CourseCard.jsx';
import CourseBundleCard from './components/CourseBundleCard.jsx';
import FilterPanel from './components/FilterPanel.jsx';
import SearchAndSort from './components/SearchAndSort.jsx';
import PaginationControls from './components/PaginationControls.jsx';
import Button from '../../components/ui/Button.jsx';
import Icon from '../../components/AppIcon.jsx';

const CourseListingPage = () => {
  const [courses, setCourses] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filteredBundles, setFilteredBundles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [viewMode, setViewMode] = useState('all'); // 'all', 'courses', 'bundles'
  const [filters, setFilters] = useState({
    category: 'all',
    level: 'all',
    priceRanges: [],
    features: []
  });

  const itemsPerPage = 12;

  // Mock course data
  const mockCourses = [
    {
      id: 1,
      title: "ESG Fundamentals for Professionals",
      description: "Comprehensive introduction to Environmental, Social, and Governance principles for modern business practices.",
      thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop",
      category: "esg-fundamentals",
      level: "Beginner",
      duration: "8 hours",
      lessonsCount: 24,
      enrolledCount: 1247,
      rating: 4.8,
      instructor: {
        name: "Dr. Sarah Johnson",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg"
      },
      pricing: {
        individual: 199,
        originalPrice: 299,
        discount: 33
      },
      isBundle: false
    },
    {
      id: 2,
      title: "Advanced Sustainability Reporting",
      description: "Master the art of creating comprehensive sustainability reports that meet international standards and stakeholder expectations.",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      category: "sustainability-reporting",
      level: "Advanced",
      duration: "12 hours",
      lessonsCount: 36,
      enrolledCount: 892,
      rating: 4.9,
      instructor: {
        name: "Prof. Michael Chen",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg"
      },
      pricing: {
        individual: 349,
        originalPrice: 449,
        discount: 22
      },
      isBundle: false
    },
    {
      id: 3,
      title: "Carbon Accounting & Management",
      description: "Learn to measure, track, and reduce carbon footprints across organizations with practical tools and methodologies.",
      thumbnail: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=400&h=250&fit=crop",
      category: "carbon-accounting",
      level: "Intermediate",
      duration: "10 hours",
      lessonsCount: 30,
      enrolledCount: 1156,
      rating: 4.7,
      instructor: {
        name: "Dr. Emily Rodriguez",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg"
      },
      pricing: {
        individual: 279,
        originalPrice: 379,
        discount: 26
      },
      isBundle: false
    },
    {
      id: 4,
      title: "Green Finance & Investment",
      description: "Explore sustainable finance instruments, green bonds, and ESG investment strategies for the modern financial landscape.",
      thumbnail: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=250&fit=crop",
      category: "green-finance",
      level: "Intermediate",
      duration: "14 hours",
      lessonsCount: 42,
      enrolledCount: 743,
      rating: 4.6,
      instructor: {
        name: "James Thompson",
        avatar: "https://randomuser.me/api/portraits/men/52.jpg"
      },
      pricing: {
        individual: 399,
        originalPrice: 499,
        discount: 20
      },
      isBundle: false
    },
    {
      id: 5,
      title: "Environmental Management Systems",
      description: "Implement and manage ISO 14001 environmental management systems for organizational sustainability.",
      thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop",
      category: "environmental-management",
      level: "Advanced",
      duration: "16 hours",
      lessonsCount: 48,
      enrolledCount: 634,
      rating: 4.8,
      instructor: {
        name: "Dr. Lisa Anderson",
        avatar: "https://randomuser.me/api/portraits/women/41.jpg"
      },
      pricing: {
        individual: 449,
        originalPrice: 599,
        discount: 25
      },
      isBundle: false
    },
    {
      id: 6,
      title: "Social Impact Assessment",
      description: "Evaluate and measure social impacts of business operations with comprehensive assessment frameworks.",
      thumbnail: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=250&fit=crop",
      category: "social-impact",
      level: "Intermediate",
      duration: "9 hours",
      lessonsCount: 27,
      enrolledCount: 521,
      rating: 4.5,
      instructor: {
        name: "Dr. Robert Kim",
        avatar: "https://randomuser.me/api/portraits/men/38.jpg"
      },
      pricing: {
        individual: 249,
        originalPrice: 329,
        discount: 24
      },
      isBundle: false
    }
  ];

  // Mock bundle data
  const mockBundles = [
    {
      id: 1,
      title: "Complete ESG Professional Certification",
      description: "Master all aspects of ESG with our comprehensive bundle covering fundamentals, reporting, and advanced practices.",
      bundlePrice: 799,
      totalDuration: "45 hours",
      totalLessons: 135,
      averageRating: 4.8,
      courses: [
        { title: "ESG Fundamentals for Professionals", price: 199, duration: "8 hours", level: "Beginner", thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=100&h=60&fit=crop" },
        { title: "Advanced Sustainability Reporting", price: 349, duration: "12 hours", level: "Advanced", thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=60&fit=crop" },
        { title: "Carbon Accounting & Management", price: 279, duration: "10 hours", level: "Intermediate", thumbnail: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=100&h=60&fit=crop" },
        { title: "Green Finance & Investment", price: 399, duration: "14 hours", level: "Intermediate", thumbnail: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=100&h=60&fit=crop" }
      ]
    },
    {
      id: 2,
      title: "Environmental Leadership Bundle",
      description: "Become an environmental leader with specialized courses in management systems and impact assessment.",
      bundlePrice: 599,
      totalDuration: "25 hours",
      totalLessons: 75,
      averageRating: 4.7,
      courses: [
        { title: "Environmental Management Systems", price: 449, duration: "16 hours", level: "Advanced", thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=60&fit=crop" },
        { title: "Social Impact Assessment", price: 249, duration: "9 hours", level: "Intermediate", thumbnail: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=100&h=60&fit=crop" }
      ]
    }
  ];

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      setCourses(mockCourses);
      setBundles(mockBundles);
      setLoading(false);
    }, 1000);

    // Get saved currency
    const savedCurrency = localStorage.getItem('selectedCurrency');
    if (savedCurrency) {
      setSelectedCurrency(savedCurrency);
    }

    // Listen for currency changes
    const handleCurrencyChange = (event) => {
      setSelectedCurrency(event?.detail?.currency);
    };

    window.addEventListener('currencyChanged', handleCurrencyChange);
    return () => window.removeEventListener('currencyChanged', handleCurrencyChange);
  }, []);

  useEffect(() => {
    // Filter and sort courses
    let filtered = [...courses];
    let filteredBundlesData = [...bundles];

    // Apply search filter
    if (searchQuery?.trim()) {
      filtered = filtered?.filter(course =>
        course?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        course?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        course?.category?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
      
      filteredBundlesData = filteredBundlesData?.filter(bundle =>
        bundle?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        bundle?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply category filter
    if (filters?.category && filters?.category !== 'all') {
      filtered = filtered?.filter(course => course?.category === filters?.category);
    }

    // Apply level filter
    if (filters?.level && filters?.level !== 'all') {
      filtered = filtered?.filter(course => course?.level?.toLowerCase() === filters?.level);
    }

    // Apply price range filters
    if (filters?.priceRanges && filters?.priceRanges?.length > 0) {
      filtered = filtered?.filter(course => {
        return filters?.priceRanges?.some(rangeId => {
          switch (rangeId) {
            case 'free': return course?.pricing?.individual === 0;
            case 'under-100': return course?.pricing?.individual < 100;
            case '100-300': return course?.pricing?.individual >= 100 && course?.pricing?.individual <= 300;
            case '300-500': return course?.pricing?.individual >= 300 && course?.pricing?.individual <= 500;
            case 'over-500': return course?.pricing?.individual > 500;
            default: return true;
          }
        });
      });
    }

    // Apply sorting
    const sortCourses = (coursesToSort) => {
      switch (sortBy) {
        case 'price-low':
          return coursesToSort?.sort((a, b) => a?.pricing?.individual - b?.pricing?.individual);
        case 'price-high':
          return coursesToSort?.sort((a, b) => b?.pricing?.individual - a?.pricing?.individual);
        case 'rating':
          return coursesToSort?.sort((a, b) => b?.rating - a?.rating);
        case 'popular':
          return coursesToSort?.sort((a, b) => b?.enrolledCount - a?.enrolledCount);
        case 'newest':
          return coursesToSort?.sort((a, b) => b?.id - a?.id);
        case 'duration-short':
          return coursesToSort?.sort((a, b) => parseInt(a?.duration) - parseInt(b?.duration));
        case 'duration-long':
          return coursesToSort?.sort((a, b) => parseInt(b?.duration) - parseInt(a?.duration));
        default:
          return coursesToSort;
      }
    };

    setFilteredCourses(sortCourses(filtered));
    setFilteredBundles(filteredBundlesData);
    setCurrentPage(1);
  }, [courses, bundles, searchQuery, filters, sortBy]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFilterPanel = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
  };

  // Get items to display based on view mode
  const getDisplayItems = () => {
    let items = [];
    
    if (viewMode === 'all' || viewMode === 'bundles') {
      items = [...items, ...filteredBundles?.map(bundle => ({ ...bundle, type: 'bundle' }))];
    }
    
    if (viewMode === 'all' || viewMode === 'courses') {
      items = [...items, ...filteredCourses?.map(course => ({ ...course, type: 'course' }))];
    }
    
    return items;
  };

  const displayItems = getDisplayItems();
  const totalItems = displayItems?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = displayItems?.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Icon name="Loader2" size={32} className="animate-spin mx-auto mb-4 text-primary" />
                <p className="text-text-secondary">Loading courses...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>ESG & Sustainability Courses - GreenPath Institute</title>
        <meta name="description" content="Discover comprehensive ESG and sustainability courses for African professionals. Search, filter, and enroll in certified programs with multi-currency support." />
        <meta name="keywords" content="ESG courses, sustainability training, environmental management, carbon accounting, green finance, Africa" />
      </Helmet>
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <Breadcrumbs />
          </div>

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-2">
                  ESG & Sustainability Courses
                </h1>
                <p className="text-text-secondary text-lg">
                  Advance your career with certified ESG and sustainability education
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <CurrencySelector className="w-40" />
              </div>
            </div>
          </div>

          {/* Search and Sort */}
          <div className="mb-6">
            <SearchAndSort
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              sortBy={sortBy}
              onSortChange={handleSortChange}
            />
          </div>

          {/* View Mode Toggle */}
          <div className="mb-6">
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('all')}
              >
                All ({totalItems})
              </Button>
              <Button
                variant={viewMode === 'courses' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('courses')}
              >
                Courses ({filteredCourses?.length})
              </Button>
              <Button
                variant={viewMode === 'bundles' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('bundles')}
              >
                Bundles ({filteredBundles?.length})
              </Button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Panel */}
            <div className="lg:w-80 flex-shrink-0">
              <FilterPanel
                filters={filters}
                onFiltersChange={handleFiltersChange}
                isOpen={isFilterPanelOpen}
                onToggle={toggleFilterPanel}
                courseCount={totalItems}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm text-text-secondary">
                  {totalItems > 0 ? (
                    `Showing ${startIndex + 1}-${Math.min(endIndex, totalItems)} of ${totalItems} results`
                  ) : (
                    'No results found'
                  )}
                </div>
                <div className="hidden lg:flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Grid3X3"
                    className="px-3"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="List"
                    className="px-3"
                  />
                </div>
              </div>

              {/* Course Grid */}
              {currentItems?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {currentItems?.map((item) => (
                    <React.Fragment key={`${item?.type}-${item?.id}`}>
                      {item?.type === 'bundle' ? (
                        <CourseBundleCard
                          bundle={item}
                          selectedCurrency={selectedCurrency}
                        />
                      ) : (
                        <CourseCard
                          course={item}
                          selectedCurrency={selectedCurrency}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="mx-auto mb-4 text-text-secondary opacity-50" />
                  <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                    No courses found
                  </h3>
                  <p className="text-text-secondary mb-4">
                    Try adjusting your search criteria or filters
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setFilters({
                        category: 'all',
                        level: 'all',
                        priceRanges: [],
                        features: []
                      });
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseListingPage;