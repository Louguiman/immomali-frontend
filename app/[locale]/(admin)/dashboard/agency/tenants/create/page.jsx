import dynamic from "next/dynamic";
import CreateListing from "@/components/dashboard/create-tenant";

export const metadata = {
  title: "Create Tenant || ImmoMali - Real Estate",
  description: "ImmoMali - Real Estate",
};

const index = () => {
  return (
    <>
      <CreateListing />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
