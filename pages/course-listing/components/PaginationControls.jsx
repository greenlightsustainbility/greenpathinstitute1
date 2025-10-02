import React from 'react';
import Button from '../../../components/ui/Button.jsx';


const PaginationControls = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  totalItems = 0,
  itemsPerPage = 12,
  className = '' 
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range?.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots?.push(1, '...');
    } else {
      rangeWithDots?.push(1);
    }

    rangeWithDots?.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots?.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots?.push(totalPages);
    }

    return rangeWithDots;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    if (typeof page === 'number' && page !== currentPage) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 ${className}`}>
      {/* Results Info */}
      <div className="text-sm text-text-secondary">
        Showing {startItem} to {endItem} of {totalItems} courses
      </div>
      {/* Pagination Controls */}
      <div className="flex items-center space-x-2">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="sm"
          iconName="ChevronLeft"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-3"
        />

        {/* Page Numbers */}
        <div className="hidden sm:flex items-center space-x-1">
          {getVisiblePages()?.map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="px-3 py-2 text-text-secondary">...</span>
              ) : (
                <Button
                  variant={page === currentPage ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => handlePageClick(page)}
                  className="px-3 py-2 min-w-[40px]"
                >
                  {page}
                </Button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile Page Info */}
        <div className="sm:hidden flex items-center space-x-2">
          <span className="text-sm text-text-secondary">
            Page {currentPage} of {totalPages}
          </span>
        </div>

        {/* Next Button */}
        <Button
          variant="outline"
          size="sm"
          iconName="ChevronRight"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-3"
        />
      </div>
      {/* Jump to Page (Desktop only) */}
      <div className="hidden lg:flex items-center space-x-2">
        <span className="text-sm text-text-secondary whitespace-nowrap">
          Go to page:
        </span>
        <select
          value={currentPage}
          onChange={(e) => onPageChange(parseInt(e?.target?.value))}
          className="px-2 py-1 border border-border rounded text-sm bg-background"
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1)?.map(page => (
            <option key={page} value={page}>
              {page}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PaginationControls;