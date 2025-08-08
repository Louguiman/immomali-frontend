"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setLeaseField, setTenantField } from "@/features/tenant/tenantsSlice";
import SearchableUserSelect from "./SearchableUserSelect";
import SearchablePropertySelect from "./SearchablePropertySelect";
import SearchableAgentSelect from "./SearchableAgentSelect";
import UserCard from "@/components/common/cards/UserCard";
import MinimalPropertyCard from "@/components/MinimalPropertyCard";
import { useTranslations } from "next-intl";
import { Property } from "@/types/property";
import { User } from "@/types/user";
import { Agent } from "@/types/agent";
import { Tenant } from "@/types/tenant";

interface TenantFormProps {
  tenantToEdit?: Tenant;
  onNext: () => void;
  // onPrevious: () => void;
}

const TenantForm: React.FC<TenantFormProps> = ({
  tenantToEdit,
  onNext,
  // onPrevious,
}) => {
  const t = useTranslations("dashboard");
  const dispatch = useAppDispatch();
  const tenant = useAppSelector((state) => state.tenants.tenantDetails);
  const user = useAppSelector((state) => state.auth.user);
  const [selectedTenant, setSelectedTenant] = useState(
    tenantToEdit?.user || null
  );
  const [selectedProperty, setSelectedProperty] = useState(
    tenantToEdit?.property || null
  );
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(
    tenantToEdit?.agent || null
  );

  /** 🔹 Handle Input Change */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    dispatch(setTenantField({ field: id, value }));
  };

  const handleTenantSelection = (user: User) => {
    setSelectedTenant(user);
    dispatch(setTenantField({ field: "userId", value: user.id }));
  };

  const handlePropertySelection = (property: Property) => {
    setSelectedProperty(property);
    dispatch(setLeaseField({ field: "monthlyRent", value: property.price }));
    dispatch(
      setLeaseField({ field: "securityDeposit", value: property.price * 2 })
    );
    dispatch(setTenantField({ field: "propertyId", value: property.id }));
  };

  const handleAgentSelection = (agent: Partial<Agent>) => {
    if (agent && agent.id) {
      setSelectedAgent(agent as Agent);
      dispatch(setTenantField({ field: "agentId", value: agent.id }));
    }
  };

  const userRoles = user?.roles?.map((role) => role.name) || [];

  return (
    <>
      <div className="col-lg-6">
        <SearchableUserSelect
          placeholder={t("TenantProfile.searchUsers")}
          onSelect={handleTenantSelection}
        />
      </div>

      {!selectedTenant ? (
        <>
          <div className="col-lg-6 mt-2">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="name">{t("TenantProfile.fullName")}</label>
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
              <label htmlFor="email">{t("TenantProfile.email")}</label>
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
              <label htmlFor="phone">{t("TenantProfile.phone")}</label>
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
          <label htmlFor="propertyID">
            {t("TenantProfile.propertyToRent")}
          </label>
          <SearchablePropertySelect
            agentId={selectedAgent?.id}
            agencyId={user?.agency?.id ?? ""}
            placeholder={t("TenantProfile.searchProperties")}
            onSelect={handlePropertySelection}
          />
        </div>
      </div>

      <div className="col-lg-6 mt-2">
        <div className="my_profile_setting_input form-group">
          {user && (
            <SearchableAgentSelect
              agencyId={user.agency?.id ? String(user.agency.id) : ""}
              user={{
                ...user,
                id: Number(user.id),
                img: user?.img ?? "",
                phoneNumber: user?.phoneNumber ?? "",
                agency: user?.agency,
              }}
              isAgency={userRoles.includes("agency")}
              placeholder={t("TenantProfile.searchAgent")}
              onSelect={handleAgentSelection}
            />
          )}
        </div>
      </div>

      {selectedAgent && (
        <div className="col-lg-6 mt-2">
          <label htmlFor="selectedTenant">
            {t("TenantProfile.selectedAgent")}
          </label>
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
        <p className="fw-bold mt-2">{t("TenantProfile.selectedTenant")}</p>
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
            {t("TenantProfile.agent")}: {selectedAgent.name} |{" "}
            {selectedAgent?.phoneNumber || selectedAgent.email}
          </p>
        )}
      </div>

      <div className="col-xl-12">
        <button type="button" onClick={onNext} className="btn btn2 float-end">
          {t("TenantProfile.next")}
        </button>
      </div>
    </>
  );
};

export default TenantForm;
