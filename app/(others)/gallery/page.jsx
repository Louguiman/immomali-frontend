import dynamic from "next/dynamic";
import Gallery from "@/components/gallery";

export const metadata = {
  title: "Gallery || ImmoMali - Real Estate",
  description: "ImmoMali - Real Estate",
};

const index = () => {
  return (
    <>
      <Gallery />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
