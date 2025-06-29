import Header from "@/components/common/header/dashboard/Header";
import MobileMenu from "@/components/common/header/MobileMenu";
import ProtectedRoute from "@/features/auth/ProtectedRoute";
import SidebarMenu from "./dashboard/SidebarMenu";
if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

import { PropsWithChildren } from "react";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <ProtectedRoute>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      <div className="dashboard_sidebar_menu">
        <div
          className="offcanvas offcanvas-dashboard offcanvas-start"
          tabIndex={-1}
          id="DashboardOffcanvasMenu"
          data-bs-scroll="true"
        >
          <SidebarMenu />
        </div>
      </div>
      {/* End sidebar_menu */}

      {children}
    </ProtectedRoute>
  );
}
