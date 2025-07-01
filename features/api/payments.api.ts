import { apiSlice } from "./api";

export const paymentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchPayments: builder.query({
      query: ({ tenantId }) => `/payments?tenantId=${tenantId}`,
      providesTags: ["Payments"],
    }),
    createPayment: builder.mutation({
      query: (payment) => ({
        url: "/payments",
        method: "POST",
        body: payment,
      }),
    }),
    createManualPayment: builder.mutation({
      query: (payment) => ({
        url: "/payments/manual",
        method: "POST",
        body: payment,
      }),
      invalidatesTags: ["Invoices", "Payments"],
    }),
  }),
});

export const {
  useCreatePaymentMutation,
  useCreateManualPaymentMutation,
  useFetchPaymentsQuery,
} = paymentsApi;
