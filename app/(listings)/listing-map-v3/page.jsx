import dynamic from "next/dynamic";
import ListingMapV3 from "@/components/listing-half-map/listing-map-v3";

export const metadata = {
  title: "Listing - Map V3 || ImmoMali - Real Estate",
  description: "ImmoMali - Real Estate",
};

const index = () => {
  return (
    <>
      <ListingMapV3 />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
