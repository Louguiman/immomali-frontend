import {
  AuthResponse,
  LoginPayload,
  User,
} from "@/utils/interface/user.interface";
import { apiSlice } from "./api";

// TS
// export const extendedApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     login: builder.mutation<AuthResponse, LoginPayload>({
//       query: (credentials) => ({
//         url: "/auth/login",
//         method: "POST",
//         body: credentials,
//       }),
//     }),
//     register: builder.mutation<void, Partial<User>>({
//       query: (user) => ({
//         url: "/auth/register",
//         method: "POST",
//         body: user,
//       }),
//     }),
//     refreshToken: builder.query<AuthResponse, void>({
//       query: () => "/auth/refresh",
//     }),
//   }),
// });

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (user) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
      }),
    }),
    refreshToken: builder.query({
      query: () => "/auth/refresh",
    }),
  }),
});

export const { useLoginMutation, useRefreshTokenQuery, useRegisterMutation } =
  extendedApiSlice;
