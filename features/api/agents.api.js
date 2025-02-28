import { apiSlice } from "./api";

export const agentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAgentsByAgency: builder.query({
      query: (agencyId) => `/users/agency/${agencyId}`,
      providesTags: ["Agents"],
    }),
    searchAgentsByAgency: builder.query({
      query: ({ agencyId, query }) =>
        `/users/agency/${agencyId}?query=${query}`,
      providesTags: ["Agents"],
    }),

    getAllAgents: builder.query({
      query: () => "/agents",
      providesTags: ["Agents"],
    }),
    getAgentById: builder.query({
      query: (id) => `/agents/${id}`,
      providesTags: (result, error, id) => [{ type: "Agents", id }],
    }),
    createAgent: builder.mutation({
      query: (agent) => ({
        url: "/agents", //
        method: "POST",
        body: agent,
      }),
      invalidatesTags: ["Agents"],
    }),
    updateAgent: builder.mutation({
      query: ({ id, agent }) => ({
        url: `/agents/${id}`,
        method: "PATCH",
        body: agent,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Agents", id }],
    }),
    deleteAgent: builder.mutation({
      query: (id) => ({
        url: `/agents/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Agents"],
    }),
  }),
});

export const {
  useCreateAgentMutation,
  useDeleteAgentMutation,
  useGetAgentByIdQuery,
  useGetAllAgentsQuery,
  useUpdateAgentMutation,
  useGetAgentsByAgencyQuery,
  useSearchAgentsByAgencyQuery,
} = agentsApi;
