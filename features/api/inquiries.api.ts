import { apiSlice } from "./api";

export const inquiriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 Create Inquiry
    createInquiry: builder.mutation({
      query: (inquiry: any) => ({
        url: "/inquiries",
        method: "POST",
        body: inquiry,
      }),
      invalidatesTags: ["Inquiries"],
    }),

    // 🔹 Get All Inquiries (Supports Filters)
    getAllInquiries: builder.query({
      query: ({ page = 1, limit = 10 }: { page?: number; limit?: number }) =>
        `/inquiries?page=${page}&limit=${limit}`,
      providesTags: ["Inquiries"],
    }),

    // 🔹 Get Inquiry by ID
    getInquiryById: builder.query({
      query: (id: string) => `/inquiries/${id}`,
      providesTags: (_: any, __: any, id: string) => [
        { type: "Inquiries", id },
      ],
    }),

    // 🔹 Update Inquiry
    updateInquiry: builder.mutation({
      query: ({ id, data }: { id: string; data: any }) => ({
        url: `/inquiries/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_: any, __: any, { id }: { id: string }) => [
        { type: "Inquiries", id },
      ],
    }),

    // 🔹 Delete Inquiry
    deleteInquiry: builder.mutation({
      query: (id: string) => ({
        url: `/inquiries/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Inquiries"],
    }),

    getSentInquiries: builder.query({
      query: (userID: string) => `/inquiries/sent/${userID}`,
      providesTags: ["Inquiries"],
    }),

    getReceivedInquiries: builder.query({
      query: (userID: string) => `/inquiries/received/${userID}`,
      providesTags: ["Inquiries"],
    }),

    getInquiryReplies: builder.query({
      query: (inquiryId: string) => `/inquiry-replies/${inquiryId}`,
      providesTags: ["InquiryReplies"],
    }),

    sendInquiryReply: builder.mutation({
      query: (reply: any) => ({
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
