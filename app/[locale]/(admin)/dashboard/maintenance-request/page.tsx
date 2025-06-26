import MaintenanceDashboard from "@/components/maintenance/MaintenanceDashboard";
import dynamic from "next/dynamic";

export const metadata = {
  title: "My Maintenace Requests || IKASOWi - Real Estate",
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
