import { apiSlice } from "./api";

export const userApi = apiSlice.injectEndpoints({
  tagTypes: ["Users", "User"],
  endpoints: (builder) => ({
    /** 🔹 Get All Users with Pagination & Search */
    getAllUsers: builder.query({
      query: ({ page = 1, search = "" }) =>
        `users?page=${page}&search=${search}`,
    }),

    /** 🔹 Create a New User */
    createUser: builder.mutation({
      query: (data) => ({
        url: "users",
        method: "POST",
        body: data,
      }),
    }),

    /** 🔹 Update User Details */
    updateUser: builder.mutation({
      query: ({ userId, data }) => ({
        url: `users/${userId}`,
        method: "PATCH",
        body: data,
      }),
    }),

    getUserById: builder.mutation({
      query: (userId) => ({
        url: `users/${userId}`,
        method: "GET",
      }),
    }),

    /** 🔹 Delete a User */
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `users/${userId}`,
        method: "DELETE",
      }),
    }),

    searchUsers: builder.query({
      query: (query) => `/users/search?query=${query}`,
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: "auth/change-password",
        method: "PATCH",
        body,
      }),
    }),
    // Update user profile
    updateUserProfile: builder.mutation({
      query: ({ id, ...profileData }) => ({
        url: `/users/profile/${id}`,
        method: "PATCH",
        body: profileData,
      }),
      invalidatesTags: ["User"],
    }),

    // Upload Profile Image
    uploadProfileImage: builder.mutation({
      query: (formData) => ({
        url: "/users/upload-profile-image",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUpdateUserProfileMutation,
  useUploadProfileImageMutation, // ✅ Now available for use
  useSearchUsersQuery,
  useChangePasswordMutation,
} = userApi;
