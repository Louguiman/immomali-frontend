import React from "react";

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
// }

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxVisiblePages = 5; // Number of visible pages before showing "..."
  const pageNumbers = [];

  if (totalPages <= maxVisiblePages) {
    // Show all pages if total pages are within the limit
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    // Always include the first page
    pageNumbers.push(1);

    // Add ellipsis before the middle pages if currentPage is far from the start
    if (currentPage > 3) {
      pageNumbers.push("...");
    }

    // Show a range of pages around the currentPage
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Add ellipsis after the middle pages if currentPage is far from the end
    if (currentPage < totalPages - 2) {
      pageNumbers.push("...");
    }

    // Always include the last page
    pageNumbers.push(totalPages);
  }

  return (
    <ul className="page_navigation">
      {/* Previous Button */}
      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
        <button
          className="page-link"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <span className="flaticon-left-arrow"></span>
        </button>
      </li>

      {/* Page Numbers */}
      {pageNumbers.map((page, index) => (
        <li
          key={index}
          className={`page-item ${page === currentPage ? "active" : ""} ${
            typeof page === "string" ? "disabled" : ""
          }`}
        >
          {typeof page === "number" ? (
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          ) : (
            <span className="page-link">{page}</span>
          )}
        </li>
      ))}

      {/* Next Button */}
      <li
        className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
      >
        <button
          className="page-link"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <span className="flaticon-right-arrow"></span>
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
