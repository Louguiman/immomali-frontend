import { useGetAllAdsQuery } from "@/features/api/ads.api";
import { useState } from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import AdminFilters from "@/components/admin/AdminFilters";
import AdCard from "@/components/admin/AdCard";
import ManageAdModal from "./ManageAdModal";

const AdminAdDashboard = () => {
  const [filters, setFilters] = useState({
    query: "",
    status: "",
    type: "",
    sortBy: "createdAt",
    order: "DESC",
  });

  const [updateAdStatus] = useUpdateAdStatusMutation();
  const [selectedAd, setSelectedAd] = useState(null);

  const { data: ads, isLoading } = useGetAllAdsQuery(filters);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">📢 Advertisement Management</h2>

      {/* 🔹 Admin Filters */}
      <AdminFilters onFilterChange={setFilters} />

      <div className="row">
        {ads?.length > 0 ? (
          ads.map((ad) => <AdCard key={ad.id} ad={ad} />)
        ) : (
          <p className="text-muted">No advertisements found.</p>
        )}
      </div>

      {selectedAd && (
        <ManageAdModal
          ad={selectedAd}
          onClose={() => setSelectedAd(null)}
          onUpdate={updateAdStatus}
        />
      )}
    </div>
  );
};

export default AdminAdDashboard;
