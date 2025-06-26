import { apiSlice } from "./api";
export const invoicesApi = apiSlice.injectEndpoints({
  tagTypes: ["Invoices"],
  endpoints: (builder) => ({
    // 🔹 Create Invoice
    createInvoice: builder.mutation({
      query: (invoice) => ({
        url: "/invoices",
        method: "POST",
        body: invoice,
      }),
      invalidatesTags: ["Invoices"],
    }),

    // 🔹 Get All Invoices (Supports Filters)
    getAllInvoices: builder.query({
      query: ({ page = 1, limit = 10 }) =>
        `/invoices?page=${page}&limit=${limit}`,
      providesTags: ["Invoices"],
    }),

    // 🔹 Get Invoice by ID
    getInvoicesByTenant: builder.query({
      query: (id) => `/invoices/tenant/${id}`,
      providesTags: (result, error, id) => [{ type: "Invoices", id }],
    }),

    // 🔹 Get Invoice by ID
    getInvoiceById: builder.query({
      query: (id) => `/invoices/${id}`,
      providesTags: (result, error, id) => [{ type: "Invoices", id }],
    }),

    // 🔹 Update Invoice
    updateInvoice: builder.mutation({
      query: ({ id, data }) => ({
        url: `/invoices/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Invoices", id }],
    }),

    // 🔹 Delete Invoice
    deleteInvoice: builder.mutation({
      query: (id) => ({
        url: `/invoices/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Invoices"],
    }),

    // 🔹 export Invoice to Pdf file
    exportInvoiceToPDF: builder.query({
      query: (id) => ({
        url: `/invoices/${id}/pdf`,
        method: "GET",
      }),
      invalidatesTags: ["Invoices"],
    }),

    getSentInvoices: builder.query({
      query: (userID) => `/invoices/sent/${userID}`,
      providesTags: ["Invoices"],
    }),

    getReceivedInvoices: builder.query({
      query: (userID) => `/invoices/received/${userID}`,
      providesTags: ["Invoices"],
    }),

    // ✅ Fetch invoices for an agency
    getInvoicesByAgency: builder.query({
      query: ({ agencyId, status, page = 1, limit = 10 }) => ({
        url: `/invoices/agency/${agencyId}`,
        params: { status, page, limit },
      }),
      providesTags: ["Invoices"],
    }),

    // ✅ Fetch invoices managed by an agent
    getInvoicesByAgent: builder.query({
      query: ({ agentId, status, page = 1, limit = 10 }) => ({
        url: `/invoices/agent/${agentId}`,
        params: { status, page, limit },
      }),
      providesTags: ["Invoices"],
    }),
  }),
});

export const {
  useCreateInvoiceMutation,
  useGetAllInvoicesQuery,
  useGetInvoiceByIdQuery,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
  useGetSentInvoicesQuery,
  useGetReceivedInvoicesQuery,
  useGetInvoicesByAgencyQuery,
  useGetInvoicesByAgentQuery,
  useGetInvoicesByTenantQuery,
  useExportInvoiceToPDFQuery,
} = invoicesApi;
