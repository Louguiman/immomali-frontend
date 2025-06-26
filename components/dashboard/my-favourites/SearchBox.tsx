import React, { FormEvent, useState, ChangeEvent } from 'react';

interface SearchBoxProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  onSearch,
  placeholder = 'Search',
  className = ''
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <form 
      className={`d-flex flex-wrap align-items-center my-2 ${className}`}
      onSubmit={handleSubmit}
      role="search"
    >
      <label htmlFor="dashboard-search" className="visually-hidden">
        {placeholder}
      </label>
      <input
        id="dashboard-search"
        className="form-control mr-sm-2"
        type="search"
        placeholder={placeholder}
        aria-label={placeholder}
        value={searchQuery}
        onChange={handleChange}
      />
      <button 
        className="my-2 my-sm-0" 
        type="submit" 
        title={placeholder}
        aria-label={placeholder}
      >
        <span className="flaticon-magnifying-glass" aria-hidden="true"></span>
      </button>
    </form>
  );
};

export default SearchBox;
