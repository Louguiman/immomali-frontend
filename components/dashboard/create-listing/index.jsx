"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Swal from "sweetalert2";

import {
  useCreatePropertyMutation,
  useUploadAttachmentsMutation,
  useUploadImagesMutation,
} from "@/features/api/properties.api";

import ProtectedRoute from "@/features/auth/ProtectedRoute";
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../../app/[locale]/(admin)/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import CreateList from "./CreateList";
import DetailedInfo from "./DetailedInfo";
import FloorPlans from "./FloorPlans";
import LocationField from "./LocationField";
import PropertyMediaUploader from "./PropertyMediaUploader";
import Stepper from "./Stepper";

const DRAFT_KEY = "draftPropertyId";

const Index = () => {
  const router = useRouter();
  const t = useTranslations("property");
  const propertyDetails = useSelector(
    (state) => state.properties.createListing
  );
  const user = useSelector((state) => state.auth.user);
  // State for the in‑flight property ID (draft) and loading:
  const [draftId, setDraftId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const [createProperty] = useCreatePropertyMutation();
  const [uploadImages] = useUploadImagesMutation();
  const [uploadAttachments] = useUploadAttachmentsMutation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) setDraftId(Number(saved));
    }
  }, []);

  const clearDraft = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(DRAFT_KEY);
    }
    setDraftId(null);
  };

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const handleImageUpload = async (propertyId, images) => {
    if (images?.length > 0) {
      try {
        const uploadImagesPayload = { propertyId, images };
        await uploadImages(uploadImagesPayload).unwrap();
        toast.success(t("imageUploadSuccess"), { autoClose: 2000 });
      } catch (err) {
        console.log("Error uploading images:", err);
        toast.error(t("imageUploadError", { message: err.message }), {
          autoClose: 2000,
        });
      }
    }
  };

  const handleAttachmentsUpload = async (propertyId, attachments) => {
    if (attachments?.length > 0) {
      try {
        const uploadAttachmentsPayload = { propertyId, attachments };
        await uploadAttachments(uploadAttachmentsPayload).unwrap();
        toast.success(t("attachmentsUploadSuccess"), {
          autoClose: 2000,
        });
      } catch (err) {
        console.log("Error uploading attachments:", err);
        toast.error(t("attachmentsUploadError", { message: err.message }), {
          autoClose: 2000,
        });
      }
    }
  };

  const handleSubmit = async () => {
    const { propertyImages, attachments, ...propertyData } = propertyDetails;

    Swal.fire({
      title: t("creatingProperty"),
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    setLoading(true);

    try {
      let propertyId = draftId;

      // 1️⃣ Create if we don't yet have an ID
      if (!propertyId) {
        const created = await createProperty({
          ...propertyData,
          userId: user.id,
        }).unwrap();
        propertyId = created.id;
        // persist for retries
        localStorage.setItem(DRAFT_KEY, propertyId.toString());
        setDraftId(propertyId);
        toast.success(t("propertyCreated"), { autoClose: 2000 });
      }

      // 2️⃣ Upload images if present
      if (propertyImages?.length > 0) {
        Swal.update({ title: t("uploadingImages") });
        await uploadImages({
          propertyId,
          images: propertyImages,
        }).unwrap();
        toast.success(t("imageUploadSuccess"), { autoClose: 2000 });
      }

      // 3️⃣ Upload attachments if present
      if (attachments?.length > 0) {
        Swal.update({ title: t("uploadingAttachments") });
        await uploadAttachments({
          propertyId,
          attachments,
        }).unwrap();
        toast.success(t("attachmentsUploadSuccess"), { autoClose: 2000 });
      }

      // ✅ All done
      Swal.close();
      clearDraft();
      await Swal.fire({
        icon: "success",
        title: t("propertyCreated"),
        timer: 2000,
        showConfirmButton: false,
      });
      router.push(`/listing-details-v2/${propertyId}`);
    } catch (err) {
      // error message keyed by phase for clarity
      console.log("property creation error:", err);

      Swal.close();
      await Swal.fire({
        icon: "error",
        title: t("error"),
        text: err?.data?.message || err.message,
      });
      // *draftId* remains set, so next click will retry only uploads if creation succeeded earlier
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      label: t("createListing"),
      component: (
        <CreateList
          activeStep={activeStep}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      ),
    },
    {
      label: t("location"),
      component: (
        <LocationField
          activeStep={activeStep}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      ),
    },
    {
      label: t("detailedInformation"),
      component: (
        <DetailedInfo
          activeStep={activeStep}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      ),
    },
    {
      label: t("propertyMedia"),
      component: (
        <PropertyMediaUploader
          activeStep={activeStep}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      ),
    },
    // { label: t("floorPlans"), component: <FloorPlans /> },
  ];

  return (
    <ProtectedRoute>
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
              <div className="breadcrumb_content style2">
                <h2 className="breadcrumb_title">{t("addNewProperty")}</h2>
                <p>{t("welcomeBack")}</p>
              </div>

              <div className="my_dashboard_review mt30">
                <Stepper
                  steps={steps}
                  activeStep={activeStep}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
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
                          <i className="fa fa-spinner fa-spin"></i>{" "}
                          {t("saving")}
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
      </section>
    </ProtectedRoute>
  );
};

export default Index;
