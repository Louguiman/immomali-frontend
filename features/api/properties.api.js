import {
  Property,
  PropertyQueryParams,
} from "@/utils/interface/property.interface";
import { apiSlice } from "./api";

export const extendedApiSlice = apiSlice.injectEndpoints({
  tagTypes: ['Properties'],
  endpoints: (builder) => ({
    fetchProperties: builder.query<Property[], PropertyQueryParams>({
      query: (params) => ({
        url: "/properties",
        params,
      }),
      providesTags: (result, error, params) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Properties', id: id as string })),
              { type: 'Properties', id: 'LIST' },
            ]
          : [{ type: 'Properties', id: 'LIST' }],
    }),
    fetchPropertyById: builder.query<Property, number>({
      query: (id) => `/properties/${id}`,
      providesTags: (result, error, id) => [{ type: 'Properties', id }],
    }),
    createProperty: builder.mutation<Property, Partial<Property>>({
      query: (property) => ({
        url: "/properties",
        method: "POST",
        body: property,
      }),
      invalidatesTags: [{ type: 'Properties', id: 'LIST' }],
    }),
    getSignedUrl: builder.mutation({
      query: (imageUrl) => ({
        url: "properties/signed-url",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { imageUrl },
      }),
    }),
    uploadImages: builder.mutation({
      query: ({ propertyId, images }) => {
        const formData = new FormData();
        images.forEach((image) => formData.append("photos", image));
        return {
          url: `/properties/${propertyId}/upload-photos`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { propertyId }) => [{ type: 'Properties', id: propertyId }],
    }),
    deletePropertyImage: builder.mutation({
      query: (id) => ({
        url: `/property-images/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => result ? [{ type: 'Properties', id: result.propertyId }] : [],
    }),
    uploadAttachments: builder.mutation({
      query: ({ propertyId, attachments }) => {
        const formData = new FormData();
        attachments.forEach((attachment) =>
          formData.append("attachments", attachment)
        );
        return {
          url: `/properties/${propertyId}/upload-attachments`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { propertyId }) => [{ type: 'Properties', id: propertyId }],
    }),
    deleteAttachment: builder.mutation({
      query: (id) => ({
        url: `/attachments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => result ? [{ type: 'Properties', id: result.propertyId }] : [],
    }),
    getPropertiesByAgency: builder.query({
      query: () => `/properties/by-agency`,
      providesTags: (result, error, params) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Properties', id: id as string })),
              { type: 'Properties', id: 'LIST' },
            ]
          : [{ type: 'Properties', id: 'LIST' }],
    }),
    fetchPropertyByUserId: builder.query({
      query: (id) => `/properties/user/${id}`,
      providesTags: (result, error, params) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Properties', id: id as string })),
              { type: 'Properties', id: 'LIST' },
            ]
          : [{ type: 'Properties', id: 'LIST' }],
    }),
    searchProperties: builder.query({
      query: (params) => ({
        url: `properties/search`,
        method: "GET",
        params, // ✅ Ensure we pass an object, NOT URLSearchParams
      }),
      keepUnusedDataFor: 60, // Cache for 60 seconds
    }),
    getRentalProperties: builder.query({
      query: (params) => ({
        url: `/properties/search?page=1&limit=16&type=rent`,
        method: "GET",
        params, // ✅ Ensure we pass an object, NOT URLSearchParams
      }),
      keepUnusedDataFor: 60, // Cache for 60 seconds
    }),
    getSaleProperties: builder.query({
      query: (params) => ({
        url: `/properties/search?page=1&limit=16&type=sale`,
        method: "GET",
        params, // ✅ Ensure we pass an object, NOT URLSearchParams
      }),
      keepUnusedDataFor: 60, // Cache for 60 seconds
    }),
    updateProperty: builder.mutation({
      query: ({ id, ...updateData }) => ({
        url: `/properties/${id}`,
        method: "PATCH",
        body: updateData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Properties", id }],
    }),

    deleteProperty: builder.mutation({
      query: (id) => ({
        url: `/properties/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Properties", id }],
    }),

    searchAgencyProperties: builder.query({
      query: ({ query, agencyId }) =>
        `/properties/search-agency?query=${query} `,
    }),
  }),
});

export const {
  useGetSignedUrlMutation,
  useFetchPropertiesQuery,
  useCreatePropertyMutation,
  useFetchPropertyByIdQuery,
  useFetchPropertyByUserIdQuery,
  useSearchPropertiesQuery,
  useSearchAgencyPropertiesQuery,
  useUploadAttachmentsMutation,
  useUploadImagesMutation,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
  useGetSalePropertiesQuery,
  useGetRentalPropertiesQuery,
  useDeleteAttachmentMutation,
  useDeletePropertyImageMutation,
} = extendedApiSlice;
