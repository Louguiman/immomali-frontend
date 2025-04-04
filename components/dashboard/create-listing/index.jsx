"use client";
import { useState } from "react";
import {
  useCreatePropertyMutation,
  useUploadAttachmentsMutation,
  useUploadImagesMutation,
} from "@/features/api/properties.api";
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../../app/[locale]/(admin)/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import CreateList from "./CreateList";
import DetailedInfo from "./DetailedInfo";
import FloorPlans from "./FloorPlans";
import LocationField from "./LocationField";
import PropertyMediaUploader from "./PropertyMediaUploader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProtectedRoute from "@/features/auth/ProtectedRoute";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Stepper from "./Stepper";

const Index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const t = useTranslations("property");
  const propertyDetails = useSelector(
    (state) => state.properties.createListing
  );
  const user = useSelector((state) => state.auth.user);

  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const [createProperty] = useCreatePropertyMutation();
  const [uploadImages] = useUploadImagesMutation();
  const [uploadAttachments] = useUploadAttachmentsMutation();

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
        console.error("Error uploading images:", err);
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
        console.error("Error uploading attachments:", err);
        toast.error(t("attachmentsUploadError", { message: err.message }), {
          autoClose: 2000,
        });
      }
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const { propertyImages, attachments, ...propertyData } = propertyDetails;

    try {
      toast.info(t("creatingProperty"), { autoClose: 2000 });

      const newProperty = await createProperty({
        ...propertyData,
        userId: user?.id,
      }).unwrap();

      toast.success(t("propertyCreated"), { autoClose: 2000 });

      // Upload images and attachments
      await handleImageUpload(newProperty.id, propertyImages);
      await handleAttachmentsUpload(newProperty.id, attachments);

      // Redirect to property details page
      router.push(`/listing-details-v2/${newProperty.id}`);
    } catch (err) {
      console.error("Error creating property:", err);
      toast.error(t("propertyCreationError", { message: err.message }), {
        autoClose: 2000,
      });
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
