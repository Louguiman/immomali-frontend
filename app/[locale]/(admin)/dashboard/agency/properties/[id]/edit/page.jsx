import dynamic from "next/dynamic";
import EditPropertyPage from "@/components/dashboard/my-properties/EditPropertyPage";

export const metadata = {
  title: "Edit Properties || ImmoMali - Real Estate",
  description: "ImmoMali - Real Estate",
};

const index = () => {
  return (
    <>
      <EditPropertyPage />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
