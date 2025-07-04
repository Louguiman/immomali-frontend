import { apiSlice } from "./api";

export const maintenanceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRequests: builder.query({
      query: () => "/maintenance-requests",
      providesTags: ["Maintenance"],
    }),
    getRequestById: builder.query({
      query: (id) => `/maintenance-requests/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Maintenance", id }],
    }),
    getRequestsByAgency: builder.query({
      query: (agencyId) =>
        `/maintenance-requests/by-agency?agencyId=${agencyId}`,
      providesTags: ["Maintenance"],
    }),
    getUserMaintenanceRequests: builder.query({
      query: (tenantId) =>
        `/maintenance-requests/by-tenant?tenantId=${tenantId}`,
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
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Maintenance", id },
      ],
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
  useGetUserMaintenanceRequestsQuery,
} = maintenanceApi;
