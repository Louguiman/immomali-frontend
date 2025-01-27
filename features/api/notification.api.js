import { Complaint } from "@/utils/interface/complaint.interace";
import { apiSlice } from "./api";

// TS
// export const extendedApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     fetchNotifications: builder.query<any[], void>({
//       query: () => "/notifications",
//     }),
//   }),
// });
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchNotifications: builder.query({
      query: () => "/notifications",
    }),
  }),
});

export const { useFetchNotificationsQuery } = extendedApiSlice;
