import { apiSlice } from "./api";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchComplaints: builder.query({
      query: ({ tenantId }: { tenantId: number }) =>
        `/complaints?tenantId=${tenantId}`,
    }),
    createComplaint: builder.mutation({
      query: (complaint: any) => ({
        url: "/complaints",
        method: "POST",
        body: complaint,
      }),
    }),
  }),
});

export const { useCreateComplaintMutation, useFetchComplaintsQuery } =
  extendedApiSlice;
