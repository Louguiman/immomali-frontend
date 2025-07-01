"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Swal from "sweetalert2";

import {
  useCreatePropertyMutation,
  useUploadAttachmentsMutation,
  useUploadImagesMutation,
} from "@/features/api/properties.api";
import { RootState } from "@/store/store";
import ProtectedRoute from "@/features/auth/ProtectedRoute";
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../../app/[locale]/(admin)/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import CreateList from "./CreateList";
import DetailedInfo from "./DetailedInfo";
import LocationField from "./LocationField";
import PropertyMediaUploader from "./PropertyMediaUploader";
import Stepper from "./Stepper";

// Define local types
interface PropertyImage {
  id: string;
  url: string;
  name?: string;
  file?: File;
  preview?: string;
}

interface PropertyAttachment {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  file?: File;
}

// Types for API payloads
interface UploadImagesPayload {
  propertyId: number;
  images: Array<{
    file: File;
    name: string;
    preview: string;
  }>;
}

interface UploadAttachmentsPayload {
  propertyId: number;
  attachments: Array<{
    file: File;
    name: string;
    type: string;
    size: number;
  }>;
}

interface Property {
  id: string;
  title: string;
  description: string;
  price?: number;
  type?: string;
  category?: string;
  // Add other property fields as needed
}

interface User {
  id: string;
  email?: string;
  name?: string;
  // Add other user fields as needed
}

interface CreateListingState extends Omit<Property, 'id'> {
  propertyImages: PropertyImage[];
  attachments: PropertyAttachment[];
  // Add other create listing specific fields
}

interface Step {
  label: string;
  component: React.ReactNode;
}

const DRAFT_KEY = "draftPropertyId";

const CreateListing = () => {
  const router = useRouter();
  const t = useTranslations("property");
  
  const propertyDetails = useSelector<import("@/store/store").RootState, CreateListingState>(
    (state) => state.properties.createListing
  );
  
  const user = useSelector<import("@/store/store").RootState, User | null>((state) => state.auth.user);
  
  const [draftId, setDraftId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);

  const [createProperty] = useCreatePropertyMutation();
  const [uploadImages] = useUploadImagesMutation();
  const [uploadAttachments] = useUploadAttachmentsMutation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) {
        try {
          setDraftId(parseInt(saved, 10));
        } catch (e) {
          console.error("Failed to parse draft ID:", e);
        }
      }
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

  const handleSubmit = async () => {
    if (!user?.id) {
      toast.error(t("userNotAuthenticated"));
      return;
    }

    const { propertyImages = [], attachments = [], ...propertyData } = propertyDetails;

    Swal.fire({
      title: t("creatingProperty"),
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    setLoading(true);

    try {
      let propertyId = draftId;

      // 1️⃣ Create property if we don't yet have an ID
      if (!propertyId) {
        const created = await createProperty({
          ...propertyData,
          userId: user.id,
        }).unwrap();
        
        if (created?.id) {
          propertyId = created.id;
          localStorage.setItem(DRAFT_KEY, propertyId.toString());
          setDraftId(propertyId);
          toast.success(t("propertyCreated"), { autoClose: 2000 });
        } else {
          throw new Error("Failed to create property: No ID returned");
        }
      }

      // 2️⃣ Upload images if present
      if (propertyImages.length > 0 && propertyId) {
        Swal.update({ title: t("uploadingImages") });
        try {
          const imagesToUpload = propertyImages
            .filter(img => img.file)
            .map(img => ({
              file: img.file!,
              name: img.name || `image-${Date.now()}`,
              preview: img.preview || img.url
            }));
          
          if (imagesToUpload.length > 0) {
            await uploadImages({
              propertyId,
              images: imagesToUpload
            } as UploadImagesPayload).unwrap();
          }
          toast.success(t("imageUploadSuccess"), { autoClose: 2000 });
        } catch (error) {
          console.error("Image upload error:", error);
          toast.error(t("imageUploadError"), { autoClose: 2000 });
          throw error; // Re-throw to be caught by the outer catch
        }
      }

      // 3️⃣ Upload attachments if present
      if (attachments.length > 0 && propertyId) {
        Swal.update({ title: t("uploadingAttachments") });
        try {
          const attachmentsToUpload = attachments
            .filter(attachment => attachment.file)
            .map(attachment => ({
              file: attachment.file!,
              name: attachment.name,
              type: attachment.type,
              size: attachment.size
            }));
          
          if (attachmentsToUpload.length > 0) {
            await uploadAttachments({
              propertyId,
              attachments: attachmentsToUpload
            } as UploadAttachmentsPayload).unwrap();
          }
          toast.success(t("attachmentsUploadSuccess"), { autoClose: 2000 });
        } catch (error) {
          console.error("Attachment upload error:", error);
          toast.error(t("attachmentsUploadError"), { autoClose: 2000 });
          throw error; // Re-throw to be caught by the outer catch
        }
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
      
      if (propertyId) {
        router.push(`/listing-details-v2/${propertyId}`);
      } else {
        router.push('/dashboard/my-properties');
      }
    } catch (error) {
      console.error("Property creation error:", error);
      
      Swal.close();
      await Swal.fire({
        icon: "error",
        title: t("error"),
        text: error instanceof Error ? error.message : t("unknownError"),
      });
    } finally {
      setLoading(false);
    }
  };

  const steps: Step[] = [
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
      label: t("media"),
      component: (
        <PropertyMediaUploader
          activeStep={activeStep}
          onNext={handleSubmit}
          onPrevious={handlePrevious}
        />
      ),
    },
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

export default CreateListing;
