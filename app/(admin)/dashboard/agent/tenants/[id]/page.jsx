"use client";

import { useParams } from "next/navigation";
import { useGetTenantByIdQuery } from "@/features/api/tenants.api";
import Image from "next/image";
import Link from "next/link";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import LeaseDetails from "@/components/dashboard/tenants-management/LeaseDetails";
import InvoiceList from "@/components/dashboard/tenants-management/InvoiceList";

const TenantProfile = () => {
  const { id } = useParams();
  const { data: tenant, isLoading, isError } = useGetTenantByIdQuery(id);

  if (isLoading) return <LoadingSpinner />;
  if (isError || !tenant)
    return <p className="text-danger">Tenant not found.</p>;

  return (
    <section className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{tenant.user.name}</h2>
        <Link href="/tenants" className="btn btn-secondary">
          Back to Tenants
        </Link>
      </div>

      <div className="row">
        {/* Tenant Info */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <Image
                src={tenant.user?.img || "/default-avatar.png"}
                width={100}
                height={100}
                className="rounded-circle mb-3"
                alt="Tenant Profile"
              />
              <h5>{tenant.user.name}</h5>
              <p>Email: {tenant.user.email}</p>
              <p>Phone: {tenant.user.phone}</p>
            </div>
          </div>
        </div>

        {/* Lease Details */}
        <div className="col-md-8">
          <LeaseDetails lease={tenant.lease} />
        </div>
      </div>

      {/* Invoice List */}
      <InvoiceList invoices={tenant.invoices} />
    </section>
  );
};

export default TenantProfile;
