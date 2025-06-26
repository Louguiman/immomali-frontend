"use client";
import React from "react";

const getIconClass = (ext) => {
  switch (ext) {
    case "pdf":
      return "flaticon-pdf";
    case "doc":
    case "docx":
      return "flaticon-document";
    case "xls":
    case "xlsx":
      return "flaticon-excel";
    case "ppt":
    case "pptx":
      return "flaticon-presentation";
    default:
      return "flaticon-document"; // generic fallback
  }
};

const Attachments = ({ attachments }) => {
  if (!attachments || attachments.length === 0) {
    return <p>No attachments available.</p>;
  }

  return (
    <>
      {attachments.map((url, idx) => {
        // Grab everything after the last slash, then decode any %20 etc
        const rawFilename = url.substring(url.lastIndexOf("/") + 1);
        const filename = decodeURIComponent(rawFilename);
        const ext = filename.split(".").pop().toLowerCase();
        const iconClass = getIconClass(ext);

        return (
          <div className="icon_box_area style2" key={idx}>
            <div className="score">
              <span className={`${iconClass} text-thm fz30`} />
            </div>
            <div className="details">
              <h5>
                <a
                  href={url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  <span className="flaticon-download text-thm pr10" />
                  {filename}
                </a>
              </h5>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Attachments;
