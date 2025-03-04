import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { refreshTokenSuccess } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // If token expired, attempt to refresh
  if (result?.error?.status === 401) {
    console.log("Token expired. Refreshing...");

    const refreshResult = await baseQuery(
      { url: "auth/refresh", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      const newToken = refreshResult.data.accessToken;
      console.log("refresh token : ", refreshResult);

      // Store the new token
      api.dispatch(refreshTokenSuccess(newToken));

      // Retry the original request with the new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logoutSuccess());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Users",
    "Tenancies",
    "Inquiries",
    "Properties",
    "Notifications",
    "Complaints",
    "Payments",
    "Tenants",
    "Permissions",
    "Reviews",
    "Agencies",
    "Agents",
    "InquiryReplies",
    "Invoices",
    "Maintenance",
  ],
  endpoints: () => ({}),
});
