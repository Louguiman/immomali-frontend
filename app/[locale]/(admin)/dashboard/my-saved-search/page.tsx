import dynamic from "next/dynamic";
import MySavedSearch from "@/components/dashboard/my-saved-search";

export const metadata = {
  title: "My Saved Search || IKASOWi - Real Estate",
  description: "IKASOWi - Real Estate",
};

const index = () => {
  return (
    <>
      <MySavedSearch />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
