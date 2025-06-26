import { useTranslations } from "next-intl";
import Link from "next/link";
import { useCallback } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { format } from "date-fns";

interface SearchItem {
  id: string;
  title: string;
  createdAt: Date;
  filters: Record<string, unknown>;
  resultCount: number;
}

interface SearchDataProps {
  /**
   * Array of saved search items
   */
  searches?: SearchItem[];
  
  /**
   * Callback when view action is triggered
   * @param id - The ID of the search item
   */
  onView?: (id: string) => void;
  
  /**
   * Callback when edit action is triggered
   * @param id - The ID of the search item
   */
  onEdit?: (id: string) => void;
  
  /**
   * Callback when delete action is triggered
   * @param id - The ID of the search item
   */
  onDelete?: (id: string) => void;
  
  /**
   * Whether the data is currently loading
   */
  isLoading?: boolean;
  
  /**
   * Error message if any
   */
  error?: string | null;
}

/**
 * A component to display a table of saved property searches
 */
const SearchData = ({
  searches = [],
  onView,
  onEdit,
  onDelete,
  isLoading = false,
  error = null,
}: SearchDataProps) => {
  const t = useTranslations("dashboard.savedSearches");
  const commonT = useTranslations("common");

  const handleView = useCallback((id: string, e: React.MouseEvent) => {
    e.preventDefault();
    onView?.(id);
  }, [onView]);

  const handleEdit = useCallback((id: string, e: React.MouseEvent) => {
    e.preventDefault();
    onEdit?.(id);
  }, [onEdit]);

  const handleDelete = useCallback((id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (window.confirm(t("confirmDelete"))) {
      onDelete?.(id);
    }
  }, [onDelete, t]);

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">{commonT("loading")}</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  if (searches.length === 0) {
    return (
      <div className="alert alert-info" role="alert">
        {t("noSavedSearches")}
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th scope="col">{t("searchName")}</th>
            <th className="d-none d-lg-table-cell" scope="col">{t("filters")}</th>
            <th className="d-none d-lg-table-cell" scope="col">{t("results")}</th>
            <th scope="col">{t("created")}</th>
            <th scope="col" className="text-end">{commonT("actions")}</th>
          </tr>
        </thead>
        <tbody>
          {searches.map((search) => (
            <tr key={search.id}>
              <th className="align-middle" scope="row">
                <Link 
                  href="#" 
                  className="text-decoration-none"
                  onClick={(e) => handleView(search.id, e)}
                >
                  {search.title}
                </Link>
              </th>
              <td className="d-none d-lg-table-cell align-middle">
                <small className="text-muted">
                  {Object.entries(search.filters)
                    .map(([key]) => key)
                    .join(", ")}
                </small>
              </td>
              <td className="d-none d-lg-table-cell align-middle">
                <span className="badge bg-primary">
                  {search.resultCount} {commonT("results")}
                </span>
              </td>
              <td className="align-middle">
                <time dateTime={search.createdAt.toISOString()}>
                  {format(search.createdAt, 'PP')}
                </time>
              </td>
              <td className="text-end align-middle">
                <div className="btn-group" role="group" aria-label={commonT("actions")}>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={(e) => handleView(search.id, e as React.MouseEvent)}
                    title={commonT("view")}
                  >
                    <FaEye className="me-1" />
                    <span className="visually-hidden">{commonT("view")}</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={(e) => handleEdit(search.id, e as React.MouseEvent)}
                    title={commonT("edit")}
                  >
                    <FaEdit className="me-1" />
                    <span className="visually-hidden">{commonT("edit")}</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={(e) => handleDelete(search.id, e as React.MouseEvent)}
                    title={commonT("delete")}
                  >
                    <FaTrash />
                    <span className="visually-hidden">{commonT("delete")}</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchData;
