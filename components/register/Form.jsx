"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRegisterMutation } from "@/features/api/auth.api";
import { toast } from "react-toastify";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "user", // Default role
    agencyId: null,
    isActive: true,
  });

  const [signup, { isLoading }] = useRegisterMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup(formData).unwrap();
      toast.success("Registration successful!");
    } catch (err) {
      toast.error("Registration failed: " + err.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="heading text-center">
        <h3>Register to your account</h3>
        <p className="text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-thm">
            Login
          </Link>
        </p>
      </div>
      {/* End .heading */}

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
      {/* End .form-group */}

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
      {/* End .form-group */}

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
      {/* End .form-group */}

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
      {/* End .form-group */}

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
      {/* End .form-group */}

      {formData.role === "agent" && (
        <div className="form-group input-group">
          <input
            type="number"
            className="form-control"
            name="agencyId"
            value={formData.agencyId || ""}
            onChange={(e) => handleChange(e)}
            placeholder="Agency ID (if applicable)"
          />
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fa fa-building"></i>
            </div>
          </div>
        </div>
      )}
      {/* End .form-group */}

      <button
        type="submit"
        disabled={isLoading}
        className="btn btn-log w-100 btn-thm"
      >
        Register
      </button>
      {/* End .form-group */}
    </form>
  );
};

export default SignupForm;
