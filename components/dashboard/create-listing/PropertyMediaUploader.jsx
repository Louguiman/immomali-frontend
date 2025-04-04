"use client";

import { useSelector, useDispatch } from "react-redux";
import selectedFiles from "../../../utils/selectedFiles";
import Image from "next/image";
import Swal from "sweetalert2";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  addPropertyImage,
  removePropertyImage,
  addAttachment,
  removeAttachment,
} from "@/features/properties/propertiesSlice";

const PropertyMediaUploader = ({ activeStep, onNext, onPrevious }) => {
  const t = useTranslations("property");
  const dispatch = useDispatch();
  const propertyImages = useSelector(
    (state) => state.properties.createListing.propertyImages
  );
  const attachments = useSelector(
    (state) => state.properties.createListing.attachments
  );

  // Validation Schema
  const schema = Yup.object().shape({
    images: Yup.mixed().required(),
    attachment: Yup.mixed(),
  });

  // Form Handling with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Multiple image select with validation
  const multipleImage = (e) => {
    const files = selectedFiles(e);

    // Check if any file already exists in the Redux state
    const isExist = files.some((file1) =>
      propertyImages.some((file2) => file1.name === file2.name)
    );

    if (!isExist) {
      files.forEach((file) => dispatch(addPropertyImage(file)));
    } else {
      Swal.fire({
        icon: "warning",
        title: t("imageAlreadySelected"),
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  // Delete image with confirmation
  const deleteImage = (name) => {
    Swal.fire({
      title: t("delete"),
      text: "Are you sure you want to delete this image?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removePropertyImage(name));
      }
    });
  };

  // Handle attachment upload
  const handleAttachmentUpload = (e) => {
    const files = selectedFiles(e);
    files.forEach((file) => dispatch(addAttachment(file)));
  };

  // Delete attachment with confirmation
  const deleteAttachment = (name) => {
    Swal.fire({
      title: t("delete"),
      text: "Are you sure you want to delete this attachment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeAttachment(name));
      }
    });
  };

  return (
    <div id="media" className="my_dashboard_review mt30 row">
      <h3 className="mb30">{t("propertyMedia")}</h3>

      <div className="col-lg-12">
        <ul className="mb-0">
          {propertyImages.length > 0 &&
            propertyImages.map((item, index) => (
              <li key={index} className="list-inline-item">
                <div className="portfolio_item">
                  <Image
                    width={200}
                    height={200}
                    className="img-fluid cover"
                    src={URL.createObjectURL(item)}
                    alt={item.name}
                  />
                  <div
                    className="edu_stats_list"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={t("delete")}
                  >
                    <a onClick={() => deleteImage(item.name)}>
                      <span className="flaticon-garbage"></span>
                    </a>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>

      <div className="col-lg-12">
        <div className="portfolio_upload ">
          <input
            type="file"
            multiple
            accept="image/png, image/gif, image/jpeg"
            onChange={multipleImage}
          />
          {errors.images && (
            <p className="text-danger">{errors.images.message}</p>
          )}
          <div className="icon">
            <span className="flaticon-download"></span>
          </div>
          <p>{t("dragAndDrop")}</p>
        </div>
      </div>

      <div className="col-xl-6">
        <div className="resume_uploader mb30 h250">
          <h3>{t("attachments")}</h3>
          <form
            onSubmit={handleAttachmentUpload}
            className="form-inline d-flex flex-wrap wrap mt100"
          >
            <input className="upload-path" />
            <label className="upload">
              <input type="file" onChange={handleAttachmentUpload} />
              {t("selectAttachment")}
            </label>
            {errors.attachment && (
              <p className="text-danger">{errors.attachment.message}</p>
            )}
          </form>

          {attachments.length > 0 && (
            <ul>
              {attachments.map((file, index) => (
                <li key={index}>
                  {file.name}{" "}
                  <button onClick={() => deleteAttachment(file.name)}>
                    {t("delete")}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="my_profile_setting_input overflow-hidden mt20">
        {activeStep > 0 && (
          <button
            type="button"
            className="btn btn1 float-start"
            onClick={onPrevious}
          >
            {t("back")}
          </button>
        )}
      </div>
    </div>
  );
};

export default PropertyMediaUploader;
