import {
  AuthResponse,
  LoginPayload,
  User,
} from "@/utils/interface/user.interface";
import { apiSlice } from "./api";
import {
  loginSuccess,
  logoutSuccess,
  refreshTokenSuccess,
  setAuthToken,
} from "../auth/authSlice";

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

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const accessToken = data.accessToken;
          dispatch(setAuthToken({ accessToken }));

          // Set the Authorization header for future requests
          dispatch(
            authApi.util.updateQueryData("getMe", undefined, (draft) => {
              draft.headers = {
                ...draft.headers,
                Authorization: `Bearer ${accessToken}`,
              };
            })
          );

          // Fetch user data using getMe after login
          const userResponse = await dispatch(
            authApi.endpoints.getMe.initiate(undefined, {
              forceRefetch: true,
            })
          ).unwrap();

          // Store user and access token in Redux
          dispatch(loginSuccess({ user: userResponse, accessToken }));
        } catch (error) {
          console.info("Login failed", error);
        }
      },
    }),

    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logoutSuccess());
        } catch (error) {
          console.log("Logout failed", error);
        }
      },
    }),

    refreshToken: builder.mutation({
      query: () => ({
        url: "auth/refresh",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(refreshTokenSuccess(data.accessToken));

          // Fetch user data after refresh token
          const userResponse = await dispatch(
            authApi.endpoints.getMe.initiate(undefined)
          ).unwrap();

          dispatch(
            loginSuccess({ user: userResponse, accessToken: data.accessToken })
          );
        } catch (error) {
          console.error("Refresh token failed", error);
        }
      },
    }),
    register: builder.mutation({
      query: (user) => ({
        url: "/auth/signup",
        method: "POST",
        body: user,
      }),
    }),
    getMe: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useGetMeQuery,
} = authApi;
