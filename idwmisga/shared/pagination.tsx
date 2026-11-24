type PaginationProps = {
  currentPage: number;
  totalPage: number;
  onChangePage: (page: number) => void;
};

function Pagination({ currentPage, totalPage, onChangePage }: PaginationProps) {
  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => onChangePage(currentPage - 1)}>
            Précédent
          </button>
        </li>

        {pages.map((p) => (
          <li key={p} className={`page-item ${currentPage === p ? "active" : ""}`}>
            <button className="page-link" onClick={() => onChangePage(p)}>
              {p}
            </button>
          </li>
        ))}

        <li className={`page-item ${currentPage === totalPage ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => onChangePage(currentPage + 1)}>
            Suivant
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;