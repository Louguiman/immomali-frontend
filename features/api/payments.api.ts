import { Payment } from "@/types/payment";
import { apiSlice } from "./api";

interface PaymentResponse {
  data: Payment[];
}

export const paymentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchPayments: builder.query<PaymentResponse, { tenantId: string }>({
      query: ({ tenantId }) => ({
        url: "/payments",
        params: { tenantId },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Payments" as const,
                id,
              })),
              { type: "Payments" as const, id: "LIST" },
            ]
          : [{ type: "Payments" as const, id: "LIST" }],
    }),
    createPayment: builder.mutation<Payment, Omit<Payment, "id">>({
      query: (payment) => ({
        url: "/payments",
        method: "POST",
        body: payment,
      }),
      invalidatesTags: [{ type: "Payments" as const, id: "LIST" }],
    }),
    createManualPayment: builder.mutation<
      Payment,
      Omit<Payment, "id" | "createdAt" | "updatedAt">
    >({
      query: (payment) => ({
        url: "/payments/manual",
        method: "POST",
        body: payment,
      }),
      invalidatesTags: [
        { type: "Invoices" as const, id: "LIST" },
        { type: "Payments" as const, id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreatePaymentMutation,
  useCreateManualPaymentMutation,
  useFetchPaymentsQuery,
} = paymentsApi;
