import { Complaint } from "@/utils/interface/complaint.interace";
import { apiSlice } from "./api";

// TS
// export const extendedApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     fetchComplaints: builder.query<Complaint[], { tenantId: number }>({
//       query: ({ tenantId }) => `/complaints?tenantId=${tenantId}`,
//     }),
//     createComplaint: builder.mutation<Complaint, Partial<Complaint>>({
//       query: (complaint) => ({
//         url: "/complaints",
//         method: "POST",
//         body: complaint,
//       }),
//     }),
//   }),
// });

export const extendedApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Complaints"],
  endpoints: (builder) => ({
    fetchComplaints: builder.query({
      query: ({ tenantId }) => `/complaints?tenantId=${tenantId}`,
    }),
    createComplaint: builder.mutation({
      query: (complaint) => ({
        url: "/complaints",
        method: "POST",
        body: complaint,
      }),
    }),
  }),
});

export const { useCreateComplaintMutation, useFetchComplaintsQuery } =
  extendedApiSlice;
