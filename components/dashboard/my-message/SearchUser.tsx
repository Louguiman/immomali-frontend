import { useState, FormEvent, KeyboardEvent, useCallback } from "react";
import { useTranslations } from "next-intl";

/**
 * Props for the SearchUser component
 * @interface SearchUserProps
 * @property {(query: string) => void} [onSearch] - Callback function called when search is submitted or cleared
 * @property {string} [className] - Additional CSS classes to apply to the search form
 * @property {boolean} [disabled] - Whether the search input is disabled
 */
interface SearchUserProps {
  onSearch?: (query: string) => void;
  className?: string;
  disabled?: boolean;
}

/**
 * SearchUser component provides a search input with clear and submit functionality
 * @component
 * @param {SearchUserProps} props - The component props
 * @returns {JSX.Element} The rendered SearchUser component
 */
const SearchUser: React.FC<SearchUserProps> = ({
  onSearch,
  className = "",
  disabled = false,
}) => {
  const t = useTranslations("dashboard.message.search");
  const [searchQuery, setSearchQuery] = useState("");

  /**
   * Handles form submission
   * @param {FormEvent<HTMLFormElement>} e - The form event
   */
  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery && onSearch) {
      onSearch(trimmedQuery);
    }
  }, [searchQuery, onSearch]);

  /**
   * Handles clearing the search input
   */
  const handleClear = useCallback(() => {
    setSearchQuery("");
    if (onSearch) {
      onSearch("");
    }
  }, [onSearch]);

  /**
   * Handles keyboard events for accessibility
   * @param {KeyboardEvent<HTMLInputElement>} e - The keyboard event
   */
  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      handleClear();
    }
  }, [handleClear]);

  return (
    <form 
      className={`search-form ${className}`}
      onSubmit={handleSubmit}
      role="search"
      aria-label={t("search_form")}
    >
      <div className="input-group">
        <input
          id="search-input"
          className="form-control border-end-0"
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t("placeholder")}
          aria-label={t("search_input")}
          aria-describedby="search-hint"
          disabled={disabled}
          autoComplete="off"
          spellCheck="false"
          enterKeyHint="search"
        />
        {searchQuery && (
          <button
            type="button"
            className="btn btn-outline-secondary border-start-0 border-end-0"
            onClick={handleClear}
            disabled={disabled}
            aria-label={t("clear_search")}
          >
            <i className="far fa-times" aria-hidden="true"></i>
            <span className="visually-hidden">{t("clear_search")}</span>
          </button>
        )}
        <button 
          className="btn btn-primary" 
          type="submit" 
          disabled={disabled || !searchQuery.trim()}
          aria-label={t("submit_search")}
        >
          <i className="fas fa-search" aria-hidden="true"></i>
          <span className="visually-hidden">{t("submit_search")}</span>
        </button>
      </div>
      <div id="search-hint" className="visually-hidden">
        {t("search_hint")}
      </div>
    </form>
  );
};

export default SearchUser;
