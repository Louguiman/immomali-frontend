import { apiSlice } from "./api";
import { Payment } from "@/utils/interface/payment.interface";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchPayments: builder.query<Payment[], { tenantId: number }>({
      query: ({ tenantId }) => `/payments?tenantId=${tenantId}`,
    }),
    createPayment: builder.mutation<Payment, Partial<Payment>>({
      query: (payment) => ({
        url: "/payments",
        method: "POST",
        body: payment,
      }),
    }),
  }),
});

export const { useCreatePaymentMutation, useFetchPaymentsQuery } =
  extendedApiSlice;
