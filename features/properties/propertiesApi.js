import { apiSlice } from "../api/api";

export const propertiesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProperties: builder.query({
      query: ({ page = 1, limit = 10, filters = {} }) => {
        const queryParams = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          ...filters,
        }).toString();
        return `/properties?${queryParams}`;
      },
      keepUnusedDataFor: 60, // Cache for 60 seconds
    }),
  }),
});
export const { useGetPropertiesQuery } = propertiesApi;
