"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadFromStorage } from "../properties/propertiesSlice";
import { setAuthToken } from "./authSlice";
import { RootState } from "@/store/store";

import { ReactNode } from "react";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(
      loadFromStorage({
        savedSearches: [],
        favorites: [],
        newImages: [],
        newAttachments: [],
        deletedImages: [],
        deletedAttachment: [],
        currentPage: 1,
        itemsPerPage: 5,
        recentlyViewed: [],
        createListing: {
          id: 0,
          userId: 0,
          title: "",
          description: "",
          type: "rent",
          category: "",
          price: 0,
          area: "",
          rooms: "1",
          beds: "",
          baths: "",
          garages: "",
          sqFt: "",
          builtYear: 2010,
          address: "",
          state: "",
          city: "",
          neighborhood: "",
          zipCode: "",
          country: "Mali",
          latitude: "",
          longitude: "",
          streetView: "",
          propertyImages: [],
          attachments: [],
          amenities: {
            airConditioning: false,
            barbeque: false,
            dryer: false,
            gym: false,
            laundry: false,
            lawn: false,
            microwave: false,
            outdoorShower: false,
            refrigerator: false,
            sauna: false,
            swimmingPool: false,
            tvCable: false,
            washer: false,
            wifi: false,
            windowCoverings: false,
          },
        },
        status: "",
        error: null,
        keyword: "",
        type: "",
        location: "",
        price: { min: 0, max: 0 },
        amenities: [],
        bathrooms: "",
        bedrooms: "",
        garages: "",
        yearBuilt: "",
        area: { min: "", max: "" },
        length: 0,
        compareList: [],
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (!auth.isAuthenticated && auth.accessToken) {
      const token = localStorage.getItem("token");
      if (token) {
        dispatch(setAuthToken({ accessToken: token }));
      }
    }
  }, [auth.isAuthenticated, dispatch, auth.accessToken]);

  return <>{children}</>;
}
