import dynamic from "next/dynamic";
import CreateListing from "@/components/dashboard/create-listing";

export const metadata = {
  title: "Create Listing || IKASOWi - Real Estate",
  description: "IKASOWi - Real Estate",
};

const index = () => {
  return (
    <>
      <CreateListing />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
