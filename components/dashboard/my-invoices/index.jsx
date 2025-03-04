"use client";

import { useGetInvoicesByTenantQuery } from "@/features/api/invoices.api";
import { useSelector } from "react-redux";
import InvoiceTable from "./InvoiceTable";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export const InvoiceManagement = () => {
  const user = useSelector((state) => state.auth.user);
  const { data: invoices, isLoading } = useGetInvoicesByTenantQuery(user?.id, {
    skip: !user,
  });

  if (isLoading) return <LoadingSpinner />;

  return <InvoiceTable invoices={invoices} />;
};

export default InvoiceManagement;
