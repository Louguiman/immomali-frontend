"use client";
import { useState } from "react";
import {
  useCreatePropertyMutation,
  useUploadAttachmentsMutation,
  useUploadImagesMutation,
} from "@/features/api/properties.api";
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import CreateList from "./CreateList";
import DetailedInfo from "./DetailedInfo";
import FloorPlans from "./FloorPlans";
import LocationField from "./LocationField";
import PropertyMediaUploader from "./PropertyMediaUploader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Index = () => {
  const dispatch = useDispatch();
  const propertyDetails = useSelector(
    (state) => state.properties.createListing
  );

  const [loading, setLoading] = useState(false);

  const [createProperty, { isLoading, isError, error }] =
    useCreatePropertyMutation();
  const [
    uploadImages,
    { isLoading: isUploading, isError: isUploadError, error: uploadError },
  ] = useUploadImagesMutation();
  const [
    uploadAttachments,
    {
      isLoading: isSendingAttachments,
      isError: isAttachmentsError,
      error: attachmentsError,
    },
  ] = useUploadAttachmentsMutation();

  const handleSubmit = async () => {
    setLoading(true);
    const { propertyImages, attachments, ...propertyData } = propertyDetails;

    try {
      toast.info("Creating property...", { autoClose: 2000 });

      // Step 1: Create property
      const { data: property } = await createProperty(propertyData).unwrap();

      // Step 2: Upload images
      if (propertyImages?.length > 0) {
        await uploadImages({
          propertyId: property.id,
          images: propertyImages,
        }).unwrap();
        toast.success("Images uploaded successfully!", { autoClose: 2000 });
      }

      // Step 3: Upload attachments
      if (attachments?.length > 0) {
        await uploadAttachments({
          propertyId: property.id,
          attachments,
        }).unwrap();
        toast.success("Attachments uploaded successfully!", {
          autoClose: 2000,
        });
      }

      toast.success("Property created successfully!", { autoClose: 2000 });
    } catch (err) {
      console.error("Error creating property:", err);
      toast.error("There was an error creating the property", {
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Main Header Nav */}
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

      {/* Dashboard Section */}
      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
                {/* Dashboard Navigation */}
                <div className="col-lg-12">
                  <div className="dashboard_navigationbar dn db-1024">
                    <div className="dropdown">
                      <button
                        className="dropbtn"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#DashboardOffcanvasMenu"
                        aria-controls="DashboardOffcanvasMenu"
                      >
                        <i className="fa fa-bars pr10"></i> Dashboard Navigation
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-lg-12 mb10">
                  <div className="breadcrumb_content style2">
                    <h2 className="breadcrumb_title">Add New Property</h2>
                    <p>We are glad to see you again!</p>
                  </div>
                </div>

                {/* Create Listing */}
                <div id="info" className="col-lg-12">
                  <div className="my_dashboard_review">
                    <div className="row">
                      <div className="col-lg-12">
                        <h3 className="mb30">Create Listing</h3>
                      </div>
                      <CreateList />
                    </div>
                  </div>

                  {/* Location */}
                  <div id="location" className="my_dashboard_review mt30">
                    <div className="row">
                      <div className="col-lg-12">
                        <h3 className="mb30">Location</h3>
                      </div>
                      <LocationField />
                    </div>
                  </div>

                  {/* Detailed Information */}
                  <div id="details" className="my_dashboard_review mt30">
                    <div className="col-lg-12">
                      <h3 className="mb30">Detailed Information</h3>
                    </div>
                    <DetailedInfo />
                  </div>

                  {/* Property Media */}
                  <div id="media" className="my_dashboard_review mt30">
                    <div className="col-lg-12">
                      <h3 className="mb30">Property Media</h3>
                    </div>
                    <PropertyMediaUploader />
                  </div>

                  {/* Submit Section */}
                  <div id="submit" className="col-xl-12">
                    <div className="my_profile_setting_input">
                      <button href="#details" className="btn btn1 float-start">
                        Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="btn btn2 float-end"
                        disabled={loading}
                      >
                        {loading ? (
                          <span>
                            <i className="fa fa-spinner fa-spin"></i> Saving...
                          </span>
                        ) : (
                          "Save"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
