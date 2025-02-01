import { User } from "@/utils/interface/user.interface";
import { apiSlice } from "./api";

export const tenantApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /** 🔹 Get All Tenants */
    getTenants: builder.query({
      query: ({ search = "" }) => `tenants?search=${search}`,
    }),

    /** 🔹 Get Single Tenant Profile */
    getTenantById: builder.query({
      query: (tenantId) => `tenants/${tenantId}`,
    }),

    /** 🔹 Create a New Tenant */
    createTenant: builder.mutation({
      query: (data) => ({
        url: "tenants",
        method: "POST",
        body: data,
      }),
    }),

    /** 🔹 Update Tenant Information */
    updateTenant: builder.mutation({
      query: ({ tenantId, data }) => ({
        url: `tenants/${tenantId}`,
        method: "PATCH",
        body: data,
      }),
    }),

    /** 🔹 Delete Tenant */
    deleteTenant: builder.mutation({
      query: (tenantId) => ({
        url: `tenants/${tenantId}`,
        method: "DELETE",
      }),
    }),

    /** 🔹 Get Tenant's Active Leases */
    getTenantLeases: builder.query({
      query: (tenantId) => `tenants/${tenantId}/leases`,
    }),

    /** 🔹 Extend or Terminate Lease */
    updateLeaseStatus: builder.mutation({
      query: ({ leaseId, status }) => ({
        url: `leases/${leaseId}/status`,
        method: "PATCH",
        body: { status },
      }),
    }),

    /** 🔹 Get Tenant's Payment History */
    getTenantPayments: builder.query({
      query: (tenantId) => `tenants/${tenantId}/payments`,
    }),

    /** 🔹 Send Overdue Payment Reminder */
    sendPaymentReminder: builder.mutation({
      query: (tenantId) => ({
        url: `tenants/${tenantId}/reminders`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetTenantsQuery,
  useGetTenantByIdQuery,
  useCreateTenantMutation,
  useUpdateTenantMutation,
  useDeleteTenantMutation,
  useGetTenantLeasesQuery,
  useUpdateLeaseStatusMutation,
  useGetTenantPaymentsQuery,
  useSendPaymentReminderMutation,
} = tenantApi;
