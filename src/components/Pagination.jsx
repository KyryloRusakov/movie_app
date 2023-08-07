const Pagination = ({ handlePageChange, currentPage, totalPages }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];

    pageNumbers.push(
      <a
        key={1}
        onClick={() => handlePageChange(1)}
        className={
          currentPage === 1 ? 'pagination-link active' : 'pagination-link'
        }
      >
        1
      </a>,
    );

    let startPage = currentPage - 2;
    let endPage = currentPage + 2;

    if (startPage <= 1) {
      startPage = 2;
      endPage = Math.min(startPage + 5, totalPages - 1);
    }

    if (endPage >= totalPages) {
      endPage = totalPages - 1;
      startPage = Math.max(endPage - 5, 2);
    }

    if (startPage > 2) {
      pageNumbers.push(
        <span key="ellipsis-start" className="pagination-ellipsis">
          ...
        </span>,
      );
    }

    for (let page = startPage; page <= endPage; page++) {
      pageNumbers.push(
        <a
          key={page}
          onClick={() => handlePageChange(page)}
          className={
            currentPage === page ? 'pagination-link active' : 'pagination-link'
          }
        >
          {page}
        </a>,
      );
    }

    if (endPage < totalPages - 1) {
      pageNumbers.push(
        <span key="ellipsis-end" className="pagination-ellipsis">
          ...
        </span>,
      );
    }

    if (totalPages > 1) {
      pageNumbers.push(
        <a
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={
            currentPage === totalPages
              ? 'pagination-link active'
              : 'pagination-link'
          }
        >
          {totalPages}
        </a>,
      );
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      <button
        onClick={() => {
          handlePageChange(currentPage - 1);
        }}
        disabled={currentPage === 1}
        className="pagination-link pagination-btn"
      >
        <svg
          viewBox="0 0 24 24"
          fill="#282828"
          className="pagination-icon left"
        >
          <path d="M9.79461 17.2946C9.40534 16.9053 9.405 16.2743 9.79384 15.8846L13.67 12L9.79384 8.11538C9.405 7.72569 9.40534 7.09466 9.79461 6.70538C10.1842 6.31581 10.8158 6.31581 11.2054 6.70538L16.5 12L11.2054 17.2946C10.8158 17.6842 10.1842 17.6842 9.79461 17.2946Z" />
        </svg>
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => {
          handlePageChange(currentPage + 1);
        }}
        disabled={currentPage === totalPages}
        className="pagination-link pagination-btn"
      >
        <svg viewBox="0 0 24 24" fill="#282828" className="pagination-icon">
          <path d="M9.79461 17.2946C9.40534 16.9053 9.405 16.2743 9.79384 15.8846L13.67 12L9.79384 8.11538C9.405 7.72569 9.40534 7.09466 9.79461 6.70538C10.1842 6.31581 10.8158 6.31581 11.2054 6.70538L16.5 12L11.2054 17.2946C10.8158 17.6842 10.1842 17.6842 9.79461 17.2946Z" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
