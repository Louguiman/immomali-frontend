"use client";

import { useCreateInquiryMutation } from "@/features/api/inquiries.api";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ContactWithAgent = ({ agentId }) => {
  const user = useSelector((state) => state.auth?.user); // Get logged-in user
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
    agentId: agentId,
  });

  const [createInquiry, { isLoading }] = useCreateInquiryMutation();

  // Pre-fill user data if logged in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createInquiry(formData).unwrap();
      toast.success("Inquiry sent successfully!");
      setFormData((prev) => ({ ...prev, message: "" })); // Reset only message field
    } catch (error) {
      toast.error("Failed to send inquiry. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul className="sasw_list mb0">
        <li className="search_area">
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={!!user} // Disable for logged-in users
            />
          </div>
        </li>

        <li className="search_area">
          <div className="form-group mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={!!user} // Disable for logged-in users
            />
          </div>
        </li>

        <li className="search_area">
          <div className="form-group mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              // disabled={!!user} // Disable for logged-in users
            />
          </div>
        </li>

        <li className="search_area">
          <div className="form-group mb-3">
            <textarea
              id="form_message"
              name="message"
              className="form-control"
              rows="5"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
        </li>

        <li>
          <div className="search_option_button">
            <button
              type="submit"
              className="btn btn-block btn-thm w-100"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Inquiry"}
            </button>
          </div>
        </li>
      </ul>
    </form>
  );
};

export default ContactWithAgent;
