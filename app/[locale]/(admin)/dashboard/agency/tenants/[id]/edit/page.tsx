import EditTenantPage from "@/components/dashboard/my-tenancies/edit/page";
import dynamic from "next/dynamic";

export const metadata = {
  title: "Edit Tenant || IKASOWi - Real Estate",
  description: "IKASOWi - Real Estate",
};

const index = () => {
  return (
    <>
      <EditTenantPage />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
