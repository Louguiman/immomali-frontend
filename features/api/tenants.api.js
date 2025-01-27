import { User } from "@/utils/interface/user.interface";
import { apiSlice } from "./api";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchTenants: builder.query<User[], void>({
      query: () => "/tenants",
    }),
    fetchTenantById: builder.query<User, number>({
      query: (id) => `/tenants/${id}`,
    }),
    updateTenantBalance: builder.mutation<
      void,
      { tenantId: number; amount: number }
    >({
      query: ({ tenantId, amount }) => ({
        url: `/tenants/${tenantId}/outstanding`,
        method: "PATCH",
        body: { amount },
      }),
    }),
  }),
});

export const {
  useFetchTenantByIdQuery,
  useFetchTenantsQuery,
  useUpdateTenantBalanceMutation,
} = extendedApiSlice;
