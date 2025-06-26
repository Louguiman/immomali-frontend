import { apiSlice } from "./api";

export const notificationsApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Notifications"],
  endpoints: (builder) => ({
    fetchNotifications: builder.query({
      query: () => "/notifications",
    }),
    getUnreadNotifications: builder.query({
      query: () => "/notifications/unread",
      providesTags: [{ type: "Notifications", id: "LIST" }],
    }),
    markNotificationRead: builder.mutation({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: "POST",
        body: { read: true },
      }),
      invalidatesTags: [{ type: "Notifications", id: "LIST" }],
    }),
  }),
});

export const {
  useFetchNotificationsQuery,
  useGetUnreadNotificationsQuery,
  useMarkNotificationReadMutation,
} = notificationsApiSlice;
