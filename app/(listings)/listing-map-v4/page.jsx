import dynamic from "next/dynamic";
import ListingMapV4 from "@/components/listing-half-map/listing-map-v4";

export const metadata = {
  title: "Listing - Map V4 || ImmoMali - Real Estate",
  description: "ImmoMali - Real Estate",
};

const index = () => {
  return (
    <>
      <ListingMapV4 />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
