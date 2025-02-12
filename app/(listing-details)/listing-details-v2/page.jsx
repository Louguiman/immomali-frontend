import dynamic from "next/dynamic";
import ListingDetailsV2 from "@/components/listing-details-v2";

export const metadata = {
  title: "Listing Single – Details V2 || ImmoMali - Real Estate",
  description: "ImmoMali - Real Estate",
};

const index = () => {
  return (
    <>
      <ListingDetailsV2 />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
