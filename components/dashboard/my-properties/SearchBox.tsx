import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useTranslations } from 'next-intl';

interface SearchBoxProps {
  /**
   * Initial search query value
   */
  initialValue?: string;
  /**
   * Callback function when search is submitted
   * @param query - The search query string
   */
  onSearch?: (query: string) => void;
  /**
   * Whether the search is currently loading
   */
  isLoading?: boolean;
  /**
   * Optional error message to display
   */
  error?: string | null;
  /**
   * Placeholder text for the search input
   */
  placeholder?: string;
  /**
   * Additional CSS classes for the search box container
   */
  className?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  initialValue = '',
  onSearch,
  isLoading = false,
  error = null,
  placeholder,
  className = '',
}) => {
  const [query, setQuery] = useState<string>(initialValue);
  const t = useTranslations('common');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className={`search-box ${className}`}>
      <form 
        onSubmit={handleSubmit}
        className="d-flex flex-wrap align-items-center my-2"
        role="search"
      >
        <label htmlFor="properties-search" className="visually-hidden">
          {t('search')}
        </label>
        <div className="position-relative flex-grow-1">
          <div className="position-relative">
            <input
              id="properties-search"
              className={`form-control ${error ? 'is-invalid' : ''} ${isLoading ? 'pe-10' : ''}`}
              type="search"
              placeholder={placeholder || t('searchPlaceholder')}
              aria-label={t('search')}
              value={query}
              onChange={handleInputChange}
              disabled={isLoading}
              aria-describedby={error ? 'search-error' : undefined}
            />
            {isLoading && (
              <div 
                className="position-absolute top-50 end-0 translate-middle-y me-3"
                role="status"
                aria-label={t("common.loading")}
              >
                <div 
                  className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"
                  aria-hidden="true"
                ></div>
              </div>
            )}
          </div>
          {error && (
            <div id="search-error" className="invalid-feedback">
              {error}
            </div>
          )}
        </div>
        <button 
          className="btn btn-outline-secondary ms-2 my-2 my-sm-0" 
          type="submit" 
          title={t('search')}
          disabled={isLoading || !query.trim()}
          aria-label={t('search')}
        >
          <span className="flaticon-magnifying-glass" aria-hidden="true"></span>
          <span className="visually-hidden">{t('search')}</span>
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
