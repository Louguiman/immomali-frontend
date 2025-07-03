import { apiSlice } from "../api/api";

export const agentApi = apiSlice.injectEndpoints<{
    getAgents: any;
}>({
    endpoints: (builder: any) => ({
        getAgents: builder.query({
            query: () => ({
                url: "/agents",
                methode: "GET",
            }),
        }),
    }),
});

export const { useGetAgentsQuery } = agentApi;
