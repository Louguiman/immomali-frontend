import { useState } from "react";

const AdminFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    query: "",
    status: "",
    type: "",
    sortBy: "createdAt",
    order: "DESC",
  });

  // Handle filter changes
  const handleChange = (e) => {
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
      <select
        name="status"
        className="form-select"
        value={filters.status}
        onChange={handleChange}
      >
        <option value="">All Statuses</option>
        <option value="active">✅ Active</option>
        <option value="pending">⏳ Pending</option>
        <option value="rejected">❌ Rejected</option>
        <option value="expired">📅 Expired</option>
      </select>

      {/* 🔹 Filter by Ad Type */}
      <select
        name="type"
        className="form-select"
        value={filters.type}
        onChange={handleChange}
      >
        <option value="">All Types</option>
        <option value="regular">🏡 Regular</option>
        <option value="featured">⭐ Featured</option>
        <option value="premium">💎 Premium</option>
      </select>

      {/* 🔹 Sort By */}
      <select
        name="sortBy"
        className="form-select"
        value={filters.sortBy}
        onChange={handleChange}
      >
        <option value="createdAt">📅 Date Created</option>
        <option value="views">👀 Views</option>
        <option value="clicks">📊 Clicks</option>
      </select>

      {/* 🔹 Order (ASC / DESC) */}
      <select
        name="order"
        className="form-select"
        value={filters.order}
        onChange={handleChange}
      >
        <option value="DESC">⬇️ Descending</option>
        <option value="ASC">⬆️ Ascending</option>
      </select>
    </div>
  );
};

export default AdminFilters;
