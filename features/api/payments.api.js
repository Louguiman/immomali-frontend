import { apiSlice } from "./api";
import { Payment } from "@/utils/interface/payment.interface";

// TS
// export const extendedApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     fetchPayments: builder.query<Payment[], { tenantId: number }>({
//       query: ({ tenantId }) => `/payments?tenantId=${tenantId}`,
//     }),
//     createPayment: builder.mutation<Payment, Partial<Payment>>({
//       query: (payment) => ({
//         url: "/payments",
//         method: "POST",
//         body: payment,
//       }),
//     }),
//   }),
// });

export const extendedApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Payments"],
  endpoints: (builder) => ({
    fetchPayments: builder.query({
      query: ({ tenantId }) => `/payments?tenantId=${tenantId}`,
    }),
    createPayment: builder.mutation({
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
