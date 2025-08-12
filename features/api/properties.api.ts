import { apiSlice } from "./api";
import type { Property, PropertyFormData } from "../../types/property";

export const propertiesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSignedUrl: builder.mutation<string, string>({
      query: (imageUrl) => ({
        url: "properties/signed-url",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { imageUrl },
      }),
    }),
    uploadImages: builder.mutation<
      { success: boolean; urls: string[] },
      { propertyId: number; images: File[] }
    >({
      query: ({ propertyId, images }) => {
        const formData = new FormData();
        images.forEach((image: File) => formData.append("photos", image));
        return {
          url: `/properties/${propertyId}/upload-photos`,
          method: "POST",
          body: formData,
        };
      },
    }),
    deletePropertyImage: builder.mutation<void, string>({
      query: (id) => ({
        url: `/property-images/${id}`,
        method: "DELETE",
      }),
    }),
    uploadAttachments: builder.mutation<
      { success: boolean; urls: string[] },
      { propertyId: string; attachments: File[] }
    >({
      query: ({ propertyId, attachments }) => {
        const formData = new FormData();
        attachments.forEach((attachment: File) =>
          formData.append("attachments", attachment)
        );
        return {
          url: `/properties/${propertyId}/upload-attachments`,
          method: "POST",
          body: formData,
        };
      },
    }),
    deleteAttachment: builder.mutation<
      void,
      { propertyId: number; name: string }
    >({
      query: ({ propertyId, name }) => ({
        url: `/properties/${propertyId}/attachments/${name}`,
        method: "DELETE",
      }),
    }),
    fetchProperties: builder.query<Property[], Record<string, unknown>>({
      query: (params: Record<string, unknown>) => ({
        url: "/properties",
        params,
      }),
    }),
    getPropertiesByAgency: builder.query<Property[], void>({
      query: () => `/properties/by-agency`,
    }),
    fetchPropertyById: builder.query<Property | undefined, string>({
      query: (id: string) => `/properties/${id}`,
      providesTags: (_result, _error, id: string) => [
        { type: "Properties", id },
      ],
    }),
    fetchPropertyByUserId: builder.query<
      { data: Property[]; totalPage: number },
      string
    >({
      query: (id: string) => `/properties/user/${id}`,
    }),
    createProperty: builder.mutation<Property, PropertyFormData>({
      query: (property: PropertyFormData) => ({
        url: "/properties",
        method: "POST",
        body: property,
      }),
      invalidatesTags: [{ type: "Properties" as const, id: "LIST" }],
    }),
    searchProperties: builder.query<
      { data: Property[]; totalPage: number },
      { [key: string]: string | number | boolean }
    >({
      query: (params) => ({
        url: `properties/search`,
        method: "GET",
        params,
      }),
      keepUnusedDataFor: 60,
    }),
    getRentalProperties: builder.query<
      { data: Property[] },
      { [key: string]: string | number | boolean }
    >({
      query: (params) => ({
        url: `/properties/search?page=1&limit=16&type=rent`,
        method: "GET",
        params,
      }),
      keepUnusedDataFor: 60,
    }),
    getSaleProperties: builder.query<
      { data: Property[] },
      { [key: string]: string | number | boolean }
    >({
      query: (params) => ({
        url: `/properties/search?page=1&limit=16&type=sale`,
        method: "GET",
        params,
      }),
      keepUnusedDataFor: 60,
    }),
    getTopCities: builder.query<
      { city: string; count: number; imageUrl: string }[],
      void
    >({
      query: () => "statistics/top-cities",
    }),
    updateProperty: builder.mutation<
      Property,
      { id: string; updateData: Partial<Property> }
    >({
      query: ({ id, updateData }) => ({
        url: `/properties/${id}`,
        method: "PATCH",
        body: updateData,
      }),
      invalidatesTags: [{ type: "Properties" as const, id: "LIST" }],
    }),
    deleteProperty: builder.mutation<void, string>({
      query: (id) => ({
        url: `/properties/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Properties" as const, id: "LIST" }],
    }),
    searchAgencyProperties: builder.query<Property[], { query: string }>({
      query: ({ query }) => `/properties/search-agency?query=${query} `,
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
  useGetTopCitiesQuery,
  useDeleteAttachmentMutation,
  useDeletePropertyImageMutation,
} = propertiesApi;
