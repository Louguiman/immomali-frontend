import dynamic from "next/dynamic";
import AgencyProfile from "@/components/dashboard/my-profile/AgencyProfile";

export const metadata = {
  title: "My Agency Profile || ImmoMali - Real Estate",
  description: "ImmoMali - Real Estate",
};

const index = () => {
  return (
    <>
      <AgencyProfile />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
