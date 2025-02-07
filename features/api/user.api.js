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

    /** 🔹 Delete a User */
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `users/${userId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
