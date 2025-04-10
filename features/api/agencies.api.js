import { apiSlice } from "./api";

export const agenciesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAgencies: builder.query({
      query: () => "/agencies",
      providesTags: ["Agencies"],
    }),
    getAgencyById: builder.query({
      query: (id) => `/agencies/${id}`,
      providesTags: (result, error, id) => [{ type: "Agencies", id }],
    }),
    createAgency: builder.mutation({
      query: (agency) => ({
        url: "/agencies",
        method: "POST",
        body: agency,
      }),
      invalidatesTags: ["Agencies"],
    }),
    updateAgency: builder.mutation({
      query: ({ id, agency }) => ({
        url: `/agencies/${id}`,
        method: "PATCH",
        body: agency,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Agencies", id },
        "User",
      ],
    }),
    deleteAgency: builder.mutation({
      query: (id) => ({
        url: `/agencies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Agencies"],
    }),
  }),
});

export const {
  useGetAllAgenciesQuery,
  useGetAgencyByIdQuery,
  useCreateAgencyMutation,
  useUpdateAgencyMutation,
  useDeleteAgencyMutation,
} = agenciesApi;
