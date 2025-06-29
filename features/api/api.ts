import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logoutSuccess } from "../auth/authSlice";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  BaseQueryApi,
} from "@reduxjs/toolkit/query";
import { RootState } from "@/store/store";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env["NEXT_PUBLIC_API_URL"],
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Removed custom BaseQueryApi interface to use the one from @reduxjs/toolkit/query

interface ExtraOptions {}

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  ExtraOptions
> = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: ExtraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);

  // If token expired, log out the user immediately (no refresh attempt)
  if (result?.error?.status === 401) {
    // console.log("Token expired. Refreshing...");

    // const refreshResult = await baseQuery(
    //   { url: "auth/refresh", method: "POST" },
    //   api,
    //   extraOptions
    // );

    // if (refreshResult?.data) {
    //   const newToken = refreshResult.data.accessToken;
    //   console.log("refresh token : ", refreshResult);
    //   api.dispatch(refreshTokenSuccess(newToken));
    //   result = await baseQuery(args, api, extraOptions);
    // } else {
    //   api.dispatch(logoutSuccess());
    // }
    api.dispatch(logoutSuccess());
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "User",
    "Users",
    "Tenancies",
    "Inquiries",
    "Properties",
    "UserProperties",
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
