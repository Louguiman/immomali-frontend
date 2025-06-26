import dynamic from "next/dynamic";
import Gallery from "@/components/gallery";

export const metadata = {
  title: "Gallery || IKASOWi - Real Estate",
  description: "IKASOWi - Real Estate",
};

const index = () => {
  return (
    <>
      <Gallery />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
