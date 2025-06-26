import dynamic from "next/dynamic";
import EditPropertyPage from "@/components/dashboard/my-properties/EditPropertyPage";

export const metadata = {
  title: "Edit Properties || IKASOWi - Real Estate",
  description: "IKASOWi - Real Estate",
};

const index = () => {
  return (
    <>
      <EditPropertyPage />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
