import { useEffect, useMemo, useState } from "react";
import { useSearchUsersQuery } from "@/features/api/user.api";
import Image from "next/image";
import _ from "lodash"; // Import lodash

const SearchableUserSelect = ({ placeholder, onSelect }) => {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  // Fetch users only when debouncedQuery is not empty
  const { data: users, isLoading } = useSearchUsersQuery(query, {
    skip: !query, // Avoid fetching if query is empty
  });

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
    <div className="searchable-select position-relative my_profile_setting_input">
      <label htmlFor="search">Find a tenant</label>
      <input
        type="text"
        name="search"
        className="form-control"
        placeholder={placeholder}
        onFocus={() => {
          if (!showDropdown) setShowDropdown(true);
        }}
        onBlur={() => {
          if (showDropdown) setShowDropdown(false);
        }}
        // value={query}
        onChange={debouncedResults}
      />
      {isLoading && <p className="text-muted">Loading...</p>}

      {showDropdown && users?.length > 0 && (
        <ul className="dropdown-menu show w-100">
          {users.map((user) => (
            <li
              key={user.id}
              className="dropdown-item d-flex align-items-center"
              onClick={() => onSelect(user)}
              style={{ cursor: "pointer" }}
            >
              <Image
                src={user.img || "/assets/images/default-user.png"} // Fallback image
                alt={user.name}
                width={35}
                height={35}
                className="rounded-circle me-2"
              />
              <div>
                <p className="mb-0 fw-bold">{user.name}</p>
                <small className="text-muted">
                  {user.email} | {user.phoneNumber}
                </small>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchableUserSelect;
