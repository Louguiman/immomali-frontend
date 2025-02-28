import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api";

export const userApi = apiSlice.injectEndpoints({
  tagTypes: ["Users"],
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

    // Update user profile
    updateUserProfile: builder.mutation({
      query: ({ userId, ...profileData }) => ({
        url: `/users/profile/${userId}`,
        method: "PATCH",
        body: profileData,
      }),
    }),

    // Upload Profile Image
    uploadProfileImage: builder.mutation({
      query: (formData) => ({
        url: "/users/upload-profile-image",
        method: "POST",
        body: formData,
      }),
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
} = userApi;
