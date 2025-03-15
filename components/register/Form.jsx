"use client";
import React, { useState } from "react";
import { Link } from "@/i18n/navigation";
import { toast } from "react-toastify";
import { useRegisterMutation } from "@/features/api/auth.api";
import { useCreateAgencyMutation } from "@/features/api/agencies.api";
import { useCreateAgentMutation } from "@/features/api/agents.api";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "user", // Default role
    agencyId: "",
    isActive: true,
    address: "",
    description: "",
    website: "",
  });

  const [registerUser, { isLoading: isRegistering }] = useRegisterMutation();
  const [createAgency, { isLoading: isCreatingAgency }] =
    useCreateAgencyMutation();
  const [createAgent, { isLoading: isCreatingAgent }] =
    useCreateAgentMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.role === "agency") {
        // Create an agency
        await createAgency({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
          role: formData.role,
          address: formData.address,
          description: formData.description,
          website: formData.website,
        }).unwrap();
        toast.success("Agency registered successfully!");
      } else if (formData.role === "agent") {
        // Create an agent
        await createAgent({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
          role: formData.role,
          agencyId: formData.agencyId ? parseInt(formData.agencyId) : null,
        }).unwrap();
        toast.success("Agent registered successfully!");
      } else {
        // Register a normal user
        await registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
          role: formData.role,
        }).unwrap();
        toast.success("User registered successfully!");
      }
    } catch (err) {
      toast.error("Registration failed: " + err.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="heading text-center">
        <h3>Register Your Account</h3>
        <p className="text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-thm">
            Login
          </Link>
        </p>
      </div>

      {/* Full Name */}
      <div className="form-group input-group">
        <input
          type="text"
          className="form-control"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Full Name"
        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="flaticon-user"></i>
          </div>
        </div>
      </div>

      {/* Email */}
      <div className="form-group input-group">
        <input
          type="email"
          className="form-control"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Email Address"
        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="fa fa-envelope-o"></i>
          </div>
        </div>
      </div>

      {/* Password */}
      <div className="form-group input-group">
        <input
          type="password"
          className="form-control"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Password"
        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="flaticon-password"></i>
          </div>
        </div>
      </div>

      {/* Phone Number */}
      <div className="form-group input-group">
        <input
          type="text"
          className="form-control"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          placeholder="Phone Number"
        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="fa fa-phone"></i>
          </div>
        </div>
      </div>

      {/* Role Selection */}
      <div className="form-group">
        <label className="form-label">Choose Your Role</label>
        <div className="role-selection">
          <label className="role-option">
            <input
              type="radio"
              name="role"
              value="user"
              checked={formData.role === "user"}
              onChange={handleChange}
            />
            <span className="role-text">
              <strong>User</strong>
              <p>Looking for properties? Sign up as a user.</p>
            </span>
          </label>

          <label className="role-option">
            <input
              type="radio"
              name="role"
              value="agent"
              checked={formData.role === "agent"}
              onChange={handleChange}
            />
            <span className="role-text">
              <strong>Agent</strong>
              <p>Manage and promote properties as an agent.</p>
            </span>
          </label>

          <label className="role-option">
            <input
              type="radio"
              name="role"
              value="agency"
              checked={formData.role === "agency"}
              onChange={handleChange}
            />
            <span className="role-text">
              <strong>Agency</strong>
              <p>List and manage properties for your agency.</p>
            </span>
          </label>
        </div>
      </div>

      {/* Agency ID (For Agents) */}
      {formData.role === "agent" && (
        <div className="form-group input-group">
          <input
            type="number"
            className="form-control"
            name="agencyId"
            value={formData.agencyId || ""}
            onChange={handleChange}
            placeholder="Agency ID (if applicable)"
          />
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fa fa-building"></i>
            </div>
          </div>
        </div>
      )}

      {/* Additional Fields for Agencies */}
      {formData.role === "agency" && (
        <>
          <div className="form-group input-group">
            <input
              type="text"
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Agency Description"
            />
          </div>

          <div className="form-group input-group">
            <input
              type="text"
              className="form-control"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Agency Address"
            />
          </div>

          <div className="form-group input-group">
            <input
              type="text"
              className="form-control"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="Agency Website (Optional)"
            />
          </div>
        </>
      )}

      <button
        type="submit"
        disabled={isRegistering || isCreatingAgency || isCreatingAgent}
        className="btn btn-log w-100 btn-thm"
      >
        {isRegistering || isCreatingAgency || isCreatingAgent
          ? "Registering..."
          : "Register"}
      </button>
    </form>
  );
};

export default SignupForm;
