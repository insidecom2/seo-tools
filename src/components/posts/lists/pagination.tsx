import { Pagination } from "@/src/interface/pagination";
import { usePostsFilterState } from "@/src/stores/post_filter";
import { useEffect } from "react";

interface PostsPaginationProps {
  pagination?: Pagination;
}
export const PostsPagination = ({ pagination }: PostsPaginationProps) => {
  const { limit, page, totalAll, totalPage } = pagination;
  const { init, setPage } = usePostsFilterState();

  useEffect(() => {
    if (pagination) {
      init(pagination);
    }
  }, [pagination]);

  const handleChange = (p: number) => {
    if (p >= 1 && p <= totalPage) {
      setPage({ page: p });
    }
  };

  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);
  if (totalPage <= 1) return null;

  return (
    <nav aria-label="Posts pagination">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => handleChange(page - 1)}>
            Previous
          </button>
        </li>

        {pages.map((p) => (
          <li key={p} className={`page-item ${p === page ? "active" : ""}`}>
            <button className="page-link" onClick={() => handleChange(p)}>
              {p}
            </button>
          </li>
        ))}

        <li className={`page-item ${page === totalAll ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => handleChange(page + 1)}>
            Next
          </button>
        </li>
      </ul>

      <div className="text-end text-muted small mt-2">
        Page {page} of {totalPage} • {totalAll} items • {limit}/page
      </div>
    </nav>
  );
};
