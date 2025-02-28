import { useEffect, useMemo, useState } from "react";
import { useSearchAgencyPropertiesQuery } from "@/features/api/properties.api";
import _ from "lodash"; // Import lodash

const SearchablePropertySelect = ({ agencyId, onSelect, placeholder }) => {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch properties only when debouncedQuery is not empty
  const { data: properties, isLoading } = useSearchAgencyPropertiesQuery(
    { query: query, agencyId },
    // { skip: !query } // Avoid fetching if query is empty
  );

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const debouncedResults = useMemo(() => {
    return _.debounce(handleSearch, 500);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });
  return (
    <div className="searchable-select position-relative">
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        // value={query}
        onFocus={() => {
          if (!showDropdown) setShowDropdown(true);
        }}
        onBlur={() => {
          if (showDropdown) setShowDropdown(false);
        }}
        onChange={debouncedResults}
      />
      {isLoading && <p className="text-muted">Loading...</p>}

      {showDropdown && properties?.length > 0 && (
        <ul className="dropdown-menu show w-100">
          {properties.map((property) => (
            <li
              key={property.id}
              className="dropdown-item d-flex align-items-center"
              onClick={() => onSelect(property)}
              style={{ cursor: "pointer" }}
            >
              {/* <Image
                src={
                  property.images?.[0]?.imageUrl ||
                  "/assets/images/default-property.jpg"
                }
                alt={property.title}
                width={45}
                height={45}
                className="rounded me-2"
              /> */}
              <div>
                <p className="mb-0 fw-bold">{property.title}</p>
                <small className="text-muted">
                  {property.location} | ${property.price}
                </small>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchablePropertySelect;
