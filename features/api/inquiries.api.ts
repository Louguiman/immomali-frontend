import { apiSlice } from "./api";

// TS
// export const inquiriesApi = apiSlice.injectEndpoints({
//  tagTypes: ["Inquiries"],
//   endpoints: (builder) => ({
//     // 🔹 Create Inquiry
//     createInquiry: builder.mutation<Inquiry, Partial<Inquiry>>({
//       query: (inquiry) => ({
//         url: "/inquiries",
//         method: "POST",
//         body: inquiry,
//       }),
//       invalidatesTags: ["Inquiries"],
//     }),

//     // 🔹 Get All Inquiries (Supports Filters)
//     getAllInquiries: builder.query<{ data: Inquiry[]; total: number }, { page?: number; limit?: number }>({
//       query: ({ page = 1, limit = 10 }) => `/inquiries?page=${page}&limit=${limit}`,
//       providesTags: ["Inquiries"],
//     }),

//     // 🔹 Get Inquiry by ID
//     getInquiryById: builder.query<Inquiry, string>({
//       query: (id) => `/inquiries/${id}`,
//       providesTags: (result, error, id) => [{ type: "Inquiries", id }],
//     }),

//     // 🔹 Update Inquiry
//     updateInquiry: builder.mutation<Inquiry, { id: string; data: Partial<Inquiry> }>({
//       query: ({ id, data }) => ({
//         url: `/inquiries/${id}`,
//         method: "PATCH",
//         body: data,
//       }),
//       invalidatesTags: (result, error, { id }) => [{ type: "Inquiries", id }],
//     }),

//     // 🔹 Delete Inquiry
//     deleteInquiry: builder.mutation<{ success: boolean }, string>({
//       query: (id) => ({
//         url: `/inquiries/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Inquiries"],
//     }),
//   }),
// });

export const inquiriesApi = apiSlice.injectEndpoints({
  tagTypes: ["Inquiries"],
  endpoints: (builder) => ({
    // 🔹 Create Inquiry
    createInquiry: builder.mutation({
      query: (inquiry) => ({
        url: "/inquiries",
        method: "POST",
        body: inquiry,
      }),
      invalidatesTags: ["Inquiries"],
    }),

    // 🔹 Get All Inquiries (Supports Filters)
    getAllInquiries: builder.query({
      query: ({ page = 1, limit = 10 }) =>
        `/inquiries?page=${page}&limit=${limit}`,
      providesTags: ["Inquiries"],
    }),

    // 🔹 Get Inquiry by ID
    getInquiryById: builder.query({
      query: (id) => `/inquiries/${id}`,
      providesTags: (result, error, id) => [{ type: "Inquiries", id }],
    }),

    // 🔹 Update Inquiry
    updateInquiry: builder.mutation({
      query: ({ id, data }) => ({
        url: `/inquiries/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Inquiries", id }],
    }),

    // 🔹 Delete Inquiry
    deleteInquiry: builder.mutation({
      query: (id) => ({
        url: `/inquiries/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Inquiries"],
    }),

    getSentInquiries: builder.query({
      query: (userID) => `/inquiries/sent/${userID}`,
      providesTags: ["Inquiries"],
    }),

    getReceivedInquiries: builder.query({
      query: (userID) => `/inquiries/received/${userID}`,
      providesTags: ["Inquiries"],
    }),

    getInquiryReplies: builder.query({
      query: (inquiryId) => `/inquiry-replies/${inquiryId}`,
      providesTags: ["InquiryReplies"],
    }),

    sendInquiryReply: builder.mutation({
      query: (reply) => ({
        url: `/inquiry-replies/${reply.userId}`,
        method: "POST",
        body: reply,
      }),
      invalidatesTags: ["InquiryReplies"],
    }),
  }),
});

export const {
  useCreateInquiryMutation,
  useGetAllInquiriesQuery,
  useGetInquiryByIdQuery,
  useUpdateInquiryMutation,
  useDeleteInquiryMutation,
  useGetSentInquiriesQuery,
  useGetReceivedInquiriesQuery,
  useGetInquiryRepliesQuery,
  useSendInquiryReplyMutation,
} = inquiriesApi;
