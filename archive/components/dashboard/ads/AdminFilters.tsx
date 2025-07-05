import { useState } from "react";

type Filters = {
  query: string;
  status: string;
  type: string;
  sortBy: string;
  order: string;
};

type AdminFiltersProps = {
  onFilterChange: (filters: Filters) => void;
};

const AdminFilters: React.FC<AdminFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<Filters>({
    query: "",
    status: "",
    type: "",
    sortBy: "createdAt",
    order: "DESC",
  });

  // Handle filter changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="filters-container mb-4 d-flex flex-wrap align-items-center gap-3">
      {/* 🔹 Search Input */}
      <input
        type="text"
        name="query"
        className="form-control"
        placeholder="🔎 Search by title or owner..."
        value={filters.query}
        onChange={handleChange}
      />

      {/* 🔹 Filter by Status */}
      <label htmlFor="status" className="visually-hidden">Status</label>
      <select
        id="status"
        name={"status"}
        className="form-select"
        value={filters.status}
        onChange={handleChange}
        title="Status"
      >
        <option value="">All Statuses</option>
        <option value="active">✅ Active</option>
        <option value="pending">⏳ Pending</option>
        <option value="rejected">❌ Rejected</option>
        <option value="expired">📅 Expired</option>
      </select>

      {/* 🔹 Filter by Ad Type */}
      <label htmlFor="type" className="visually-hidden">Ad Type</label>
      <select
        id="type"
        name={"type"}
        className="form-select"
        value={filters.type}
        onChange={handleChange}
        title="Ad Type"
      >
        <option value="">All Types</option>
        <option value="regular">🏡 Regular</option>
        <option value="featured">⭐ Featured</option>
        <option value="premium">💎 Premium</option>
      </select>

      {/* 🔹 Sort By */}
      <label htmlFor="sortBy" className="visually-hidden">Sort By</label>
      <select
        id="sortBy"
        name={"sortBy"}
        className="form-select"
        value={filters.sortBy}
        onChange={handleChange}
        title="Sort By"
      >
        <option value="createdAt">📅 Date Created</option>
        <option value="views">👀 Views</option>
        <option value="clicks">📊 Clicks</option>
      </select>

      {/* 🔹 Order (ASC / DESC) */}
      <label htmlFor="order" className="visually-hidden">Order</label>
      <select
        id="order"
        name="order"
        className="form-select"
        value={filters.order}
        onChange={handleChange}
        title="Order"
      >
        <option value="DESC">⬇️ Descending</option>
        <option value="ASC">⬆️ Ascending</option>
      </select>
    </div>
  );
};

export default AdminFilters;
