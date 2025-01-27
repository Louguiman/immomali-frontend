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
  endpoints: (builder) => ({
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
  }),
});

export const {
  useFetchPropertiesQuery,
  useCreatePropertyMutation,
  useFetchPropertyByIdQuery,
  useFetchPropertyByUserIdQuery,
} = extendedApiSlice;
