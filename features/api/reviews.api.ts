import { apiSlice } from "./api";
// TS
// export const reviewsApi = apiSlice.injectEndpoints({
//  tagTypes: ["Reviews"],
//   endpoints: (builder) => ({
//     // 🔹 Create a Review
//     createReview: builder.mutation<Review, { propertyId: number; comment: string; rating: number }>({
//       query: ({ propertyId, ...review }) => ({
//         url: `/reviews/${propertyId}`,
//         method: "POST",
//         body: review,
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure user is authenticated
//         },
//       }),
//       invalidatesTags: ["Reviews"],
//     }),

//     // 🔹 Get Reviews for a Property
//     getReviews: builder.query<Review[], number>({
//       query: (propertyId) => `/reviews/${propertyId}`,
//       providesTags: ["Reviews"],
//     }),

//     // 🔹 Delete a Review
//     deleteReview: builder.mutation<{ success: boolean }, number>({
//       query: (id) => ({
//         url: `/reviews/${id}`,
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure user is authenticated
//         },
//       }),
//       invalidatesTags: ["Reviews"],
//     }),
// });

export const reviewsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserReviews: builder.query({
      query: (userId) => `/reviews/user/${userId}`,
      providesTags: ["Reviews"],
    }),

    // 🔹 Create a Review
    createReview: builder.mutation({
      query: ({ propertyId, ...review }) => ({
        url: `/reviews/${propertyId}`,
        method: "POST",
        body: review,
      }),
      invalidatesTags: ["Reviews"],
    }),

    // 🔹 Get Reviews for a Property
    getReviews: builder.query({
      query: (propertyId) => `/reviews/${propertyId}`,
      providesTags: ["Reviews"],
    }),

    // Update a review
    updateReview: builder.mutation({
      query: ({ id, ...updateData }) => ({
        url: `/reviews/${id}`,
        method: "PATCH",
        body: updateData,
      }),
      invalidatesTags: ["Reviews"], // Refresh data after update
    }),

    // Delete a review
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reviews"], // Refresh data after deletion
    }),

    // Fetch reviews received by the logged-in user
    getReceivedReviews: builder.query({
      query: (userID) => `/reviews/received/${userID}`,
      providesTags: ["Reviews"],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetReviewsQuery,
  useGetAllUserReviewsQuery,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useGetReceivedReviewsQuery,
} = reviewsApi;
