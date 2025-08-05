"use client";

import { useParams } from "next/navigation";
import { useGetTenantByIdQuery } from "@/features/api/tenants.api";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import CreateListing from "@/components/dashboard/create-tenant";

export const EditTenantPage = () => {
  const { id } = useParams();
  const { data: tenant, isLoading } = useGetTenantByIdQuery(id);

  if (isLoading) return <LoadingSpinner />;

  return <CreateListing tenant={tenant} />;
};

export default EditTenantPage;
