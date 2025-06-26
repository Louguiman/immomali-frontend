import { useEffect, useMemo, useState } from "react";
import { useSearchUsersQuery } from "@/features/api/user.api";
import Image from "next/image";
import _ from "lodash";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const SearchableUserSelect = ({ placeholder, onSelect }) => {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: users, isLoading } = useSearchUsersQuery(query, {
    skip: !query,
  });

  const handleSearch = (e) => {
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

  const handleSelect = (user) => {
    // setSelectedUser(user);
    onSelect(user);
    setQuery(""); // Reset input after selection
  };

  return (
    <div className="position-relative">
      <label>Find a tenant</label>
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        onChange={debouncedResults}
        onFocus={() => {
          if (!showDropdown) setShowDropdown(true);
        }}
        onBlur={() => {
          if (showDropdown) setShowDropdown(false);
        }}
        // value={query}
      />

      {isLoading && (
        <div className="text-muted row">
          <LoadingSpinner />
          Loading...
        </div>
      )}

      {showDropdown && users?.length > 0 && (
        <ul className="dropdown-menu show w-100">
          {users.map((user) => (
            <li
              key={user.id}
              className="dropdown-item d-flex align-items-center"
              onMouseDown={() => handleSelect(user)} // Prevents dropdown from closing
              style={{ cursor: "pointer" }}
            >
              <Image
                src={user?.img || "/assets/images/default-user.png"}
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
