"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "@/store/hooks";
import { useUpdateUserProfileMutation } from "@/features/api/user.api";

const SocialMedia = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [updateSocialMedia, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();

  const [socialMedia, setSocialMedia] = useState({
    skype: "",
    website: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    googlePlus: "",
    youtube: "",
    pinterest: "",
    vimeo: "",
  });

  // Populate social media data when user is loaded
  useEffect(() => {
    if (user?.socialMedia) {
      setSocialMedia({
        skype: user.socialMedia.skype || "",
        website: user.socialMedia.website || "",
        facebook: user.socialMedia.facebook || "",
        twitter: user.socialMedia.twitter || "",
        linkedin: user.socialMedia.linkedin || "",
        instagram: user.socialMedia.instagram || "",
        googlePlus: user.socialMedia.googlePlus || "",
        youtube: user.socialMedia.youtube || "",
        pinterest: user.socialMedia.pinterest || "",
        vimeo: user.socialMedia.vimeo || "",
      });
    }
  }, [user]);

  // Handle Input Changes
  const handleChange = (e) => {
    setSocialMedia({ ...socialMedia, [e.target.id]: e.target.value });
  };

  // Handle Social Media Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateSocialMedia(socialMedia).unwrap();
      toast.success("Social media updated successfully!");
    } catch (error) {
      toast.error("Failed to update social media.");
      console.error("Update Error:", error);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <form onSubmit={handleUpdate}>
      <div className="row">
        {Object.keys(socialMedia).map((key) => (
          <div className="col-lg-6 col-xl-6" key={key}>
            <div className="my_profile_setting_input form-group">
              <label htmlFor={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                type="text"
                className="form-control"
                id={key}
                value={socialMedia[key]}
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
      </div>
    </form>
  );
};

export default SocialMedia;
