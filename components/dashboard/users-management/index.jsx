"use client";
import { useState } from "react";
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../../app/(admin)/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "@/features/api/user.api";

// import TableData from "./TableData";
// import Filtering from "./Filtering";
// import Pagination from "./Pagination";
// import SearchBox from "./SearchBox";

const index = () => {
  const [search, setSearch] = useState("");
  const { data: users, isLoading } = useGetAllUsersQuery({ search });
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    isActive: true,
  });

  if (isLoading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedUser) {
      await updateUser({ userId: selectedUser.id, data: formData });
    } else {
      await createUser(formData);
    }
    setSelectedUser(null);
    setFormData({ name: "", email: "", role: "user", isActive: true });
  };

  return (
  
      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
                {/* Start Dashboard Navigation */}
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
                {/* End Dashboard Navigation */}

                <div className="col-lg-4 col-xl-4 mb10">
                  <div className="breadcrumb_content style2 mb30-991">
                    <h2 className="breadcrumb_title">User Management</h2>
                    <p>Here, you can create, edit or delete users!</p>
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-8 col-xl-8">
                  <div className="candidate_revew_select style2 text-end mb30-991">
                    <ul className="mb0">
                      <li className="list-inline-item">
                        <div className="candidate_revew_search_box course fn-520">
                          {/* <SearchBox /> */}
                        </div>
                      </li>
                      {/* End li */}

                      <li className="list-inline-item">
                        {/* <Filtering /> */}
                      </li>
                      {/* End li */}
                    </ul>
                  </div>
                </div>
                {/* End .col */}

                {/* End .col */}
                {/* //TODO ADd USER table here */}
              </div>
              {/* End .row */}

              <div className="container mt-0">
                {/* Search & Create User */}
                <div className="d-flex justify-content-between mb-3">
                  <input
                    type="text"
                    className="form-control w-50"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button
                    className="btn btn-success"
                    onClick={() => setSelectedUser({})}
                  >
                    <i className="bi bi-plus-circle"></i> Add User
                  </button>
                </div>

                {/* User Table */}
                <div className="table-responsive shadow-sm rounded">
                  <table className="table table-striped table-hover align-middle">
                    <thead className="table-dark">
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users?.map((user) => (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            <span className="badge bg-info text-dark">
                              {user.roles.map((item, i) => (
                                <p key={i}>{item.name}</p>
                              ))}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`badge ${
                                user.isActive ? "bg-success" : "bg-danger"
                              }`}
                            >
                              {user.isActive ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="text-center">
                            <button
                              className="btn btn-sm btn-warning me-2"
                              onClick={() => setSelectedUser(user)}
                            >
                              <i className="bi bi-pencil-square"></i> Edit
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => deleteUser(user.id)}
                            >
                              <i className="bi bi-trash"></i> Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Create/Edit User Modal */}
                {selectedUser !== null && (
                  <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">
                            {selectedUser.id ? "Edit User" : "Create User"}
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            onClick={() => setSelectedUser(null)}
                          ></button>
                        </div>
                        <div className="modal-body">
                          <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                              <label className="form-label">Name</label>
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
                            <div className="mb-3">
                              <label className="form-label">Role</label>
                              <select
                                className="form-select"
                                value={formData.role}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    role: e.target.value,
                                  })
                                }
                              >
                                <option value="user">User</option>
                                <option value="agent">Agent</option>
                                <option value="agency">Agency</option>
                                <option value="admin">Admin</option>
                              </select>
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Status</label>
                              <select
                                className="form-select"
                                value={formData.isActive}
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
                            <div className="modal-footer">
                              <button type="submit" className="btn btn-primary">
                                Save
                              </button>
                              <button
                                className="btn btn-secondary"
                                onClick={() => setSelectedUser(null)}
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
              <div className="row mt50">
                <div className="col-lg-12">
                  <div className="copyright-widget text-center">
                    <p>© 2020 Find House. Made with love.</p>
                  </div>
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .col */}
          </div>
        </div>
      </section>
    </>
  );
};

export default index;
