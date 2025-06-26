import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useCallback, useState, ChangeEvent, FormEvent } from "react";

interface SearchBoxProps {
  /**
   * Callback function that is called when a search is performed
   * @param query - The search query string
   */
  onSearch?: (query: string) => void;
  
  /** Additional CSS class name for the search box */
  className?: string;
  
  /** Placeholder text for the search input */
  placeholder?: string;
  
  /** Initial search query value */
  initialValue?: string;
}

/**
 * A reusable search box component for saved searches with TypeScript support
 */
const SearchBox = ({
  onSearch,
  className = "",
  placeholder,
  initialValue = "",
}: SearchBoxProps) => {
  const t = useTranslations("common");
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(initialValue);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const trimmedQuery = searchQuery.trim();
      
      if (onSearch) {
        onSearch(trimmedQuery);
      } else {
        // Default behavior: update URL query params
        const { pathname, query } = router;
        router.push(
          {
            pathname,
            query: { 
              ...query, 
              search: trimmedQuery || undefined,
              page: 1 // Reset to first page on new search
            },
          },
          undefined,
          { 
            shallow: true,
            scroll: false 
          }
        );
      }
    },
    [searchQuery, onSearch, router]
  );

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  return (
    <form 
      className={`form-group ${className}`} 
      onSubmit={handleSubmit}
      role="search"
      aria-label={t("searchSavedSearches")}
    >
      <input
        type="search"
        className="form-control"
        id="savedSearchInput"
        placeholder={placeholder || t("searchSavedSearches")}
        value={searchQuery}
        onChange={handleChange}
        aria-label={t("searchSavedSearches")}
        aria-describedby="searchHelp"
      />
      <button 
        type="submit" 
        className="btn-search"
        aria-label={t("submitSearch")}
        disabled={!searchQuery.trim()}
      >
        <i className="flaticon-magnifying-glass" aria-hidden="true" />
      </button>
      <small id="searchHelp" className="form-text text-muted d-block mt-1">
        {t("searchSavedSearchesHelp")}
      </small>
    </form>
  );
};

export default SearchBox;
