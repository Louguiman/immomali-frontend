"use client";
import { useEffect, useState } from "react";
import {
  useCreateTenantMutation,
  useUpdateTenantMutation,
  useUploadLeaseDocumentsMutation,
} from "@/features/api/tenants.api";
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../../app/(admin)/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import TenantForm from "./TenantForm";
import LeaseDetails from "./LeaseDetails";
import DocumentUploader from "./DocumentUploader";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProtectedRoute from "@/features/auth/ProtectedRoute";
import { setLease, setTenant } from "@/features/tenant/tenantsSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const TenantManagement = ({ tenant }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  const tenantDetails = useSelector((state) => state.tenants.tenantDetails);
  const leaseDetails = useSelector((state) => state.tenants.leaseDetails);

  const [loading, setLoading] = useState(false);

  const [createTenant, { isLoading: isCreating }] = useCreateTenantMutation();
  const [updateTenant, { isLoading: isUpdating }] = useUpdateTenantMutation();
  const [uploadLeaseDocuments, { isLoading }] =
    useUploadLeaseDocumentsMutation();

  useEffect(() => {
    if (tenant) {
      const { lease, ...tenantDetails } = tenant;
      dispatch(setTenant(tenantDetails));
      dispatch(setLease(lease));
    }

    return () => {};
  }, [tenant]);

  const handleSubmit = async () => {
    let leaseId = null;
    setLoading(true);
    toast.info("Processing tenant details...", { autoClose: 2000 });

    try {
      const tenantData = {
        ...tenantDetails,
        leaseDetails,
        agentId: user.id,
      };

      let response;
      if (tenant?.id) {
        response = await updateTenant({
          id: tenant.id,
          data: tenantData,
        }).unwrap();
        toast.success("Tenant updated successfully!", { autoClose: 2000 });
      } else {
        response = await createTenant(tenantData).unwrap();
        leaseId = response.lease.id;
        toast.success("Tenant created successfully!", { autoClose: 2000 });
        router.back();
      }

      if (tenant?.leaseDocuments?.length > 0) {
        await uploadLeaseDocuments({
          leaseId,
          documents: tenant.leaseDocuments,
        }).unwrap();
        toast.success("Lease documents uploaded!", { autoClose: 2000 });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while processing the tenant.", {
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid ovh">
      <div className="row">
        <div className="col-lg-12 maxw100flex-992">
          <div className="row">
            <div className="col-lg-12 mb10">
              <div className="breadcrumb_content style2">
                <h2 className="breadcrumb_title">
                  {tenant?.id ? "Edit Tenant" : "Add New Tenant"}
                </h2>
                <p>Manage tenant lease details and rental agreements.</p>
              </div>
            </div>

            {/* Tenant Form */}
            <div id="info" className="col-lg-12">
              {/* <h4 className="breadcrumb_title">Tenant Details</h4> */}
              <TenantForm />
            </div>

            {/* Lease Details */}
            <div id="lease" className="my_dashboard_review mt30">
              <h2 className="breadcrumb_title">Lease Details</h2>
              <LeaseDetails />
            </div>

            {/* Document Upload */}
            <div id="documents" className="my_dashboard_review mt30">
              <DocumentUploader />
            </div>

            {/* Submit */}
            <div id="submit" className="col-xl-12">
              <div className="my_profile_setting_input">
                <button
                  className="btn btn1 float-start"
                  onClick={() => router.back()}
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="btn btn2 float-end"
                  disabled={loading}
                >
                  {loading ? (
                    <i className="fa fa-spinner fa-spin"></i>
                  ) : (
                    "Save Tenant"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantManagement;
