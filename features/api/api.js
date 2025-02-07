import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL, // Set in .env file
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const { accessToken } = getState().auth;
      if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);
      return headers;
    },
  }),
  tagTypes: [
    "Users",
    "Inquiries",
    "Properties",
    "Notifications",
    "Complaints",
    "Payments",
    "Tenants",
    "Permissions",
    "Reviews",
  ],
  endpoints: () => ({}),
});
