import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import _ from "lodash"; // Import lodash
import { useSearchAgentsByAgencyQuery } from "@/features/api/agents.api";
import { User } from "@/types/user";

interface SearchableAgentSelectProps {
  placeholder: string;
  onSelect: (user: Partial<User>) => void;
  agencyId: string;
  isAgency: boolean;
  user: { name: string; email: string; phoneNumber: string };
}

const SearchableAgentSelect = ({
  placeholder,
  onSelect,
  agencyId,
  isAgency,
  user,
}: SearchableAgentSelectProps) => {
  const [query, setQuery] = useState(
    isAgency ? "" : `${user.name} | ${user.email} | ${user.phoneNumber}`
  );
  const [showDropdown, setShowDropdown] = useState(false);
  // Fetch users only when debouncedQuery is not empty
  const { data: users, isLoading } = useSearchAgentsByAgencyQuery(
    { agencyId, query },
    {
      skip: !isAgency,
    }
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSelect = useCallback(
    (user: Partial<User>) => {
      // setSelectedUser(user);
      onSelect(user);
      setQuery(""); // Reset input after selection
    },
    [onSelect, setQuery]
  );

  useEffect(() => {
    if (!isAgency) {
      handleSelect(user);
    }

    return () => {};
  }, [user, isAgency, handleSelect]);

  return (
    <div className="searchable-select position-relative my_profile_setting_input">
      <label htmlFor="searchAgent">Managed by Agent </label>
      <input
        type="text"
        name="searchAgent"
        className="form-control"
        disabled={!isAgency}
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
          {users.map((user: Partial<User>) => (
            <li
              key={user.id}
              className="dropdown-item d-flex align-items-center"
              onMouseDown={() => handleSelect(user)}
              style={{ cursor: "pointer" }}
            >
              <Image
                src={user.img || "/assets/images/default-user.png"} // Fallback image
                alt={user.name || "user name"}
                width={35}
                height={35}
                className="rounded-circle me-2"
              />
              <div>
                <p className="mb-0 fw-bold">{user.name || "user name"}</p>
                <small className="text-muted">
                  {user.email || "user email"} |{" "}
                  {user.phoneNumber || "user phone number"}
                </small>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchableAgentSelect;
