"use client";
import { useEffect, useState } from "react";
import {
  useCreateTenantMutation,
  useUpdateTenantMutation,
  useUploadLeaseDocumentsMutation,
} from "@/features/api/tenants.api";
import TenantForm from "./TenantForm";
import LeaseDetails from "./LeaseDetails";
import DocumentUploader from "./DocumentUploader";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setLease, setTenant } from "@/features/tenant/tenantsSlice";
import { useRouter } from "next/navigation";
import Stepper from "../create-listing/Stepper";
import { useTranslations } from "next-intl";

const TenantManagement = ({ tenant }) => {
  const t = useTranslations("dashboard.TenantProfile");
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  const tenantDetails = useSelector((state) => state.tenants.tenantDetails);
  const leaseDetails = useSelector((state) => state.tenants.leaseDetails);

  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const [createTenant] = useCreateTenantMutation();
  const [updateTenant] = useUpdateTenantMutation();
  const [uploadLeaseDocuments] = useUploadLeaseDocumentsMutation();

  useEffect(() => {
    if (tenant) {
      const { lease, ...tenantDetails } = tenant;
      dispatch(setTenant(tenantDetails));
      dispatch(setLease(lease));
    }
  }, [tenant]);

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    let leaseId = null;
    setLoading(true);
    toast.info(t("processing"), { autoClose: 2000 });

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
        toast.success(t("updated"), { autoClose: 2000 });
      } else {
        response = await createTenant(tenantData).unwrap();
        leaseId = response.lease.id;
        toast.success(t("created"), { autoClose: 2000 });
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
      toast.error(t("error"), { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      label: t("editTenant"),
      component: (
        <TenantForm
          tenantToEdit={tenant}
          activeStep={activeStep}
          onNext={handleNext}
        />
      ),
    },
    {
      label: t("leaseDetails"),
      component: (
        <LeaseDetails
          activeStep={activeStep}
          onNext={handleNext}
          onPrevious={handleBack}
        />
      ),
    },
    {
      label: t("documentUpload"),
      component: (
        <DocumentUploader
          activeStep={activeStep}
          onNext={handleNext}
          onPrevious={handleBack}
        />
      ),
    },
  ];

  return (
    <div className="container-fluid ovh">
      <div className="row">
        <div className="col-lg-12 maxw100flex-992">
          <div className="row">
            <div className="col-lg-8 mb10">
              <div className="breadcrumb_content style2">
                <h2 className="breadcrumb_title">
                  {tenant?.id ? t("editTenant") : t("addTenant")}
                </h2>
                <p>Manage tenant lease details and rental agreements.</p>
              </div>
            </div>

            <div id="stepper" className="col-lg-8">
              <Stepper
                activeStep={activeStep}
                steps={steps}
                onNext={handleNext}
                onPrevious={handleBack}
                onFinish={handleSubmit}
                isLoading={loading}
              >
                {steps[activeStep].component}
              </Stepper>
            </div>
            {activeStep === steps.length - 1 && (
              <div id="submit" className="col-xl-12 mt30">
                <div className="my_profile_setting_input">
                  <button
                    onClick={handleSubmit}
                    className="btn btn2 float-end"
                    disabled={loading}
                  >
                    {loading ? (
                      <span>
                        <i className="fa fa-spinner fa-spin"></i> {t("saving")}
                      </span>
                    ) : (
                      t("save")
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantManagement;
