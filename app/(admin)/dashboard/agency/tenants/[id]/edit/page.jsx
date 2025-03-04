import EditTenantPage from "@/components/dashboard/my-tenancies/edit/page";
import dynamic from "next/dynamic";

export const metadata = {
  title: "Edit Tenant || ImmoMali - Real Estate",
  description: "ImmoMali - Real Estate",
};

const index = () => {
  return (
    <>
      <EditTenantPage />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
