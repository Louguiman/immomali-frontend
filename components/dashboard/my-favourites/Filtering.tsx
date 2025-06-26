import React, { ChangeEvent } from 'react';

interface FilteringProps {
  onChange?: (value: string) => void;
  value?: string;
}

const Filtering: React.FC<FilteringProps> = ({ onChange, value }) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <select 
      className="selectpicker show-tick form-select c_select"
      onChange={handleChange}
      value={value}
      aria-label="Filter options"
    >
      <option value="featured">Featured First</option>
      <option value="recent">Recent</option>
      <option value="oldest">Old Review</option>
    </select>
  );
};

export default Filtering;
