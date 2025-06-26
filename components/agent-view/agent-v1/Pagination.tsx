import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../../features/agent/agentSlice";

const Pagination = ({ totalItems }) => {
  const dispatch = useDispatch();
  const { page, pageSize } = useSelector((state) => state.agent);
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      dispatch(setPage(newPage));
    }
  };

  if (totalPages <= 1) return null;

  return (
    <nav className="pagination-wrapper">
      <ul className="page_navigation">
        <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
          <a
            className="page-link"
            onMouseDown={() => handlePageChange(page - 1)}
          >
            <span className="flaticon-left-arrow"></span>
          </a>
        </li>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <li key={num} className={`page-item ${page === num ? "active" : ""}`}>
            <button className="page-link" onClick={() => handlePageChange(num)}>
              {num}
            </button>
          </li>
        ))}

        <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
          <a
            className="page-link"
            onMouseDown={() => handlePageChange(page + 1)}
          >
            <span className="flaticon-right-arrow"></span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
