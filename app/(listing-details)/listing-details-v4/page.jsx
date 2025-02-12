import dynamic from "next/dynamic";
import ListingDetailsV4 from "@/components/listing-details-v4";

export const metadata = {
  title: "Listing Single – Details V4 || ImmoMali - Real Estate",
  description: "ImmoMali - Real Estate",
};

const index = () => {
  return (
    <>
      <ListingDetailsV4 />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
