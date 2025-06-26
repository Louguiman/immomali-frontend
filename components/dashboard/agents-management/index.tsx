"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslations } from "next-intl";
import Swal from "sweetalert2";
import { useAppSelector } from "@/store/store";
import { Agent, AgentFormData } from "@/types/agent";
import SidebarMenu from "@/app/[locale]/(admin)/dashboard/SidebarMenu";

// Import RTK Query hooks with proper typing
import {
  useGetAgentsByAgencyQuery,
  useCreateAgentMutation,
  useUpdateAgentMutation,
  useDeleteAgentMutation,
} from "@/features/api/agents.api";

// Import icons
import { FaPlusCircle, FaBars, FaSearch } from "react-icons/fa";

// Type for the agent form props
interface AgentManagementProps {
  // Add any props if needed
}

const AgentManagement: React.FC<AgentManagementProps> = () => {
  const { user } = useAppSelector((state) => state.auth);
  // Using the agency ID directly in the query
  const agencyId = user?.agency?.id || "";
  const [search, setSearch] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  
  // RTK Query hooks
  const { data: agents = [], isLoading } = useGetAgentsByAgencyQuery(agencyId, {
    skip: !agencyId
  });

  const [createAgent] = useCreateAgentMutation();
  const [updateAgent] = useUpdateAgentMutation();
  const [deleteAgent] = useDeleteAgentMutation();

  // Form handling with react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AgentFormData>({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      isActive: "true",
      password: "",
    },
  });

  // Translations
  const t = useTranslations("dashboard.agentManagement");
  const commonT = useTranslations("common");
  const navT = useTranslations("dashboard");

  // Handle form submission for create/update agent
  const onSubmit: SubmitHandler<AgentFormData> = async (data) => {
    if (!agencyId) {
      console.error('No agency ID found');
      Swal.fire({
        title: t('error.agencyNotFound'),
        icon: 'error',
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }

    try {
      if (selectedAgent?.id) {
        // Update existing agent
        await updateAgent({
          id: selectedAgent.id,
          ...data,
          agencyId,
          isActive: data.isActive === 'true',
        }).unwrap();
        
        Swal.fire({
          title: t("agent.management.update.success"),
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        });
      } else {
        // Create new agent
        await createAgent({
          ...data,
          agencyId,
          isActive: data.isActive === 'true',
        }).unwrap();
        
        Swal.fire({
          title: t("agent.management.create.success"),
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        });
      }
      
      reset();
      setSelectedAgent(null);
    } catch (error) {
      console.error("Error saving agent:", error);
      Swal.fire({
        title: commonT("error"),
        text: commonT("somethingWentWrong"),
        icon: "error",
      });
    }
  };

  // Handle agent deletion
  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: t("agent.management.delete.confirm"),
      text: t("agent.management.delete.warning"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: commonT("yesDelete"),
      cancelButtonText: commonT("cancel"),
    });

    if (result.isConfirmed) {
      try {
        await deleteAgent(id).unwrap();
        Swal.fire({
          title: t("agent.management.delete.success"),
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error deleting agent:", error);
        Swal.fire({
          title: commonT("error"),
          text: commonT("somethingWentWrong"),
          icon: "error",
        });
      }
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-50">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">{commonT("loading")}...</span>
        </div>
      </div>
    );
  }

  return (
    <>

      <div className="dashboard_sidebar_menu">
        <div
          className="offcanvas offcanvas-dashboard offcanvas-start"
          tabIndex="-1"
          id="DashboardOffcanvasMenu"
          data-bs-scroll="true"
        >
          <SidebarMenu />
        </div>
      </div>

      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
                <div className="col-lg-12">
                  <div className="dashboard_navigationbar dn db-1024">
                    <div className="dropdown">
                      <button
                        type="button"
                        className="btn btn-outline-primary d-flex align-items-center gap-2"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#DashboardOffcanvasMenu"
                        aria-label={navT("toggleNavigation")}
                        aria-expanded="false"
                        aria-controls="dashboard-offcanvas"
                      >
                        <FaBars className="me-2" />
                        <span>{navT("navigation")}</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-xl-4 mb10">
                  <div className="breadcrumb_content style2 mb30-991">
                    <h2 className="breadcrumb_title">
                      {t("agent.management.title")}
                    </h2>
                    <p>{t("agent.management.description")}</p>
                  </div>
                </div>

                <div className="container mt-0">
                  {/* Search & Create Agent */}
                  <div className="d-flex justify-content-between mb-3">
                    <div className="input-group w-50">
                      <span className="input-group-text bg-white">
                        <FaSearch />
                      </span>
                      <input
                        type="search"
                        className="form-control"
                        placeholder={t("agent.management.search.placeholder")}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        aria-label={t("agent.management.search.ariaLabel")}
                      />
                    </div>
                    <button
                      type="button"
                      className="btn btn-success d-flex align-items-center gap-2"
                      onClick={() => setSelectedAgent({
                        id: "",
                        name: "",
                        email: "",
                        phoneNumber: "",
                        isActive: true,
                        agencyId: user?.agency?.id || ""
                      })}
                      aria-label={t("agent.management.create.ariaLabel")}
                    >
                      <FaPlusCircle />
                      <span>{t("agent.management.create.button")}</span>
                    </button>
                  </div>

                  {/* Agents Table */}
                  <div className="table-responsive shadow-sm rounded">
                    <table className="table table-striped table-hover align-middle">
                      <thead className="table-dark">
                        <tr>
                          <th>{t("general.id")}</th>
                          <th>{t("general.name")}</th>
                          <th>{t("general.email")}</th>
                          <th>{t("general.phone")}</th>
                          <th>{t("general.status")}</th>
                          <th className="text-center">
                            {t("general.actions")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {agents
                          ?.filter((agent) =>
                            agent.name
                              .toLowerCase()
                              .includes(search.toLowerCase())
                          )
                          .map((agent) => (
                            <tr key={agent.id}>
                              <td>{agent.id}</td>
                              <td>{agent.name}</td>
                              <td>{agent.email}</td>
                              <td>{agent.phoneNumber || "N/A"}</td>
                              <td>
                                <span
                                  className={`badge ${
                                    agent.isActive ? "bg-success" : "bg-danger"
                                  }`}
                                >
                                  {agent.isActive
                                    ? t("general.active")
                                    : t("general.inactive")}
                                </span>
                              </td>
                              <td className="text-center">
                                <button
                                  className="btn btn-sm btn-warning me-2"
                                  onClick={() => setSelectedAgent(agent)}
                                >
                                  <i className="bi bi-pencil-square"></i>{" "}
                                  {t("general.edit")}
                                </button>
                                <button
                                  className="btn btn-sm btn-danger"
                                  onClick={() => handleDelete(agent.id)}
                                >
                                  <i className="bi bi-trash"></i>{" "}
                                  {t("general.delete")}
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Create/Edit Agent Modal */}
                  {selectedAgent !== null && (
                    <div className="modal fade show d-block" tabIndex="-1">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">
                              {selectedAgent.id
                                ? t("agent.management.edit")
                                : t("agent.management.creation")}
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              aria-label={t('general.close')}
                              onClick={() => setSelectedAgent(null)}
                            ></button>
                          </div>
                          <div className="modal-body">
                            <form
                              onSubmit={handleSubmit(onSubmit)}
                              className="space-y-4"
                            >
                              {/* Full Name */}
                              <div className="mb-3">
                                <label className="form-label">
                                  {t('general.name')}
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue={selectedAgent?.name || ""}
                                  {...register("name", {
                                    required: t("validation.required"),
                                  })}
                                />
                                {errors.name && (
                                  <div className="text-danger">
                                    {errors.name.message}
                                  </div>
                                )}
                              </div>

                              {/* Email */}
                              <div className="mb-3">
                                <label className="form-label">
                                  {t("general.email")}
                                </label>
                                <input
                                  type="email"
                                  className="form-control"
                                  defaultValue={selectedAgent?.email || ""}
                                  {...register("email", {
                                    required: t("validation.required"),
                                  })}
                                />
                                {errors.email && (
                                  <div className="text-danger">
                                    {errors.email.message}
                                  </div>
                                )}
                              </div>

                              {/* Password */}
                              <div className="mb-3">
                                <label className="form-label">
                                  {t("general.password")}
                                </label>
                                <input
                                  type="password"
                                  className="form-control"
                                  placeholder={t("general.passwordPlaceholder")}
                                  {...register("password")}
                                />
                              </div>

                              {/* Active Status Toggle */}
                              <div className="mb-3">
                                <label className="form-label">
                                  {t("general.status")}
                                </label>
                                <select
                                  className="form-select"
                                  defaultValue={
                                    selectedAgent?.isActive ? "true" : "false"
                                  }
                                  {...register("isActive", { required: t("validation.required") })}
                                >
                                  <option value="true">
                                    {t("general.active")}
                                  </option>
                                  <option value="false">
                                    {t("general.inactive")}
                                  </option>
                                </select>
                                {errors.isActive && (
                                  <div className="text-danger">
                                    {errors.isActive.message}
                                  </div>
                                )}
                              </div>

                              <div className="modal-footer">
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                  disabled={isSubmitting}
                                >
                                  {isSubmitting ? (
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                  ) : null}
                                  {t("general.save")}
                                </button>
                                <button
                                  className="btn btn-secondary"
                                  onClick={() => setSelectedAgent(null)}
                                >
                                  {t("general.cancel")}
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// Add display name for better debugging
AgentManagement.displayName = 'AgentManagement';

export default AgentManagement;
