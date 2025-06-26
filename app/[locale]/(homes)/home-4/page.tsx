import dynamic from "next/dynamic";
import HomeMain from "@/components/home-4";

export const metadata = {
  title: "Home-4 || IKASOWi - Real Estate",
  description: "IKASOWi - Real Estate",
};

const index = () => {
  return (
    <>
      <HomeMain />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
