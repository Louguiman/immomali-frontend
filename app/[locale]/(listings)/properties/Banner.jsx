"use client";
import { cn } from "@/utils/lib";
import React from "react";

const Banner = ({ className }) => {
  return (
    <div
      className={cn("position-relative w-100 overflow-hidden", className)}
      style={{ height: "120px" }}
    >
      {/* Banner background with luxury real estate image */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100 bg-image"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1560185127-6e0ce785b65d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      />

      {/* Gradient overlay for better text visibility */}
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-primary opacity-75" />

      {/* Content container */}
      <div className="position-relative h-100 container-fluid">
        <div className="row h-100 align-items-center justify-content-between">
          {/* Left side - Brand name */}
          <div className="col-auto d-none d-md-block">
            <span className="text-white fw-medium">SeaView Properties</span>
          </div>

          {/* Uncomment if you want to add a center search input */}
          {/* <div className="col-12 col-md-6 col-lg-4">
            <div className="position-relative">
              <input
                type="text"
                placeholder="Search properties, locations..."
                className="form-control rounded-pill ps-3 pe-5 bg-white bg-opacity-90"
              />
              <div className="position-absolute end-0 top-50 translate-middle-y me-3">
                <Search size={18} className="text-muted" />
              </div>
            </div>
          </div> */}

          {/* Uncomment if you want additional links */}
          {/* <div className="col-auto d-none d-md-flex">
            <div className="d-flex gap-3">
              <a
                href="#"
                className="text-white text-decoration-none opacity-75 hover-opacity-100"
              >
                For Sale
              </a>
              <a
                href="#"
                className="text-white text-decoration-none opacity-75 hover-opacity-100"
              >
                For Rent
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Banner;
