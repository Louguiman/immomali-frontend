"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setTenantField } from "@/features/tenant/tenantsSlice";
import SearchableUserSelect from "./SearchableUserSelect";
import PropertyCard from "@/components/PropertyCard";
import SearchablePropertySelect from "./SearchablePropertySelect";
import SearchableAgentSelect from "./SearchableAgentSelect";

const TenantForm = () => {
  const dispatch = useDispatch();
  const tenant = useSelector((state) => state.tenants.tenantDetails);
  const user = useSelector((state) => state.auth.user);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);
  /** 🔹 Handle Input Change */
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    dispatch(setTenantField({ field: id, value }));
  };

  const handleTenantSelection = (user) => {
    console.log("clicked user: ", user);

    setSelectedTenant(user);
    // for (const [key, value] of Object.entries(user)) {
    //   console.log(`${key}: ${value}`);
    //   dispatch(setTenantField({ field: key, value }));
    // }
  };

  const userRoles = user?.roles?.map((role) => role.name) || [];

  return (
    <>
      <div className="col-lg-6">
        <SearchableUserSelect
          placeholder="Search users by email or phone..."
          onSelect={(user) => setSelectedTenant(user)}
        />
      </div>
      {selectedTenant && (
        <div className="col-lg-6">
          <label htmlFor="selectedTenant">Selected Tenant</label>

          <div
            id="selectedTenant"
            className="my_profile_setting_input form-group d-flex align-items-center"
          >
            <Image
              src={selectedTenant.img || "/assets/images/default-user.png"} // Fallback image
              alt={selectedTenant.name}
              width={35}
              height={35}
              className="rounded-circle me-2"
            />
            <div>
              <p className="mb-0 fw-bold">{selectedTenant.name}</p>
              <small className="text-muted">
                {selectedTenant.email} | {selectedTenant.phoneNumber}
              </small>
            </div>
          </div>
        </div>
      )}

      {!selectedTenant ? (
        <>
          {" "}
          <div className="col-lg-6">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={tenant.name}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={tenant.email}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                value={tenant.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </>
      ) : null}

      <div className="col-lg-12 d-flex align-items-center">
        <div className="my_profile_setting_input form-group col-lg-6">
          <label htmlFor="propertyID">Property to be rented out</label>
          <SearchablePropertySelect
            agencyId={user?.agency?.id} // Pass agencyId for filtering
            placeholder="Search properties..."
            onSelect={(property) => setSelectedProperty(property)}
          />
        </div>
        {selectedProperty && (
          <div className="col-lg-6">
            <PropertyCard item={selectedProperty} />
          </div>
        )}
      </div>

      <div className="col-lg-6">
        <div className="my_profile_setting_input form-group">
          <SearchableAgentSelect
            agencyId={user?.agency?.id}
            user={user}
            isAgency={userRoles.includes("agency")}
            placeholder={"Search for an agent to assign"}
            onSelect={(user) => setSelectedAgent(user)}
          />
        </div>
      </div>
    </>
  );
};

export default TenantForm;
