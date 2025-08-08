import { PropertyFilters } from "./index";

interface FilteringProps {
  onFilterChange: (newFilters: PropertyFilters) => void;
}

const Filtering: React.FC<FilteringProps> = ({ onFilterChange }) => {
  return (
    <select
      className="selectpicker show-tick form-select c_select"
      onChange={(e) => {
        // Example: pass the selected value as status; adapt as needed
        onFilterChange({ status: e.target.value });
      }}
    >
      <option value="featured">Featured First</option>
      <option value="recent">Recent</option>
      <option value="old">Old Review</option>
    </select>
  );
};

export default Filtering;
