import dynamic from "next/dynamic";
import ParallaxStyle from "@/components/listing-style/parallax-style";

export const metadata = {
  title: "Listing - Parallax Style || IKASOWi - Real Estate",
  description: "IKASOWi - Real Estate",
};

const index = () => {
  return (
    <>
      <ParallaxStyle />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
