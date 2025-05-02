"use client";
import { useState, useEffect } from "react";
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../../app/[locale]/(admin)/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import {
  useGetAgentsByAgencyQuery,
  useCreateAgentMutation,
  useUpdateAgentMutation,
  useDeleteAgentMutation,
} from "@/features/api/agents.api";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form"; // Form validation
import { useTranslations } from "next-intl"; // Next-Intl for localization
import Swal from "sweetalert2"; // SweetAlert2 for alerts

const AgentManagement = () => {
  const { user } = useSelector((state) => state.auth); // Get logged-in agency
  const [search, setSearch] = useState("");
  const { data: agents, isLoading } = useGetAgentsByAgencyQuery(
    user?.agency?.id,
    { skip: !user?.agency?.id }
  );

  const [createAgent] = useCreateAgentMutation();
  const [updateAgent] = useUpdateAgentMutation();
  const [deleteAgent] = useDeleteAgentMutation();
  const [selectedAgent, setSelectedAgent] = useState(null);

  // Setting up form validation with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const t = useTranslations("dashboard.agentManagement");
  const translatedNavText = useTranslations("dashboard");

  // Handle submit (Create/Update Agent)
  const handleAgentSubmit = async (data) => {
    try {
      if (selectedAgent?.id) {
        await updateAgent({
          id: selectedAgent.id,
          agent: { ...data, isActive: data.isActive === "true" },
        }).unwrap();
        Swal.fire(t("agent.management.update.success"), "", "success");
      } else {
        await createAgent({
          ...data,
          agencyId: user?.agency?.id,
          isActive: data.isActive === "true",
        }).unwrap();
        Swal.fire(t("agent.management.create.success"), "", "success");
      }
      reset(); // Reset form after submit
      setSelectedAgent(null); // Deselect agent after submit
    } catch (error) {
      Swal.fire(t("general.error"), t("general.somethingWentWrong"), "error");
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await deleteAgent(id).unwrap();
      Swal.fire(t("agent.management.delete.success"), "", "success");
    } catch (error) {
      Swal.fire(t("general.error"), t("general.somethingWentWrong"), "error");
    }
  };

  if (isLoading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );

  return (
    <>
      {/* <Header />
      <MobileMenu /> */}
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
                        className="dropbtn"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#DashboardOffcanvasMenu"
                        aria-controls="DashboardOffcanvasMenu"
                      >
                        <i className="fa fa-bars pr10"></i>{" "}
                        {translatedNavText("navigation")}
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
                    <input
                      type="text"
                      className="form-control w-50"
                      placeholder={t("agent.management.search.placeholder")}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                      className="btn btn-success"
                      onClick={() => setSelectedAgent({})}
                    >
                      <i className="bi bi-plus-circle"></i>{" "}
                      {t("agent.management.create.button")}
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
                              aria-label={t("general.close")}
                              onClick={() => setSelectedAgent(null)}
                            ></button>
                          </div>
                          <div className="modal-body">
                            <form onSubmit={handleSubmit(handleAgentSubmit)}>
                              {/* Full Name */}
                              <div className="mb-3">
                                <label className="form-label">
                                  {t("general.name")}
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
                                  {...register("isActive")}
                                >
                                  <option value={true}>
                                    {t("general.active")}
                                  </option>
                                  <option value={false}>
                                    {t("general.inactive")}
                                  </option>
                                </select>
                              </div>

                              <div className="modal-footer">
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                >
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

export default AgentManagement;
