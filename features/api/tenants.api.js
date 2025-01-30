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

    /** 🔹 View Tenant's Active Leases */
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

    /** 🔹 View Payment History */
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
  useGetTenantLeasesQuery,
  useUpdateLeaseStatusMutation,
  useGetTenantPaymentsQuery,
  useSendPaymentReminderMutation,
} = tenantApi;
