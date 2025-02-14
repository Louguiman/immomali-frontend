"use client";

import { useSelector, useDispatch } from "react-redux";
import selectedFiles from "../../../utils/selectedFiles";
import Image from "next/image";
import {
  addPropertyImage,
  removePropertyImage,
  addAttachment,
  removeAttachment,
} from "@/features/properties/propertiesSlice";

const PropertyMediaUploader = () => {
  const dispatch = useDispatch();
  const propertyImages = useSelector(
    (state) => state.properties.createListing.propertyImages
  );
  const attachments = useSelector(
    (state) => state.properties.createListing.attachments
  );

  // multiple image select
  const multipleImage = (e) => {
    const files = selectedFiles(e);

    // Check if any file already exists in the Redux state
    const isExist = files.some((file1) =>
      propertyImages.some((file2) => file1.name === file2.name)
    );

    if (!isExist) {
      files.forEach((file) => dispatch(addPropertyImage(file)));
    } else {
      alert("You have selected one image already!");
    }
  };

  // delete image
  const deleteImage = (name) => {
    dispatch(removePropertyImage(name));
  };

  // handle attachment upload
  const handleAttachmentUpload = (e) => {
    const files = selectedFiles(e);
    files.forEach((file) => dispatch(addAttachment(file)));
  };

  // delete attachment
  const deleteAttachment = (name) => {
    dispatch(removeAttachment(name));
  };

  return (
    <div className="row">
      <div className="col-lg-12">
        <ul className="mb-0">
          {propertyImages.length > 0
            ? propertyImages.map((item, index) => (
                <li key={index} className="list-inline-item">
                  <div className="portfolio_item">
                    <Image
                      width={200}
                      height={200}
                      className="img-fluid cover"
                      src={URL.createObjectURL(item)}
                      alt="fp1.jpg"
                    />
                    <div
                      className="edu_stats_list"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Delete"
                      data-original-title="Delete"
                    >
                      <a onClick={() => deleteImage(item.name)}>
                        <span className="flaticon-garbage"></span>
                      </a>
                    </div>
                  </div>
                </li>
              ))
            : undefined}
          {/* End li */}
        </ul>
      </div>
      {/* End .col */}

      <div className="col-lg-12">
        <div className="portfolio_upload">
          <input
            type="file"
            onChange={multipleImage}
            multiple
            accept="image/png, image/gif, image/jpeg"
          />
          <div className="icon">
            <span className="flaticon-download"></span>
          </div>
          <p>Drag and drop images here</p>
        </div>
      </div>
      {/* End .col */}

      <div className="col-xl-6">
        <div className="resume_uploader mb30">
          <h3>Attachments</h3>
          <form className="form-inline d-flex flex-wrap wrap">
            <input className="upload-path" />
            <label className="upload">
              <input type="file" onChange={handleAttachmentUpload} />
              Select Attachment
            </label>
          </form>
          {attachments.length > 0 && (
            <ul>
              {attachments.map((file, index) => (
                <li key={index}>
                  {file.name}{" "}
                  <button onClick={() => deleteAttachment(file.name)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {/* End .col */}
    </div>
  );
};

export default PropertyMediaUploader;
