"use client";
import { useState } from "react";
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

const AgentManagement = () => {
  const { user } = useSelector((state) => state.auth); // Get logged-in agency
  const [search, setSearch] = useState("");
  const { data: agents, isLoading } = useGetAgentsByAgencyQuery(
    user?.agency?.id,
    {
      skip: !user?.agency?.id,
    }
  );

  const [createAgent] = useCreateAgentMutation();
  const [updateAgent] = useUpdateAgentMutation();
  const [deleteAgent] = useDeleteAgentMutation();
  const [selectedAgent, setSelectedAgent] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    isActive: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedAgent && selectedAgent.id) {
      await updateAgent({ id: selectedAgent.id, ...formData });
    } else {
      await createAgent({ ...formData, agencyId: user?.agency?.id });
    }
    setSelectedAgent(null);
    setFormData({
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      isActive: true,
    });
  };

  if (isLoading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );

  return (
    <>
      <Header />
      <MobileMenu />
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
                        <i className="fa fa-bars pr10"></i> Dashboard Navigation
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-xl-4 mb10">
                  <div className="breadcrumb_content style2 mb30-991">
                    <h2 className="breadcrumb_title">Agent Management</h2>
                    <p>Manage your agency's agents</p>
                  </div>
                </div>

                <div className="container mt-0">
                  {/* Search & Create Agent */}
                  <div className="d-flex justify-content-between mb-3">
                    <input
                      type="text"
                      className="form-control w-50"
                      placeholder="Search agents..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                      className="btn btn-success"
                      onClick={() => setSelectedAgent({})}
                    >
                      <i className="bi bi-plus-circle"></i> Add Agent
                    </button>
                  </div>

                  {/* Agents Table */}
                  <div className="table-responsive shadow-sm rounded">
                    <table className="table table-striped table-hover align-middle">
                      <thead className="table-dark">
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Status</th>
                          <th className="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {agents?.map((agent) => (
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
                                {agent.isActive ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td className="text-center">
                              <button
                                className="btn btn-sm btn-warning me-2"
                                onClick={() => setSelectedAgent(agent)}
                              >
                                <i className="bi bi-pencil-square"></i> Edit
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => deleteAgent(agent.id)}
                              >
                                <i className="bi bi-trash"></i> Delete
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
                              {selectedAgent.id ? "Edit Agent" : "Create Agent"}
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              onClick={() => setSelectedAgent(null)}
                            ></button>
                          </div>
                          <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                              {/* Full Name */}
                              <div className="mb-3">
                                <label className="form-label">Full Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={formData.name}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      name: e.target.value,
                                    })
                                  }
                                  required
                                />
                              </div>
                              {/* Email */}
                              <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                  type="email"
                                  className="form-control"
                                  value={formData.email}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      email: e.target.value,
                                    })
                                  }
                                  required
                                />
                              </div>
                              {/* Password (Optional for Edit) */}
                              <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                  type="password"
                                  className="form-control"
                                  placeholder="Leave blank to keep existing"
                                  value={formData.password || ""}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      password: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              Agency Selection
                              {/* <div className="mb-3">
                                <label className="form-label">Agency</label>
                                <select
                                  className="form-select"
                                  value={formData.agencyId || ""}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      agencyId: e.target.value
                                        ? Number(e.target.value)
                                        : null,
                                    })
                                  }
                                >
                                  <option value="">Select Agency</option>
                                  {agencies?.map((agency) => (
                                    <option key={agency.id} value={agency.id}>
                                      {agency.name}
                                    </option>
                                  ))}
                                </select>
                              </div> */}
                              {/* Active Status Toggle */}
                              <div className="mb-3">
                                <label className="form-label">Status</label>
                                <select
                                  className="form-select"
                                  value={formData.isActive ? "true" : "false"}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      isActive: e.target.value === "true",
                                    })
                                  }
                                >
                                  <option value="true">Active</option>
                                  <option value="false">Inactive</option>
                                </select>
                              </div>
                              {/* Modal Actions */}
                              <div className="modal-footer">
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                >
                                  Save
                                </button>
                                <button
                                  className="btn btn-secondary"
                                  onClick={() => setSelectedAgent(null)}
                                >
                                  Cancel
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
