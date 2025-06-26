import MaintenanceDashboard from "@/components/dashboard/agent-dashboard/maintenance/MaintenanceDashboard";
import dynamic from "next/dynamic";

export const metadata = {
  title: "Maintenace Requests || IKASOWi - Real Estate",
  description: "IKASOWi - Real Estate",
};

const index = () => {
  return (
    <>
      <MaintenanceDashboard />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
