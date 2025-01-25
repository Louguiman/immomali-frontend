import { Complaint } from "@/utils/interface/complaint.interace";
import { apiSlice } from "./api";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchNotifications: builder.query<any[], void>({
      query: () => "/notifications",
    }),
  }),
});

export const { useFetchNotificationsQuery } = extendedApiSlice;
