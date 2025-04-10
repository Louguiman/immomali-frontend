import dynamic from "next/dynamic";
import AgencyV1 from "@/components/agency-view/agency-v1";

export const metadata = {
  title: "Agencies Listing – AgencyV1 || IMMOMALI - Real Estate",
  description: "IMMOMALI - Real Estate ",
};

const index = () => {
  return (
    <>
      <AgencyV1 />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
