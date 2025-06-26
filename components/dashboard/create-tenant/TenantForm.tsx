"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { setLeaseField, setTenantField } from "@/features/tenant/tenantsSlice";
import SearchableUserSelect from "./SearchableUserSelect";
import SearchablePropertySelect from "./SearchablePropertySelect";
import SearchableAgentSelect from "./SearchableAgentSelect";
import UserCard from "@/components/common/cards/UserCard";
import MinimalPropertyCard from "@/components/MinimalPropertyCard";
import { useTranslations } from "next-intl";

const TenantForm = ({ tenantToEdit, activeStep, onNext, onPrevious }) => {
  const t = useTranslations("dashboard.TenantProfile");
  const dispatch = useDispatch();
  const tenant = useSelector((state) => state.tenants.tenantDetails);
  const user = useSelector((state) => state.auth.user);
  const [selectedTenant, setSelectedTenant] = useState(
    tenantToEdit?.user || null
  );
  const [selectedProperty, setSelectedProperty] = useState(
    tenantToEdit?.property || null
  );
  const [selectedAgent, setSelectedAgent] = useState(
    tenantToEdit?.agent || null
  );

  /** 🔹 Handle Input Change */
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    dispatch(setTenantField({ field: id, value }));
  };

  const handleTenantSelection = (user) => {
    setSelectedTenant(user);
    dispatch(setTenantField({ field: "userId", value: user.id }));
  };

  const handlePropertySelection = (property) => {
    setSelectedProperty(property);
    dispatch(setLeaseField({ field: "monthlyRent", value: property.price }));
    dispatch(
      setLeaseField({ field: "securityDeposit", value: property.price * 2 })
    );
    dispatch(setTenantField({ field: "propertyId", value: property.id }));
  };

  const handleAgentSelection = (user) => {
    setSelectedAgent(user);
    dispatch(setTenantField({ field: "agentId", value: user.id }));
  };

  const userRoles = user?.roles?.map((role) => role.name) || [];

  return (
    <>
      <div className="col-lg-6">
        <SearchableUserSelect
          placeholder={t("searchUsers")}
          onSelect={handleTenantSelection}
        />
      </div>

      {!selectedTenant ? (
        <>
          <div className="col-lg-6 mt-2">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="name">{t("fullName")}</label>
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
              <label htmlFor="email">{t("email")}</label>
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
              <label htmlFor="phone">{t("phone")}</label>
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

      <div className="col-lg-6 d-flex align-items-center mt-2">
        <div className="my_profile_setting_input form-group col-lg-6">
          <label htmlFor="propertyID">{t("propertyToRent")}</label>
          <SearchablePropertySelect
            agentId={selectedAgent?.id}
            agencyId={user?.agency?.id}
            placeholder={t("searchProperties")}
            onSelect={handlePropertySelection}
          />
        </div>
      </div>

      <div className="col-lg-6 mt-2">
        <div className="my_profile_setting_input form-group">
          <SearchableAgentSelect
            agencyId={user?.agency?.id}
            user={user}
            isAgency={userRoles.includes("agency")}
            placeholder={t("searchAgent")}
            onSelect={handleAgentSelection}
          />
        </div>
      </div>

      {selectedAgent && (
        <div className="col-lg-6 mt-2">
          <label htmlFor="selectedTenant">{t("selectedAgent")}</label>
          <div
            id="selectedAgent"
            className="my_profile_setting_input form-group d-flex align-items-center"
          >
            <Image
              src={selectedAgent.img || "/assets/images/team/e1.png"}
              alt={selectedAgent.name}
              width={35}
              height={35}
              className="rounded-circle me-2"
            />
            <div>
              <p className="mb-0 fw-bold">{selectedAgent.name}</p>
              <small className="text-muted">
                {selectedAgent.email} | {selectedAgent.phoneNumber}
              </small>
            </div>
          </div>
        </div>
      )}

      <div className="position-absolute top-0 end-0 p-3 mt-5 mr-2 bg-light shadow rounded">
        <p className="fw-bold mt-2">{t("selectedTenant")}</p>
        {selectedTenant && (
          <div className="mb-3 d-flex align-items-center">
            <UserCard user={selectedTenant} />
          </div>
        )}
        {selectedProperty && (
          <>
            <p className="fw-bold mt-2">
              {t("property")}: {selectedProperty.title}
            </p>
            <MinimalPropertyCard item={selectedProperty} />
          </>
        )}
        {selectedAgent && (
          <p className="fw-bold mt-2">
            {t("agent")}: {selectedAgent.name} |{" "}
            {selectedAgent?.phone || selectedAgent.email}
          </p>
        )}
      </div>

      <div className="col-xl-12">
        <button type="button" onClick={onNext} className="btn btn2 float-end">
          {t("next")}
        </button>
      </div>
    </>
  );
};

export default TenantForm;
