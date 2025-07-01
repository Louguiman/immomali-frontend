"use client";

import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import Image from "next/image";
import Swal from "sweetalert2";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  addAttachment,
  removeAttachment,
  removeNewImage,
  markImageForDeletion,
  addNewImage,
} from "@/features/properties/propertiesSlice";
import { PropertyImage, PropertyAttachment } from "@/types/property";

interface PropertyMediaEditorProps {
  onDeleteImage?: (id: string) => Promise<void> | void;
  onDeleteAttachment?: (name: string) => Promise<void> | void;
}

// Form data type for file uploads
type FileUploadFormData = {
  images: FileList | undefined;
  attachment: FileList | undefined;
};

interface ImageItem extends Partial<PropertyImage> {
  name?: string;
  imageUrl?: string;
  file?: File;
}

const PropertyMediaEditor: React.FC<PropertyMediaEditorProps> = ({
  onDeleteImage,
  onDeleteAttachment,
}) => {
  const t = useTranslations("property");
  const dispatch = useAppDispatch();

  // Get data from Redux store with proper typing
  const propertyImages = useAppSelector(
    (state) => state.properties.createListing.propertyImages
  ) as PropertyImage[];

  const newImages = useAppSelector(
    (state) => state.properties.newImages || []
  ) as File[];

  const attachments = useAppSelector(
    (state) => state.properties.createListing.attachments
  ) as PropertyAttachment[];

  // Validation Schema
  const schema = Yup.object().shape({
    images: Yup.mixed()
      .test('required', t("validation.imagesRequired"), (value) => {
        return value instanceof FileList && value.length > 0;
      })
      .required(t("validation.imagesRequired")),
    attachment: Yup.mixed(),
  });

  // Form Handling with react-hook-form - using errors and form state
  const { formState: { errors } } = useForm<FileUploadFormData>({
    // @ts-expect-error - Yup and react-hook-form have some type incompatibilities
    resolver: yupResolver(schema as unknown as Yup.ObjectSchema<FileUploadFormData>),
    defaultValues: {
      images: undefined,
      attachment: undefined,
    },
  });

  // Multiple image select with validation
  const handleMultipleImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const files = Array.from(e.target.files);

    // Check if any file already exists in the Redux state
    const isDuplicate = files.some((file1) =>
      propertyImages.some((file2) => file1.name === file2.name) ||
      newImages.some((file2) => file1.name === file2.name)
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
    files.forEach((file) => dispatch(addNewImage(file)));

    // Reset the file input to allow selecting the same file again if needed
    e.target.value = '';
  }, [dispatch, propertyImages, newImages, t]);

  // Delete image with confirmation
  const deleteImage = useCallback(async (id: string, isFile: boolean) => {
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
      if (isFile) {
        dispatch(removeNewImage(id));
      } else {
        dispatch(markImageForDeletion(id));
        if (onDeleteImage) {
          await onDeleteImage(id);
        }
      }

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
  }, [dispatch, onDeleteImage, t]);

  // Handle attachment upload
  const handleAttachmentUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const files = Array.from(e.target.files);
    files.forEach((file) => dispatch(addAttachment({
      name: file.name,
      file,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    })));

    // Reset the file input
    e.target.value = '';
  }, [dispatch]);

  // Delete attachment with confirmation
  const deleteAttachment = useCallback(async (name: string) => {
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

      if (onDeleteAttachment) {
        await onDeleteAttachment(name);
      }

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
  }, [dispatch, onDeleteAttachment, t]);

  // Format file size to human readable format
  const formatFileSize = (bytes?: number): string => {
    if (!bytes && bytes !== 0) return '0 Bytes';
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  return (
    <div id="media" className="my_dashboard_review mt30 row">
      <h3 className="mb30">{t("propertyMedia")}</h3>

      <div className="col-lg-12">
        <ul className="mb-0">
          {[...propertyImages, ...newImages]?.map((item: ImageItem | File, index: number) => {
            const isFile = item instanceof File;
            const id = isFile ? item.name : (item as PropertyImage).id;
            const name = isFile ? item.name : (item as PropertyImage).originalName || '';
            const imageUrl = isFile
              ? URL.createObjectURL(item)
              : (item as PropertyImage).imageUrl || '';

            return (
              <li key={`${isFile ? 'file-' : 'image-'}${id || index}`} className="list-inline-item">
                <div className="portfolio_item position-relative">
                  <Image
                    width={200}
                    height={200}
                    className="img-fluid cover"
                    src={imageUrl}
                    alt={t("propertyImage")}
                    onLoad={() => {
                      // Revoke the object URL to avoid memory leaks
                      if (isFile && imageUrl.startsWith('blob:')) {
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
                        deleteImage(id, isFile);
                      }}
                      aria-label={t("deleteImage") as string}
                    >
                      <i className="flaticon-garbage"></i>
                    </button>
                  </div>
                  <div className="position-absolute bottom-0 start-0 w-100 bg-dark bg-opacity-50 text-white p-2 small text-truncate">
                    {name}
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
              <h5 className="mb-3">{t("uploadedAttachments")} ({attachments.length})</h5>
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
                        {formatFileSize(file.size)}
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
    </div>
  );
};

export default PropertyMediaEditor;
