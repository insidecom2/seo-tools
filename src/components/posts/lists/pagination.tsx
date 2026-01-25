import { PaginationPosts } from "@/src/interface/pagination";
import { usePostsFilterState } from "@/src/stores/post_filter";
import { isDesktopDevice } from "@/src/utils/device";
import { useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface PostsPaginationProps {
  pagination?: PaginationPosts;
}

export const PostsPagination = ({ pagination }: PostsPaginationProps) => {
  const { limit, page, totalAll, totalPage } = pagination;
  const { init, setPage } = usePostsFilterState();
  const isGetDesktopDevice = isDesktopDevice();

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
    <div className="paginationMinimal">
      <div className="paginationControls">
        <button
          className={`paginationBtn ${page === 1 ? "disabled" : ""}`}
          onClick={() => handleChange(page - 1)}
          disabled={page === 1}
          title="Previous page"
        >
          <FaChevronLeft />
        </button>

        {isGetDesktopDevice && totalPage > 10 && (
          <div className="paginationPages">
            {pages.map((p) => (
              <button
                key={p}
                className={`paginationPage ${p === page ? "active" : ""}`}
                onClick={() => handleChange(p)}
                title={`Go to page ${p}`}
              >
                {p}
              </button>
            ))}
          </div>
        )}

        <button
          className={`paginationBtn ${page === totalPage ? "disabled" : ""}`}
          onClick={() => handleChange(page + 1)}
          disabled={page === totalPage}
          title="Next page"
        >
          <FaChevronRight />
        </button>
      </div>

      <div className="paginationInfo">
        <span className="paginationStat">
          Page <strong>{page}</strong> of <strong>{totalPage}</strong>
        </span>
        <span className="paginationDivider">•</span>
        <span className="paginationStat">
          <strong>{totalAll}</strong> items
        </span>
        <span className="paginationDivider">•</span>
        <span className="paginationStat">
          <strong>{limit}</strong>/page
        </span>
      </div>
    </div>
  );
};
