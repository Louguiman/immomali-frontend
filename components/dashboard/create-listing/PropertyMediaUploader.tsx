"use client";

import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import Image from "next/image";
import Swal from "sweetalert2";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import {
  addPropertyImage,
  removePropertyImage,
  addAttachment,
  removeAttachment,
} from "@/features/properties/propertiesSlice";
import {
  PropertyImage as PropertyImageType,
  PropertyAttachment,
} from "@/types/property";

interface PropertyMediaUploaderProps {
  activeStep: number;
  onNext: () => void;
  onPrevious: () => void;
}

interface PropertyMediaFormData {
  images: FileList | null;
  attachment: FileList | null;
  // Remove index signature for stricter typing; add explicit fields as needed
}

const PropertyMediaUploader: React.FC<PropertyMediaUploaderProps> = ({
  activeStep,
  onNext,
  onPrevious,
}) => {
  const t = useTranslations("property");
  const dispatch = useAppDispatch();

  // Get data from Redux store with proper typing
  const propertyImages = useAppSelector(
    (state) => state.properties.createListing.propertyImages
  ) as PropertyImageType[];

  const attachments = useAppSelector(
    (state) => state.properties.createListing.attachments
  ) as PropertyAttachment[];

  // Custom resolver to handle FileList types
  type ResolverResult = {
    values: PropertyMediaFormData;
    errors: {
      [key: string]: {
        type: string;
        message: string;
      };
    };
  };

  const customResolver = async (
    values: PropertyMediaFormData,
    _context: unknown,
    _options: unknown
  ): Promise<ResolverResult> => {
    // Validate required images
    if (!values.images || (values.images as FileList).length === 0) {
      return {
        values: {} as PropertyMediaFormData,
        errors: {
          images: {
            type: 'required',
            message: t('validation.imagesRequired') as string,
          },
        },
      };
    }
    
    // If validation passes
    return {
      values,
      errors: {},
    };
  };

  // Form Handling with react-hook-form
  const {
    formState: { errors },
  } = useForm<PropertyMediaFormData>({
    resolver: customResolver,
    defaultValues: {
      images: null,
      attachment: null,
    },
  });

  // Handle file selection with proper typing
  const getSelectedFiles = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): File[] => {
      if (!e.target.files?.length) return [];
      return Array.from(e.target.files);
    },
    []
  );

  // Multiple image select with validation
  const handleMultipleImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = getSelectedFiles(e);
      if (!files.length) return;

      // Check if any file already exists in the Redux state
      const isDuplicate = files.some(
        (file1) =>
          propertyImages.some((file2) => file1.name === file2.originalName) ||
          propertyImages.some((file2) => file1.name === file2.name)
      );

      if (isDuplicate) {
        Swal.fire({
          icon: "warning",
          title: t("imageAlreadySelected") as string,
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }

      // Add all new images to Redux
      files.forEach((file) => dispatch(addPropertyImage(file)));

      // Reset the file input to allow selecting the same file again if needed
      e.target.value = "";
    },
    [dispatch, propertyImages, t, getSelectedFiles]
  );

  // Delete image with confirmation
  const deleteImage = useCallback(
    async (id: string) => {
      const { isConfirmed } = await Swal.fire({
        title: t("delete") as string,
        text: t("confirmDeleteImage") as string,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: t("yes") as string,
        cancelButtonText: t("no") as string,
        confirmButtonColor: "#00b13c",
        cancelButtonColor: "#d33",
      });

      if (!isConfirmed) return;

      try {
        dispatch(removePropertyImage(id));
        await Swal.fire({
          icon: "success",
          title: t("imageDeleted") as string,
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error("Error deleting image:", error);
        await Swal.fire({
          icon: "error",
          title: t("error") as string,
          text: t("errorDeletingImage") as string,
        });
      }
    },
    [dispatch, t]
  );

  // Handle attachment upload
  const handleAttachmentUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = getSelectedFiles(e);
      if (!files.length) return;

      files.forEach((file) => {
        dispatch(
          addAttachment({
            name: file.name,
            file,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
          })
        );
      });

      // Reset the file input
      e.target.value = "";
    },
    [dispatch, getSelectedFiles]
  );

  // Delete attachment with confirmation
  const deleteAttachment = useCallback(
    async (name: string) => {
      const { isConfirmed } = await Swal.fire({
        title: t("delete") as string,
        text: t("confirmDeleteAttachment") as string,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: t("yes") as string,
        cancelButtonText: t("no") as string,
        confirmButtonColor: "#00b13c",
        cancelButtonColor: "#d33",
      });

      if (!isConfirmed) return;

      try {
        dispatch(removeAttachment(name));
        await Swal.fire({
          icon: "success",
          title: t("attachmentDeleted") as string,
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error("Error deleting attachment:", error);
        await Swal.fire({
          icon: "error",
          title: t("error") as string,
          text: t("errorDeletingAttachment") as string,
        });
      }
    },
    [dispatch, t]
  );

  return (
    <div id="media" className="my_dashboard_review mt30 row">
      <h3 className="mb30">{t("propertyMedia")}</h3>

      <div className="col-lg-12">
        <ul className="mb-0">
          {propertyImages.map((item, index) => {
            const imageUrl =
              item.url || (item.file ? URL.createObjectURL(item.file) : "");
            const altText = item.originalName || `Property Image ${index + 1}`;

            return (
              <li
                key={`${item.id || "new"}-${index}`}
                className="list-inline-item"
              >
                <div className="portfolio_item position-relative">
                  <Image
                    width={200}
                    height={200}
                    className="img-fluid cover"
                    src={imageUrl}
                    alt={altText}
                    onLoad={() => {
                      // Revoke the object URL to avoid memory leaks
                      if (item.file && imageUrl.startsWith("blob:")) {
                        URL.revokeObjectURL(imageUrl);
                      }
                    }}
                  />
                  <div
                    className="edu_stats_list position-absolute top-0 end-0 m-2"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={t("delete") as string}
                  >
                    <button
                      type="button"
                      className="btn btn-sm btn-danger p-1"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (item.id) {
                          deleteImage(item.id);
                        }
                      }}
                      aria-label={t("deleteImage") as string}
                    >
                      <i className="flaticon-garbage"></i>
                    </button>
                  </div>
                  <div className="position-absolute bottom-0 start-0 w-100 bg-dark bg-opacity-50 text-white p-2 small text-truncate">
                    {altText}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="col-lg-12">
        <div className="portfolio_upload position-relative">
          <input
            type="file"
            multiple
            accept="image/png, image/gif, image/jpeg, image/webp"
            onChange={handleMultipleImage}
            className="position-absolute w-100 h-100 opacity-0 cursor-pointer"
            aria-label={t("uploadImages") as string}
          />
          {errors.images && (
            <p className="text-danger small">
              {errors.images.message as string}
            </p>
          )}
          <div className="icon">
            <i className="flaticon-download fs-1"></i>
          </div>
          <p className="mb-0">{t("dragAndDrop")}</p>
          <p className="small text-muted mt-2">
            {t("supportedFormats")}: JPG, PNG, GIF, WEBP
          </p>
        </div>
      </div>

      <div className="col-xl-6">
        <div className="resume_uploader mb30 h-auto p-4">
          <h3 className="mb-4">{t("attachments")}</h3>

          <div className="mb-4">
            <label className="btn btn-outline-primary w-100">
              {t("selectAttachment")}
              <input
                type="file"
                className="d-none"
                onChange={handleAttachmentUpload}
                aria-label={t("selectAttachment") as string}
              />
            </label>
            {errors.attachment && (
              <p className="text-danger small mt-2">
                {errors.attachment.message as string}
              </p>
            )}
          </div>

          {attachments.length > 0 && (
            <div className="attachments-list">
              <h5 className="mb-3">
                {t("uploadedAttachments")} ({attachments.length})
              </h5>
              <ul className="list-group">
                {attachments.map((file, index) => (
                  <li
                    key={`attachment-${index}`}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div className="text-truncate me-2 max-w-[70%]">
                      <i className="far fa-file me-2"></i>
                      {file.name}
                    </div>
                    <div>
                      <span className="badge bg-secondary me-2">
                        {file.size ? formatFileSize(file.size) : "N/A"}
                      </span>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteAttachment(file.name)}
                        aria-label={t("deleteAttachment") as string}
                      >
                        <i className="far fa-trash-alt"></i>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="my_profile_setting_input overflow-hidden mt20 d-flex justify-content-between">
        {activeStep > 0 && (
          <button type="button" className="btn btn1" onClick={onPrevious}>
            {t("back")}
          </button>
        )}
        <button
          type="button"
          className="btn btn-dark"
          onClick={onNext}
          disabled={propertyImages.length === 0}
        >
          {t("next")}
        </button>
      </div>
    </div>
  );
};

// Format file size to human readable format
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export default PropertyMediaUploader;
