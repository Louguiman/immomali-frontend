import React from "react";
export const Pagination = ({
  currentPage,
  onPageChange,
  totalItems,
  itemsPerPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

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

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="page_navigation">
      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
        <a className="page-link" href="#" onClick={handlePrevious}>
          <span className="flaticon-left-arrow"></span>
        </a>
      </li>
      {pageNumbers.map((page) => (
        <li
          key={page}
          className={`page-item ${currentPage === page ? "active" : ""}`}
        >
          <a className="page-link" href="#" onClick={() => onPageChange(page)}>
            {page}
          </a>
        </li>
      ))}
      <li
        className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
      >
        <a className="page-link" href="#" onClick={handleNext}>
          <span className="flaticon-right-arrow"></span>
        </a>
      </li>
    </ul>
  );
};
