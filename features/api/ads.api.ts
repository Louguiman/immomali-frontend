// RTK Query API slice for advertisements
import { apiSlice } from "./api";
import { Advertisement, AdStatus, AdType } from "@/types/advertisement";

export const adsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAds: builder.query<Advertisement[], Record<string, any>>({
      query: (filters) => ({
        url: "/ads",
        params: filters,
      }),
    }),
    updateAdStatus: builder.mutation<
      Advertisement,
      { id: number; status: AdStatus }
    >({
      query: ({ id, status }) => ({
        url: `/ads/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
    }),
  }),
});

export const { useGetAllAdsQuery, useUpdateAdStatusMutation } = adsApi;
