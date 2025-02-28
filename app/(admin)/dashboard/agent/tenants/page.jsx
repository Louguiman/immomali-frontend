import dynamic from "next/dynamic";
import TenantsManagement from "@/components/dashboard/tenants-management";

export const metadata = {
  title: "Tenants Management || ImmoMali - Real Estate",
  description: "ImmoMali - Real Estate",
};

const index = () => {
  return (
    <>
      <TenantsManagement />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
