import dynamic from "next/dynamic";
import TenantsManagement from "@/components/dashboard/tenants-management";

export const metadata = {
  title: "Tenants Management || FindHouse - Real Estate React Template",
  description: "FindHouse - Real Estate React Template",
};

const index = () => {
  return (
    <>
      <TenantsManagement />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
