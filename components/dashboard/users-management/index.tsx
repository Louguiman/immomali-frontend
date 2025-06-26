"use client";
import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { useDebounce } from "@/hooks/useDebounce";
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "@/features/api/user.api";

// Types
interface UsersResponse {
  data: User[];
  total: number;
  page: number;
  limit: number;
}

// Types for sorting
type SortField = 'name' | 'email' | 'role' | 'status';
type SortDirection = 'asc' | 'desc';

interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

// This interface is used to type the sort configuration state

interface UserRole {
  name: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  roles: UserRole[];
}

interface FormData {
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

// Constants
const ROLES = [
  { value: "user", label: "User" },
  { value: "agent", label: "Agent" },
  { value: "admin", label: "Admin" },
];

// Components
const Spinner = () => (
  <div className="text-center mt-5">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

const UserForm = ({
  user,
  onSave,
  onCancel,
}: {
  user: User | null;
  onSave: (data: FormData) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "user",
    isActive: user?.isActive ?? true,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal fade show d-block" tabIndex={-1} role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {user?.id ? "Edit User" : "Create User"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onCancel}
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="role" className="form-label">
                  Role
                </label>
                <select
                  className="form-select"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  {ROLES.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="isActive">
                  Active
                </label>
              </div>
              <div className="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onCancel}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const UsersManagement = () => {
  // State for search and filters
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'name',
    direction: 'asc',
  });
  
  // API call with all filters and sorting
  const { data: usersResponse, isLoading, refetch } = useGetAllUsersQuery({ 
    search: debouncedSearch,
    role: roleFilter || undefined,
    status: statusFilter || undefined,
    sortBy: sortConfig.field,
    sortOrder: sortConfig.direction,
    page: currentPage,
    limit: itemsPerPage 
  }) as { data: UsersResponse; isLoading: boolean; refetch: () => void };

  const users = usersResponse?.data || [];
  const totalItems = usersResponse?.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handleSort = (field: SortField) => {
    setSortConfig((prevConfig) => ({
      field,
      direction:
        prevConfig.field === field && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const getSortIcon = (field: SortField) => {
    if (sortConfig.field !== field) {
      return <FaSort className="ms-1" />;
    }
    return sortConfig.direction === "asc" ? (
      <FaSortUp className="ms-1" />
    ) : (
      <FaSortDown className="ms-1" />
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (userId: string) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")
    ) {
      try {
        await deleteUser(userId);
      } catch (error) {
        console.error(
          "Erreur lors de la suppression de l'utilisateur :",
          error
        );
      }
    }
  };

  const handleSaveUser = async (data: FormData) => {
    try {
      if (selectedUser) {
        await updateUser({ id: selectedUser.id, ...data }).unwrap();
      } else {
        await createUser(data).unwrap();
      }
      setIsModalOpen(false);
      setSelectedUser(null);
      refetch(); // Refresh the user list after saving
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="h3 mb-0">Gestion des utilisateurs</h1>
              <p className="mb-0 text-muted">
                Gérez les utilisateurs de votre plateforme
              </p>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCreateUser}
              aria-label="Ajouter un nouvel utilisateur"
            >
              <i className="bi bi-plus-lg me-2"></i>
              Ajouter un utilisateur
            </button>
          </div>

          <div className="card">
            <div className="card-header bg-white">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <i className="bi bi-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0"
                      placeholder="Rechercher des utilisateurs..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      aria-label="Rechercher des utilisateurs"
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <select
                    className="form-select"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    aria-label="Filtrer par rôle"
                  >
                    <option value="">Tous les rôles</option>
                    {ROLES.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3">
                  <select
                    className="form-select"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    aria-label="Filtrer par statut"
                  >
                    <option value="">Tous les statuts</option>
                    <option value="active">Actif</option>
                    <option value="inactive">Inactif</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort("name")}
                    >
                      <div className="d-flex align-items-center">
                        Nom
                        {getSortIcon("name")}
                      </div>
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort("email")}
                    >
                      <div className="d-flex align-items-center">
                        Email
                        {getSortIcon("email")}
                      </div>
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort("role")}
                    >
                      <div className="d-flex align-items-center">
                        Rôle
                        {getSortIcon("role")}
                      </div>
                    </th>
                    <th
                      className="cursor-pointer"
                      onClick={() => handleSort("status")}
                    >
                      <div className="d-flex align-items-center">
                        Statut
                        {getSortIcon("status")}
                      </div>
                    </th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((user: User) => (
                    <tr key={user.id}>
                      <td className="align-middle">
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 me-2">
                            <div className="avatar-sm bg-soft-primary rounded-circle text-center">
                              <i className="bi bi-person-fill fs-5 text-primary"></i>
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <h6 className="mb-0">{user.name}</h6>
                            <small className="text-muted">ID: {user.id}</small>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">{user.email}</td>
                      <td className="align-middle">
                        <span className="badge bg-info text-dark">
                          {user.roles[0]?.name || "Aucun rôle"}
                        </span>
                      </td>
                      <td className="align-middle">
                        <span
                          className={`badge ${user.isActive ? "bg-success" : "bg-secondary"}`}
                        >
                          {user.isActive ? "Actif" : "Inactif"}
                        </span>
                      </td>
                      <td className="text-end align-middle">
                        <div
                          className="btn-group"
                          role="group"
                          aria-label={`Actions pour ${user.name}`}
                        >
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleEditUser(user)}
                            aria-label={`Modifier ${user.name}`}
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteUser(user.id)}
                            aria-label={`Supprimer ${user.name}`}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {!users?.length && (
                    <tr>
                      <td colSpan={5} className="text-center py-4">
                        <div className="text-muted">
                          Aucun utilisateur trouvé
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="card-footer bg-white border-top-0">
              <div className="d-flex justify-content-between align-items-center">
                <div className="text-muted small">
                  {users?.length || 0} utilisateur(s) au total
                </div>
                <nav aria-label="Pagination">
                  <ul className="pagination pagination-sm mb-0">
                    <li
                      className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                    >
                      <button
                        className="page-link"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        aria-label="Page précédente"
                      >
                        Précédent
                      </button>
                    </li>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      // Calculate page numbers to show (current page in the middle when possible)
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <li
                          key={pageNum}
                          className={`page-item ${currentPage === pageNum ? "active" : ""}`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(pageNum)}
                            aria-label={`Page ${pageNum}`}
                            aria-current={
                              currentPage === pageNum ? "page" : undefined
                            }
                          >
                            {pageNum}
                          </button>
                        </li>
                      );
                    })}
                    <li
                      className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                    >
                      <button
                        className="page-link"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        aria-label="Page suivante"
                      >
                        Suivant
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && <div className="modal-backdrop fade show"></div>}

      {isModalOpen && (
        <UserForm
          user={selectedUser}
          onSave={handleSaveUser}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default UsersManagement;
