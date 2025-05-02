// EditPropertyPage.tsx
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

import ProtectedRoute from "@/features/auth/ProtectedRoute";
import Header from "@/components/common/header/dashboard/Header";
import MobileMenu from "@/components/common/header/MobileMenu";
import SidebarMenu from "@/app/[locale]/(admin)/dashboard/SidebarMenu";

import {
  useFetchPropertyByIdQuery,
  useUpdatePropertyMutation,
  useUploadImagesMutation,
  useUploadAttachmentsMutation,
  useDeletePropertyImageMutation,
  useDeleteAttachmentMutation,
} from "@/features/api/properties.api";
import {
  resetCreateListing,
  setCreateListing,
} from "@/features/properties/propertiesSlice";

import CreateList from "../create-listing/CreateList";
import LocationField from "../create-listing/LocationField";
import DetailedInfo from "../create-listing/DetailedInfo";
import FloorPlans from "../create-listing/FloorPlans";
import PropertyMediaEditor from "../create-listing/PropertyMediaEditor";

const EditPropertyPage = () => {
  const t = useTranslations("property");
  const router = useRouter();
  const { id } = useParams();
  const propertyId = Number(id);
  const dispatch = useDispatch();

  // RTK Query hooks
  const {
    data: property,
    isLoading,
    isError,
  } = useFetchPropertyByIdQuery(propertyId, { skip: !propertyId });
  const [updateProperty] = useUpdatePropertyMutation();
  const [uploadImages] = useUploadImagesMutation();
  const [uploadAttachments] = useUploadAttachmentsMutation();
  const [deleteImage] = useDeletePropertyImageMutation();
  const [deleteAttachment] = useDeleteAttachmentMutation();

  // Local loading state
  const [saving, setSaving] = useState(false);

  // On mount: hydrater le slice avec les données
  useEffect(() => {
    if (property) {
      dispatch(setCreateListing(property));
    }
    return () => {
      dispatch(resetCreateListing());
    };
  }, [property, dispatch]);

  const listing = useSelector((state) => state.properties.createListing);
  const newImages = useSelector((state) => state.properties.newImages);
  const deletedImages = useSelector((state) => state.properties.deletedImages);
  const newAttachments = useSelector(
    (state) => state.properties.newAttachments
  );
  const deletedAttachment = useSelector(
    (state) => state.properties.deletedAttachment
  );

  // Supprimer une image existante
  const handleDeleteImage = async (imageId) => {
    try {
      await deleteImage(imageId).unwrap();

      Swal.fire(t("imageDeleted"), "", "success");
    } catch {
      Swal.fire(t("error"), t("imageDeleteError"), "error");
    }
  };

  // Supprimer une pièce‑jointe existante
  const handleDeleteAttachment = async (name) => {
    const { isConfirmed } = await Swal.fire({
      title: t("confirmDeleteAttachment"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("yes"),
      cancelButtonText: t("no"),
    });
    if (!isConfirmed) return;

    try {
      await deleteAttachment({ propertyId, name }).unwrap();
      dispatch(
        setCreateListing({
          ...listing,
          attachments: listing.attachments.filter((a) => a.name !== name),
        })
      );
      Swal.fire(t("attachmentDeleted"), "", "success");
    } catch {
      Swal.fire(t("error"), t("attachmentDeleteError"), "error");
    }
  };

  // Enregistrer toutes les modifications
  const handleSave = async () => {
    Swal.fire({
      title: t("savingAll"),
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });
    setSaving(true);

    try {
      // Étape 1 : Mise à jour des informations générales
      await updateProperty({
        id: propertyId,
        data: {
          ...listing,
          propertyImages: undefined, // on ne renvoie pas les fichiers
          attachments: undefined, // uploader séparément
        },
      }).unwrap();

      // Étape 2 : Upload des nouvelles images
      if (newImages?.length > 0) {
        await uploadImages({
          propertyId,
          images: newImages,
        }).unwrap();
      }

      // Étape 3 : Suppression des images marquées
      if (deletedImages?.length > 0) {
        await Promise.all(
          deletedImages.map(async (imageId) => {
            try {
              await deleteImage(imageId).unwrap();
            } catch (err) {
              console.warn("Erreur suppression image :", imageId, err);
              Swal.close();
              Swal.fire(
                t("error"),
                err?.data?.message || err.message || t("unknownError"),
                "error"
              );
              // Optionnel : afficher un toast ou stocker les erreurs pour feedback
            }
          })
        );
      }

      // Étape 4 : Upload des nouvelles pièces jointes
      if (newAttachments?.length > 0) {
        await uploadAttachments({
          propertyId,
          attachments: newAttachments,
        }).unwrap();
      }

      Swal.close();
      await Swal.fire({
        icon: "success",
        title: t("propertyUpdated"),
      });

      router.back();
    } catch (err) {
      Swal.close();
      Swal.fire(
        t("error"),
        err?.data?.message || err.message || t("unknownError"),
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) return <p>{t("loading")}</p>;
  if (isError) return <p>{t("errorLoading")}</p>;

  if (listing.id !== 0)
    return (
      <ProtectedRoute>
        <section className="col-lg-12 col-xl-12 ">
          <div className="container-fluid ovh">
            <div className="row">
              <div className="col-lg-12 maxw100flex-992">
                <div className="breadcrumb_content style2 mb30-991">
                  <h2 className="breadcrumb_title">{t("editProperty")}</h2>
                  <p>{t("manageDetails")}</p>
                </div>

                {/* === Tous les formulaires en un seul bloc === */}
                <div className="row">
                  <CreateList />
                  <DetailedInfo />
                  <LocationField />
                  {/* <FloorPlans /> */}
                  <PropertyMediaEditor />
                </div>

                {/* === Bouton Enregistrer === */}
                <div className="col-xl-12 mt30">
                  <div className="my_profile_setting_input text-end">
                    <button
                      onClick={handleSave}
                      className="btn btn2"
                      disabled={saving}
                    >
                      {saving ? (
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
              </div>
            </div>
          </div>
        </section>
      </ProtectedRoute>
    );

  return null;
};

export default EditPropertyPage;
