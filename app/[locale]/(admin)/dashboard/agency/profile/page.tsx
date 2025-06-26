import dynamic from "next/dynamic";
import AgencyProfile from "@/components/dashboard/my-profile/AgencyProfile";

export const metadata = {
  title: "My Agency Profile || IKASOWi - Real Estate",
  description: "IKASOWi - Real Estate",
};

const index = () => {
  return (
    <>
      <AgencyProfile />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
