import dynamic from "next/dynamic";
import AboutUs from "@/components/about-us";

export const metadata = {
  title: "About Us || IKASOWi - Real Estate",
  description: "IKASOWi - Real Estate",
};

const index = () => {
  return (
    <>
      <AboutUs />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
