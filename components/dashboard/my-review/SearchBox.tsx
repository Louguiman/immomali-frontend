import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useCallback, useState, ChangeEvent, FormEvent } from "react";

interface SearchBoxProps {
  onSearch?: (query: string) => void;
  className?: string;
  placeholder?: string;
}

const SearchBox = ({
  onSearch,
  className = "",
  placeholder,
}: SearchBoxProps) => {
  const t = useTranslations("common");
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (onSearch) {
        onSearch(searchQuery);
      } else {
        // Default behavior: update URL query params
        const { pathname, query } = router;
        router.push(
          {
            pathname,
            query: { ...query, search: searchQuery, page: 1 },
          },
          undefined,
          { shallow: true }
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
    >
      <input
        type="search"
        className="form-control"
        id="reviewSearchInput"
        placeholder={placeholder || t("search")}
        value={searchQuery}
        onChange={handleChange}
        aria-label={t("searchReviews")}
      />
      <button 
        type="submit" 
        className="btn-search"
        aria-label={t("submitSearch")}
      >
        <i className="flaticon-magnifying-glass" aria-hidden="true" />
      </button>
    </form>
  );
};

export default SearchBox;
