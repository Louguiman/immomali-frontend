"use client";
import { resetTenantForm, setLeaseField } from "@/features/tenant/tenantsSlice";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

const LeaseDetails = () => {
  const dispatch = useDispatch();
  const leaseDetails = useSelector((state) => state.tenants.leaseDetails);

  const handleChange = (e) => {
    const { id, value } = e.target;
    dispatch(setLeaseField({ field: id, value }));
  };

  return (
    <>
      <div className="col-lg-12 row">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="leaseStartDate">Lease Start Date</label>
          <input
            type="date"
            className="form-control"
            id="leaseStartDate"
            value={leaseDetails.leaseStartDate}
            onChange={handleChange}
          />
        </div>
        <div className="my_profile_setting_input form-group">
          <label htmlFor="leaseEbdDate">Lease End Date</label>
          <input
            type="date"
            className="form-control"
            id="leaseEndDate"
            value={leaseDetails.leaseEndDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="col-lg-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="monthlyRent">Monthly Rent (FCFA)</label>
          <input
            type="number"
            className="form-control"
            id="monthlyRent"
            value={leaseDetails.monthlyRent}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="col-lg-6">
        <div className="my_profile_setting_input form-group">
          <label>Security Deposit</label>
          <input
            type="number"
            className="form-control"
            id="securityDeposit"
            value={leaseDetails.securityDeposit}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="col-lg-6">
        <div className="my_profile_setting_input form-group">
          <label>Lease Type</label>
          <select
            className="form-control"
            id="leaseType"
            value={leaseDetails.leaseType}
            onChange={handleChange}
          >
            <option value="FIXED">Fixed-Term</option>
            <option value="MONTHLY">Month-to-Month</option>
          </select>
        </div>
      </div>

      <div className="col-lg-6">
        <div className="my_profile_setting_input form-group">
          <label>Lease Auto-Renewal</label>
          <select
            className="form-control"
            id="autoRenew"
            value={leaseDetails.autoRenew}
            onChange={handleChange}
          >
            <option value="">
              Should the lease be renewed at expiration automatically
            </option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
      </div>

      <div className="col-lg-6">
        <div className="my_profile_setting_input form-group">
          <label>Lease Status</label>
          <select
            className="form-control"
            id="leaseStatus"
            value={leaseDetails.leaseStatus}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="terminated">Terminated</option>
          </select>
        </div>
      </div>

      <div className="col-lg-6">
        <div className="my_profile_setting_input form-group">
          <label>Additional Terms</label>
          <input
            type="text"
            className="form-control"
            id="additionalTerms"
            value={leaseDetails.additionalTerms}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* 🔹 Reset Button */}
      <div className="col-xl-12">
        <div className="my_profile_setting_input">
          <button
            className="btn btn-danger"
            onClick={() => dispatch(resetTenantForm())}
          >
            Reset Form
          </button>
        </div>
      </div>
    </>
  );
};

export default LeaseDetails;
