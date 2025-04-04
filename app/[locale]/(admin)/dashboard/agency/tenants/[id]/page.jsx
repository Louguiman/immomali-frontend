"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetTenantByIdQuery } from "@/features/api/tenants.api";
import Image from "next/image";
import Link from "next/link";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import LeaseDetails from "@/components/dashboard/tenants-management/LeaseDetails";
import InvoiceList from "@/components/dashboard/tenants-management/InvoiceList";
import PropertyCard from "@/components/PropertyCard";
import { useTranslations } from "next-intl"; // Import the useTranslations hook for translation

const TenantProfile = () => {
  const router = useRouter();
  const { id } = useParams();
  const { data: tenant, isLoading, isError } = useGetTenantByIdQuery(id);
  const t = useTranslations("dashboard.TenantProfile"); // Hook to fetch translation

  if (isLoading) return <LoadingSpinner />;
  if (isError || !tenant) return <p className="text-danger">{t("notFound")}</p>; // Translated error text

  return (
    <section className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{tenant.user.name}</h2>
        <button onClick={() => router.back()} className="btn btn-secondary">
          {t("backToTenants")}
        </button>
      </div>

      <div className="row ml-4 d-flex">
        {/* Tenant Info */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <Image
                src={tenant.user?.img || "/assets/images/resource/review.png"}
                width={100}
                height={100}
                className="rounded-circle mb-3"
                alt={"avatarAlt"}
              />
              <h5>{tenant.user.name}</h5>
              <p>
                {t("email")}: {tenant.user.email}
              </p>
              <p>
                {t("phone")}: {tenant.user.phone}
              </p>
            </div>
          </div>
          <div className="mt-2">
            <PropertyCard item={tenant.property} />
          </div>
        </div>

        {/* Lease Details */}
        <div className="col-md-6">
          <LeaseDetails lease={tenant.lease} />
        </div>
      </div>

      {/* Invoice List */}
      <InvoiceList invoices={tenant.invoices} />
    </section>
  );
};

export default TenantProfile;
