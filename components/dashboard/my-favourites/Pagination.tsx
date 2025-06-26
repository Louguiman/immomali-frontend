import React, { useCallback } from "react";
import { useTranslations } from "next-intl";

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  maxVisiblePages?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  totalItems,
  itemsPerPage,
  maxVisiblePages = 5,
}) => {
  const t = useTranslations("pagination");
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevious = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }, [currentPage, onPageChange]);

  const handleNext = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }, [currentPage, totalPages, onPageChange]);

  const handlePageClick = useCallback((page: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    onPageChange(page);
  }, [onPageChange]);

  // Generate page numbers with ellipses
  const getPageNumbers = useCallback(() => {
    const pages: (number | '...')[] = [];
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate start and end of the middle section
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if we're near the start or end
      if (currentPage <= 3) {
        endPage = 4;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
      }
      
      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pages.push('...');
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        if (i > 1 && i < totalPages) {
          pages.push(i);
        }
      }
      
      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      
      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  }, [currentPage, totalPages, maxVisiblePages]);

  if (totalPages <= 1) {
    return null; // Don't show pagination if there's only one page
  }

  // Previous button disabled state
  const isPreviousDisabled = currentPage === 1;
  // Next button disabled state
  const isNextDisabled = currentPage === totalPages;

  // Render previous button
  const renderPreviousButton = () => {
    if (isPreviousDisabled) {
      return (
        <li className="page-item disabled">
          <span className="page-link" aria-label={t("previous")}>
            <span className="flaticon-left-arrow" aria-hidden="true"></span>
            <span className="visually-hidden">{t("previous")}</span>
          </span>
        </li>
      );
    }
    
    return (
      <li className="page-item">
        <a
          className="page-link"
          href="#"
          onClick={handlePrevious}
          aria-label={t("previous")}
        >
          <span className="flaticon-left-arrow" aria-hidden="true"></span>
          <span className="visually-hidden">{t("previous")}</span>
        </a>
      </li>
    );
  };

  // Render next button
  const renderNextButton = () => {
    if (isNextDisabled) {
      return (
        <li className="page-item disabled">
          <span className="page-link" aria-label={t("next")}>
            <span className="flaticon-right-arrow" aria-hidden="true"></span>
            <span className="visually-hidden">{t("next")}</span>
          </span>
        </li>
      );
    }
    
    return (
      <li className="page-item">
        <a
          className="page-link"
          href="#"
          onClick={handleNext}
          aria-label={t("next")}
        >
          <span className="flaticon-right-arrow" aria-hidden="true"></span>
          <span className="visually-hidden">{t("next")}</span>
        </a>
      </li>
    );
  };

  return (
    <nav aria-label={t("pagination")}>
      <ul className="page_navigation">
        {renderPreviousButton()}
        
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <li key={`ellipsis-${index}`} className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            );
          }
          
          const isCurrent = currentPage === page;
          return (
            <li
              key={`page-${page}`}
              className={`page-item ${isCurrent ? "active" : ""}`}
              aria-current={isCurrent ? "page" : undefined}
            >
              <a
                className="page-link"
                href="#"
                onClick={handlePageClick(page as number)}
                aria-label={`${t("page")} ${page}${isCurrent ? `, ${t("current")}` : ''}`}
              >
                {page}
              </a>
            </li>
          );
        })}
        
        {renderNextButton()}
      </ul>
    </nav>
  );
};
