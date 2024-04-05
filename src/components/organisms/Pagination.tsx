import React from 'react';

type PaginationProps = {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (pageNumber: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const page_numbers = totalPages
    ? Array.from({ length: totalPages }, (_, i) => i + 1)
    : [];

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        Página {currentPage} de {totalPages}
      </div>
      <div className="pagination-pages">
        {page_numbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={
              pageNumber === currentPage
                ? 'pagination-button-active'
                : 'pagination-button'
            }
            onClick={() => onPageChange && onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
