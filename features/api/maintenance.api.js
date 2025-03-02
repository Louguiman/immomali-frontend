import { apiSlice } from "./api";

export const maintenanceApi = apiSlice.injectEndpoints({
  tagTypes: ["Maintenance"],
  endpoints: (builder) => ({
    getAllRequests: builder.query({
      query: () => "/maintenance-requests",
      providesTags: ["Maintenance"],
    }),
    getRequestById: builder.query({
      query: (id) => `/maintenance-requests/${id}`,
      providesTags: (result, error, id) => [{ type: "Maintenance", id }],
    }),
    getRequestsByAgency: builder.query({
      query: (agencyId) =>
        `/maintenance-requests/by-agency?agencyId=${agencyId}`,
      providesTags: ["Maintenance"],
    }),
    getRequestsByAgent: builder.query({
      query: (agentId) => `/maintenance-requests/by-agent?agentId=${agentId}`,
      providesTags: ["Maintenance"],
    }),
    createRequest: builder.mutation({
      query: (newRequest) => ({
        url: "/maintenance-requests",
        method: "POST",
        body: newRequest,
      }),
      invalidatesTags: ["Maintenance"],
    }),
    updateRequest: builder.mutation({
      query: ({ id, ...updatedRequest }) => ({
        url: `/maintenance-requests/${id}`,
        method: "PATCH",
        body: updatedRequest,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Maintenance", id }],
    }),
  }),
});

export const {
  useGetAllRequestsQuery,
  useGetRequestByIdQuery,
  useGetRequestsByAgencyQuery,
  useGetRequestsByAgentQuery,
  useCreateRequestMutation,
  useUpdateRequestMutation,
} = maintenanceApi;
