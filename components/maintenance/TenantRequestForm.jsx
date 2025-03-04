"use client";
import { useCreateRequestMutation } from "@/features/api/maintenance.api";
import { useState } from "react";
import { toast } from "react-toastify";

const TenantRequestForm = ({ propertyId, tenantId, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("general");
  const [priority, setPriority] = useState("medium");
  const [createRequest, { isLoading }] = useCreateRequestMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRequest({
        title,
        description,
        category,
        priority,
        tenantId,
        propertyId,
      }).unwrap();
      toast.success("Maintenance request submitted!");
      setTitle("");
      setDescription("");
      onClose();
    } catch (error) {
      toast.error("Error submitting request.");
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">New Maintenance Request</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <h3>New Maintenance Request</h3>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="general">General</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="electrical">Electrical</option>
                  <option value="hvac">HVAC</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Priority</label>
                <select
                  className="form-select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit Request"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantRequestForm;
