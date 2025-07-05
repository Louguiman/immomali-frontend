import { useGetAllAdsQuery } from "@/features/api/ads.api";
import { useState } from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import AdminFilters from "./AdminFilters";
import AdCard from "./AdCard";
import ManageAdModal from "./ManageAdModal";
import { Advertisement } from "@/types/advertisement";

type Filters = {
  query: string;
  status: string;
  type: string;
  sortBy: string;
  order: string;
};

const AdminAdDashboard: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    query: "",
    status: "",
    type: "",
    sortBy: "createdAt",
    order: "DESC",
  });

  const [updateAdStatus] = useUpdateAdStatusMutation();
  const [selectedAd, setSelectedAd] = useState<Advertisement | null>(null);

  const { data: ads, isLoading } = useGetAllAdsQuery(filters) as {
    data: Advertisement[];
    isLoading: boolean;
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">📢 Advertisement Management</h2>

      {/* 🔹 Admin Filters */}
      <AdminFilters onFilterChange={setFilters} />

      <div className="row">
        {ads?.length > 0 ? (
          ads.map((ad) => (
            <AdCard key={ad.id} ad={ad} onManage={() => setSelectedAd(ad)} />
          ))
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
