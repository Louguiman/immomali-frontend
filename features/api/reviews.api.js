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
//   }),
// });

export const reviewsApi = apiSlice.injectEndpoints({
  tagTypes: ["Reviews"],
  endpoints: (builder) => ({
    // 🔹 Create a Review
    createReview: builder.mutation({
      query: ({ propertyId, ...review }) => ({
        url: `/reviews/${propertyId}`,
        method: "POST",
        body: review,
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure user is authenticated
        // },
      }),
      invalidatesTags: ["Reviews"],
    }),

    // 🔹 Get Reviews for a Property
    getReviews: builder.query({
      query: (propertyId) => `/reviews/${propertyId}`,
      providesTags: ["Reviews"],
    }),

    // 🔹 Delete a Review
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure user is authenticated
        },
      }),
      invalidatesTags: ["Reviews"],
    }),
  }), 
});

export const {
  useCreateReviewMutation,
  useGetReviewsQuery,
  useDeleteReviewMutation,
} = reviewsApi;
