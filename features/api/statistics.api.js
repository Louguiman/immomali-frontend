import { apiSlice } from "./api";

export const extendedStatisticsApiSlice = apiSlice.injectEndpoints({
  tagTypes: ['Statistics'],
  endpoints: (builder) => ({
    getTopCities: builder.query({
      query: () => "statistics/top-cities",
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map((city) => ({ type: 'Statistics', id: city.id || city.name })), // Assuming city has an id or unique name
              { type: 'Statistics', id: 'LIST' },
            ]
          : [{ type: 'Statistics', id: 'LIST' }],
    }),
  }),
});

export const { useGetTopCitiesQuery } = extendedStatisticsApiSlice;
