import { useEffect, useMemo, useState } from "react";
import {
  useFetchPropertyByUserIdQuery,
  useSearchAgencyPropertiesQuery,
} from "@/features/api/properties.api";
import _ from "lodash"; // Import lodash
import Image from "next/image";
import { Property } from "@/types/property";

interface SearchablePropertySelectProps {
  agentId?: string | number;
  agencyId?: string | number;
  placeholder?: string;
  onSelect: (property: Property) => void;
}

const SearchablePropertySelect = ({
  agentId,
  agencyId,
  placeholder,
  onSelect,
}: SearchablePropertySelectProps) => {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch properties only when debouncedQuery is not empty
  const { data: searchResults, isLoading } = useSearchAgencyPropertiesQuery(
    { query: query },
    { skip: !agencyId || !query } // Avoid fetching if query is empty
  );

  const {
    data: agentProperties,
    // isLoading: isLoadingAgent,
    // refetch,
  } = useFetchPropertyByUserIdQuery(agentId?.toString() || "", {
    skip: !agentId || !!agencyId,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const debouncedResults = useMemo(() => {
    return _.debounce(handleSearch, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  }, [debouncedResults]);

  const handleSelect = (property: Property) => {
    onSelect(property);
    setQuery(""); // Reset input after selection
  };
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

      {showDropdown && (
        <RenderPropertyList
          properties={searchResults ? searchResults : agentProperties?.data || []}
          handleSelect={handleSelect}
        />
      )}
    </div>
  );
};

export default SearchablePropertySelect;

interface RenderPropertyListProps {
  properties?: Property[];
  handleSelect: (property: Property) => void;
}

const RenderPropertyList = ({ properties, handleSelect }: RenderPropertyListProps) => {
  return (
    Array.isArray(properties) && properties.length > 0 && (
      <ul className="dropdown-menu show w-100">
        {properties.map((property) => (
          <li
            key={property.id}
            className="dropdown-item d-flex align-items-center"
            onMouseDown={() => handleSelect(property)}
            style={{ cursor: "pointer" }}
          >
            <Image
              src={
                property.images?.[0]?.imageUrl ||
                "/assets/images/default-property.jpg"
              }
              alt={property.title || "Property"}
              width={45}
              height={45}
              className="rounded me-2"
            />
            <div>
              <p className="mb-0 fw-bold">{property.title}</p>
              <small className="text-muted">
                {property.address} {property?.city} | {property.price} FCFA
              </small>
            </div>
          </li>
        ))}
      </ul>
    )
  );
};
