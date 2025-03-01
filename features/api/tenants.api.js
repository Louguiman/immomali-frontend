import { User } from "@/utils/interface/user.interface";
import { apiSlice } from "./api";

export const tenantApi = apiSlice.injectEndpoints({
  tagTypes: ["Tenants"],
  endpoints: (builder) => ({
    /** 🔹 Get All Tenants */
    getTenants: builder.query({
      query: ({ search = "" }) => `tenants?search=${search}`,
      providesTags: ["Tenants"],
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
      invalidatesTags: ["Tenants"],
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

    /** 🔹 Extend or Terminate Lease */
    updateLease: builder.mutation({
      query: (leaseData) => ({
        url: `leases/${leaseData.id}`,
        method: "PATCH",
        body: leaseData,
      }),
    }),

    /** 🔹 Get Tenant's Payment History */
    getTenantPayments: builder.query({
      query: (tenantId) => `tenants/${tenantId}/payments`,
    }),

    uploadLeaseDocuments: builder.mutation({
      query: ({ leaseId, files }) => {
        const formData = new FormData();
        files.forEach((file) => formData.append("files", file));

        return {
          url: `/files/upload?entityType=lease&entityId=${leaseId}`,
          method: "POST",
          body: formData,
        };
      },
    }),

    /** 🔹 Send Overdue Payment Reminder */
    sendPaymentReminder: builder.mutation({
      query: (tenantId) => ({
        url: `tenants/${tenantId}/reminders`,
        method: "POST",
      }),
    }),

    getUserTenancies: builder.query({
      query: () => "/users/my-tenancies",
      providesTags: ["Tenancies"],
    }),

    requestLeaseTermination: builder.mutation({
      query: (tenantId) => ({
        url: `/tenants/${tenantId}/terminate`,
        method: "PATCH",
      }),
      invalidatesTags: ["Tenancies"],
    }),

    requestLeaseExtension: builder.mutation({
      query: (tenantId) => ({
        url: `/tenants/${tenantId}/extend`,
        method: "PATCH",
      }),
      invalidatesTags: ["Tenancies"],
    }),
  }),
});

export const {
  useGetTenantsQuery,
  useGetTenantByIdQuery,
  useCreateTenantMutation,
  useUpdateTenantMutation,
  useUploadLeaseDocumentsMutation,
  useDeleteTenantMutation,
  useGetTenantLeasesQuery,
  useUpdateLeaseStatusMutation,
  useUpdateLeaseMutation,
  useGetTenantPaymentsQuery,
  useSendPaymentReminderMutation,
  useGetUserTenanciesQuery,
  useRequestLeaseTerminationMutation,
  useRequestLeaseExtensionMutation,
} = tenantApi;
