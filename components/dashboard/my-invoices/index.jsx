"use client";

import { useGetInvoicesByTenantQuery } from "@/features/api/invoices.api";
import { useSelector } from "react-redux";
import { useState } from "react";
import Header from "@/components/common/header/dashboard/Header";
import SidebarMenu from "@/app/(admin)/dashboard/SidebarMenu";
import MobileMenu from "@/components/common/header/MobileMenu";
import InvoiceTable from "./InvoiceTable";

export const InvoiceManagement = () => {
  const user = useSelector((state) => state.auth.user);
  const { data: invoices, isLoading } = useGetInvoicesByTenantQuery(user?.id, {
    skip: !user,
  });

  return (
    <>
      <Header />
      <MobileMenu />

      <div className="dashboard_sidebar_menu">
        <div
          className="offcanvas offcanvas-dashboard offcanvas-start"
          tabIndex="-1"
          id="DashboardOffcanvasMenu"
          data-bs-scroll="true"
        >
          <SidebarMenu />
        </div>
      </div>

      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="breadcrumb_content style2 mb30-991">
                <h2 className="breadcrumb_title">Invoices</h2>
                <p>Manage your invoices here.</p>
              </div>
              {isLoading ? (
                <p>Loading invoices...</p>
              ) : (
                <InvoiceTable invoices={invoices} />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InvoiceManagement;
