import dynamic from "next/dynamic";
import CreateTenant from "@/components/dashboard/create-tenant";

export const metadata = {
  title: "Create Tenant || IKASOWi - Real Estate",
  description: "IKASOWi - Real Estate",
};

const index = () => {
  return (
    <>
      <CreateTenant />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
