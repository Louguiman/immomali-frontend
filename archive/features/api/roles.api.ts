import { apiSlice } from "./api";

export const rolesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query({ query: () => "/roles" }),
    createRole: builder.mutation({
      query: (role) => ({ url: "/roles", method: "POST", body: role }),
    }),
    deleteRole: builder.mutation({
      query: (id) => ({ url: `/roles/${id}`, method: "DELETE" }),
    }),
  }),
});

export const {
  useGetRolesQuery,
  useCreateRoleMutation,
  useDeleteRoleMutation,
} = rolesApi;
