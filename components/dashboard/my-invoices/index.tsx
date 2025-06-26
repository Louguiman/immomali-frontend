"use client";

import { useGetInvoicesByTenantQuery } from "@/features/api/invoices.api";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import type { User } from "@/utils/interface/user.interface";
import type { Invoice } from "./InvoiceTable";
import InvoiceTable from "./InvoiceTable";
import LoadingSpinner from "@/components/common/LoadingSpinner";

interface InvoiceManagementProps {
  // Add any props if needed in the future
}

export const InvoiceManagement: React.FC<InvoiceManagementProps> = () => {
  const user = useSelector((state: RootState) => state.auth.user as User | null);
  
  // Use proper type for the query result
  const { 
    data: invoices = [], 
    isLoading, 
    isError, 
    error 
  } = useGetInvoicesByTenantQuery(user?.id, {
    skip: !user?.id,
    refetchOnMountOrArgChange: true,
  }) as { 
    data: Invoice[]; 
    isLoading: boolean;
    isError: boolean;
    error?: unknown;
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    console.error("Error loading invoices:", error);
    return (
      <div className="alert alert-danger">
        Error loading invoices. Please try again later.
      </div>
    );
  }

  if (!user) {
    return (
      <div className="alert alert-warning">
        Please sign in to view your invoices.
      </div>
    );
  }

  return (
    <div className="invoices-container">
      <InvoiceTable invoices={invoices} />
    </div>
  );
};

export default InvoiceManagement;
