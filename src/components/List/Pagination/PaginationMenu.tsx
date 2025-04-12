import React from 'react';

interface PaginationProps {
  page: number; // índice base 0
  setPage: (page: number) => void;
  totalPages: number; // total de páginas (ej. 5 significa índices del 0 al 4)
}

function PaginationMenu({ page, setPage, totalPages }: PaginationProps) {
  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
  
    let startPage = Math.max(0, page - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow;
  
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(0, endPage - maxPagesToShow);
    }
  
    for (let i = startPage; i < endPage; i++) {
      pages.push(
        <li key={i} className={`page-item ${page === i ? 'active' : ''}`}>
          <button className="page-link" onClick={() => setPage(i)}>
            {i + 1}
          </button>
        </li>
      );
    }
  
    return pages;
  };  

  return (
    <nav aria-label="Page navigation example" style={{ display: 'flex', justifyContent: 'center' }}>
      <ul className="pagination">
        {/* Primera página */}
        <li className={`page-item ${page === 0 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => setPage(0)} aria-label="First">
            &laquo;&laquo;
          </button>
        </li>

        {/* Página anterior */}
        <li className={`page-item ${page === 0 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => setPage(page - 1)} aria-label="Previous">
            &laquo;
          </button>
        </li>

        {/* Números de página */}
        {renderPageNumbers()}

        {/* Página siguiente */}
        <li className={`page-item ${page === totalPages - 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => setPage(page + 1)} aria-label="Next">
            &raquo;
          </button>
        </li>

        {/* Última página */}
        <li className={`page-item ${page === totalPages - 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => setPage(totalPages - 1)} aria-label="Last">
            &raquo;&raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default PaginationMenu;