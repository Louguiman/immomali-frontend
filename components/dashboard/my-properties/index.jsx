"use client";

import { useState, useEffect } from "react";
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../../app/[locale]/(admin)/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import TableData from "./TableData";
import Filtering from "./Filtering";
import Pagination from "./Pagination";
import SearchBox from "./SearchBox";
import {
  useDeletePropertyMutation,
  useFetchPropertyByUserIdQuery,
} from "@/features/api/properties.api";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2"; // Import SweetAlert2
import { useTranslations } from "next-intl"; // Import useTranslations from next-intl

const PropertyManagementPage = () => {
  // Get the logged-in user from Redux
  const { user } = useSelector((state) => state.auth);
  // Local state for pagination & filtering
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});

  // Initialize translations hook
  const t = useTranslations("property");

  // Combine filters for the query
  const queryParams = {
    userId: user?.id,
    page,
    limit,
    keyword: searchTerm,
    ...filters,
  };

  // Fetch properties using our query hook
  const { data, isLoading, refetch } = useFetchPropertyByUserIdQuery(user?.id, {
    skip: !user,
  });

  const router = useRouter();
  const [deleteProperty] = useDeletePropertyMutation();

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: t("confirmDelete"), // Using translation
      text: t("confirmDelete"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("yesDelete"), // Using translation for the confirm button
      cancelButtonText: t("cancel"), // Using translation for the cancel button
    });

    if (result.isConfirmed) {
      try {
        await deleteProperty(id);
        Swal.fire(t("successDelete"), "", "success"); // Using translation
      } catch (error) {
        Swal.fire(t("errorDelete"), "", "error"); // Using translation
      }
    }
  };

  // Handle search updates from SearchBox component
  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1); // Reset to first page on new search
  };

  // Handle filtering updates from Filtering component
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  // Handle pagination change from Pagination component
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Optionally, useEffect to refetch data when filters or search change
  useEffect(() => {
    refetch();
  }, [searchTerm, filters, page, limit]);

  return (
    <>
      {/* Search & Filter Controls */}
      <div className="col-lg-8 col-xl-8">
        <div className="candidate_revew_select style2 text-end mb30-991">
          <ul className="mb0">
            <li className="list-inline-item">
              <div className="candidate_revew_search_box course fn-520">
                <SearchBox onSearch={handleSearch} />
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
            <div className="property_table">{t("loadingProperties")}</div> // Using translation
          ) : data && data.length ? (
            <div className="property_table">
              <div className="table-responsive mt0">
                {/* TableData receives property data and dynamic header configuration */}
                <TableData
                  onEdit={(id) =>
                    router.push(`/dashboard/properties/edit/${id}`)
                  }
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
