"use client";

import {
  useUpdateUserProfileMutation,
  useUploadProfileImageMutation,
} from "@/features/api/user.api";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProfileInfo = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [updateUserProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();
  const [uploadProfileImage, { isLoading: isUploading }] =
    useUploadProfileImageMutation();

  // State for Profile Image Upload
  const [profileImage, setProfileImage] = useState(null);

  // State for Form Fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    firstName: "",
    lastName: "",
    position: "",
    license: "",
    taxNumber: "",
    phone: "",
    fax: "",
    mobile: "",
    language: "",
    companyName: "",
    address: "",
    about: "",
  });

  // upload profile
  // Prefill form with user data when fetched
  useEffect(() => {
    if (user) {
      setFormData({
        userId: user.id,
        name: user.name || "",
        email: user.email || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        position: user.position || "",
        license: user.license || "",
        taxNumber: user.taxNumber || "",
        phone: user.phone || "",
        fax: user.fax || "",
        mobile: user.mobile || "",
        language: user.language || "",
        companyName: user.companyName || "",
        address: user.address || "",
        about: user.about || "",
      });
    }
  }, [user]);

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle File Selection
  const handleFileChange = (e) => {
    if (e.target.files?.length) {
      setProfileImage(e.target.files[0]);
    }
  };

  // Upload Profile Image
  const handleUploadImage = async () => {
    if (!profileImage) {
      toast.error("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", profileImage);

    try {
      const response = await uploadProfileImage(formData).unwrap();
      toast.success("Profile image updated successfully!");
      console.log("Uploaded Image URL:", response.imageUrl);
    } catch (error) {
      toast.error("Failed to upload profile image.");
      console.error("Upload Error:", error);
    }
  };

  // Update Profile Information
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(formData).unwrap();
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error("Profile Update Error:", error);
    }
  };

  return (
    <form onSubmit={handleUpdateProfile}>
      <div className="row">
        <div className="col-lg-12">
          <div className="wrap-custom-file">
            <input
              type="file"
              id="image1"
              accept="image/png, image/gif, image/jpeg"
              onChange={handleFileChange}
            />
            <label
              style={
                profileImage
                  ? {
                      backgroundImage: `url(${URL.createObjectURL(
                        profileImage
                      )})`,
                    }
                  : undefined
              }
              htmlFor="image1"
            >
              <span>
                <i className="flaticon-download"></i> Upload Photo{" "}
              </span>
            </label>
          </div>
          <p>*Minimum 260px x 260px</p>
          {profileImage && (
            <button
              type="button"
              className="btn btn-primary mt-3"
              onClick={handleUploadImage}
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Save Image"}
            </button>
          )}
        </div>
        {/* End .col */}

        {/* Dynamic Form Fields */}
        {Object.keys(formData).map((key) => (
          <div className="col-lg-6 col-xl-6" key={key}>
            <div className="my_profile_setting_input form-group">
              <label htmlFor={key}>
                {key.replace(/([A-Z])/g, " $1").trim()}
              </label>
              <input
                type={key === "email" ? "email" : "text"}
                className="form-control"
                id={key}
                value={formData[key]}
                onChange={handleChange}
              />
            </div>
          </div>
        ))}

        <div className="col-xl-12 text-right">
          <div className="my_profile_setting_input">
            <button type="submit" className="btn btn2" disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </div>
        {/* End .col */}
      </div>
    </form>
  );
};

export default ProfileInfo;
