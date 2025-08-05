import dynamic from "next/dynamic";
import MaintenanceDashboard from "@/components/dashboard/agency-dashboard/maintenance/MaintenanceDashboard";

export const metadata = {
  title: "Maintenace Requests || IKASOWi - Real Estate",
  description: "IKASOWi - Real Estate",
};

const Index = () => {
  return (
    <>
      <MaintenanceDashboard />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index));
