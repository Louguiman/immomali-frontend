import dynamic from "next/dynamic";
import { AgencyInvoicesPage } from "@/components/dashboard/agency-dashboard/invoice";
import MaintenanceDashboard from "@/components/dashboard/agency-dashboard/maintenance/MaintenanceDashboard";

export const metadata = {
  title: "Maintenace Requests || ImmoMali - Real Estate",
  description: "ImmoMali - Real Estate",
};

const index = () => {
  return (
    <>
      <MaintenanceDashboard />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
