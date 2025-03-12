import MaintenanceDashboard from "@/components/maintenance/MaintenanceDashboard";
import dynamic from "next/dynamic";

export const metadata = {
  title: "My Maintenace Requests || ImmoMali - Real Estate",
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
