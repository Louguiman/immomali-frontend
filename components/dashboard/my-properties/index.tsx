"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useTranslations } from "next-intl";

// Components
import TableData from "./TableData";
import Filtering from "./Filtering";
import Pagination from "./Pagination";
import SearchBox from "./SearchBox";

// API Hooks
import {
  useDeletePropertyMutation,
  useFetchPropertyByUserIdQuery,
} from "@/features/api/properties.api";

// Types
import type { RootState } from "@/store/store";

// Define filter types
interface PropertyFilters {
  status?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  [key: string]: string | number | undefined;
}

const PropertyManagementPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("property");

  // Get the logged-in user from Redux with proper typing
  const { user } = useSelector((state: import("@/store/store").RootState) => state.auth);

  // Local state for pagination & filtering
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>(""); // Search term state
  const [filters, setFilters] = useState<PropertyFilters>({}); // Filter state
  const [isSearching, setIsSearching] = useState<boolean>(false); // Searching state
  const [searchError, setSearchError] = useState<string | null>(null); // Search error state

  // Query parameters are handled by RTK Query's built-in parameter handling
  // in the useFetchPropertyByUserIdQuery hook

  // Fetch properties using our query hook
  const { data, isLoading, refetch } = useFetchPropertyByUserIdQuery(user?.id, {
    skip: !user,
  });

  const [deleteProperty] = useDeletePropertyMutation();

  const handleDelete = useCallback(
    async (id: number) => {
      const result = await Swal.fire({
        title: t("confirmDelete"),
        text: t("confirmDelete"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: t("yesDelete"),
        cancelButtonText: t("cancel"),
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      });

      if (result.isConfirmed) {
        try {
          await deleteProperty(id).unwrap();
          await Swal.fire({
            title: t("success"),
            text: t("successDelete"),
            icon: "success",
            confirmButtonText: t("ok"),
            confirmButtonColor: "#3085d6",
          });
          refetch(); // Refresh the data after deletion
        } catch (error) {
          console.error("Delete error:", error);
          await Swal.fire({
            title: t("error"),
            text: t("errorDelete"),
            icon: "error",
            confirmButtonText: t("ok"),
            confirmButtonColor: "#3085d6",
          });
        }
      }
    },
    [deleteProperty, refetch, t]
  );

  // Handle search updates from SearchBox component
  const handleSearch = useCallback(
    async (term: string) => {
      try {
        setIsSearching(true);
        setSearchError(null);
        setSearchTerm(term);
        setPage(1); // Reset to first page on new search

        // Simulate API call delay (remove in production)
        await new Promise((resolve) => setTimeout(resolve, 500));

        // You could add actual search validation here
        if (term.length > 0 && term.length < 2) {
          setSearchError(t("searchMinLength", { min: 2 }));
        }
      } catch (error) {
        console.error("Search error:", error);
        setSearchError(t("searchError"));
      } finally {
        setIsSearching(false);
      }
    },
    [t]
  );

  // Handle filtering updates from Filtering component
  const handleFilterChange = useCallback((newFilters: PropertyFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
    setPage(1);
  }, []);

  // Handle pagination change from Pagination component
  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
    // Optional: Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Fetch data when filters, search term, or page changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        await refetch();
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchData();
  }, [searchTerm, filters, page, limit, refetch]);

  return (
    <>
      {/* Search & Filter Controls */}
      <div className="col-lg-8 col-xl-8">
        <div className="candidate_revew_select style2 text-end mb30-991">
          <ul className="mb0">
            <li className="list-inline-item">
              <div className="candidate_revew_search_box course fn-520">
                <SearchBox
                  onSearch={handleSearch}
                  isLoading={isSearching}
                  error={searchError}
                  placeholder={t("searchProperties")}
                />
              </div>
            </li>
            <li className="list-inline-item">
              <Filtering onFilterChange={handleFilterChange} />
            </li>
          </ul>
        </div>
      </div>

      {/* Table Data and Pagination */}
      <div className="col-lg-12">
        <div className="my_dashboard_review mb40">
          {isLoading ? (
            <div className="property_table">{t("loading")}</div> // Using translation
          ) : data && data.length ? (
            <div className="property_table">
              <div className="table-responsive mt0">
                {/* TableData receives property data and dynamic header configuration */}
                <TableData
                  onEdit={(id) => router.push(`${pathname}/${id}/edit`)}
                  onDelete={handleDelete}
                  data={data}
                />
              </div>
              <div className="mbp_pagination">
                <Pagination
                  currentPage={page}
                  totalPages={data.totalPage}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          ) : (
            <div className="property_table">{t("noPropertiesFound")}</div> // Using translation
          )}
        </div>
      </div>
    </>
  );
};

export default PropertyManagementPage;
