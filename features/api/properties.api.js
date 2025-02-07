import {
  Property,
  PropertyQueryParams,
} from "@/utils/interface/property.interface";
import { apiSlice } from "./api";
// TS
// export const extendedApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     fetchProperties: builder.query<Property[], PropertyQueryParams>({
//       query: (params) => ({
//         url: "/properties",
//         params,
//       }),
//     }),
//     fetchPropertyById: builder.query<Property, number>({
//       query: (id) => `/properties/${id}`,
//     }),
//     createProperty: builder.mutation<Property, Partial<Property>>({
//       query: (property) => ({
//         url: "/properties",
//         method: "POST",
//         body: property,
//       }),
//     }),
//   }),
// });

export const extendedApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Properties"],
  endpoints: (builder) => ({
    uploadImages: builder.mutation({
      query: ({ propertyId, images }) => {
        const formData = new FormData();
        images.forEach((image) => formData.append("images", image));
        return {
          url: `/property/${propertyId}/images`,
          method: "POST",
          body: formData,
        };
      },
    }),
    uploadAttachments: builder.mutation({
      query: ({ propertyId, attachments }) => {
        const formData = new FormData();
        attachments.forEach((attachment) =>
          formData.append("attachments", attachment)
        );
        return {
          url: `/property/${propertyId}/attachments`,
          method: "POST",
          body: formData,
        };
      },
    }),
    fetchProperties: builder.query({
      query: (params) => ({
        url: "/properties",
        params,
      }),
    }),
    fetchPropertyById: builder.query({
      query: (id) => `/properties/${id}`,
    }),
    fetchPropertyByUserId: builder.query({
      query: (id) => `/properties/user/${id}`,
    }),
    createProperty: builder.mutation({
      query: (property) => ({
        url: "/properties",
        method: "POST",
        body: property,
      }),
    }),
    searchProperties: builder.query({
      query: (params) => ({
        url: `properties/search`,
        method: "GET",
        params, // ✅ Ensure we pass an object, NOT URLSearchParams
      }),
      keepUnusedDataFor: 60, // Cache for 60 seconds
    }),
  }),
});

export const {
  useFetchPropertiesQuery,
  useCreatePropertyMutation,
  useFetchPropertyByIdQuery,
  useFetchPropertyByUserIdQuery,
  useSearchPropertiesQuery,
  useUploadAttachmentsMutation,
  useUploadImagesMutation,
} = extendedApiSlice;
