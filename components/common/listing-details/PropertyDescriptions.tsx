"use client";

import { useState } from "react";
import { splitDescription } from "@/utils/splitDescription";

const PropertyDescriptions = ({ description }) => {
  const [expanded, setExpanded] = useState(false);
  const paragraphs = splitDescription(description);

  return (
    <>
      {/* Always show the first paragraph */}
      <p className="mb25">{paragraphs[0]}</p>

      {/* Show additional paragraphs only when expanded */}
      {paragraphs.length > 1 && (
        <div
          className={`collapse ${expanded ? "show" : ""}`}
          id="collapseExample"
        >
          <div className="card card-body">
            {paragraphs.slice(1).map((paragraph, index) => (
              <p key={index} className="mt10 mb10">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Toggle Button */}
      {paragraphs.length > 1 && (
        <p className="overlay_close">
          <a
            className="text-thm fz14"
            data-bs-toggle="collapse"
            href="#collapseExample"
            role="button"
            aria-expanded={expanded}
            aria-controls="collapseExample"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show Less" : "Show More"}{" "}
            <span
              className={`flaticon-download-1 fz12 ${
                expanded ? "rotate-180" : ""
              }`}
            ></span>
          </a>
        </p>
      )}
    </>
  );
};

export default PropertyDescriptions;
