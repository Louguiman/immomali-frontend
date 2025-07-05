import { apiSlice } from "./api";

export const permissionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPermissions: builder.query({ query: () => "/permissions" }),
    assignPermission: builder.mutation({
      query: ({ roleId, permissionId }) => ({
        url: `/roles/${roleId}/permissions`,
        method: "POST",
        body: { permissionId },
      }),
    }),
  }),
});

export const { useGetPermissionsQuery, useAssignPermissionMutation } =
  permissionsApi;
