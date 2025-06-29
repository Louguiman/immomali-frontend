import { apiSlice } from "./api";
import { loginSuccess, logoutSuccess, setAuthToken } from "../auth/authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const accessToken = data.accessToken;
          dispatch(setAuthToken({ accessToken }));

          // Fetch user data using getMe after login
          const userResponse = await dispatch(
            authApi.endpoints["getMe"].initiate(undefined, {
              forceRefetch: true,
            })
          ).unwrap();

          // Only dispatch loginSuccess if userResponse and accessToken are valid
          if (userResponse && accessToken) {
            dispatch(loginSuccess({ user: userResponse, accessToken }));
            console.log("loginSuccess dispatched with:", {
              user: userResponse,
              accessToken,
            });
          } else {
            throw new Error("User or accessToken missing after login");
          }
        } catch (error) {
          console.info("Login failed or getMe failed", error);
        }
      },
    }),

    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      async onQueryStarted({ dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logoutSuccess());
        } catch (error) {
          console.log("Logout failed", error);
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
      providesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGetMeQuery,
} = authApi;
