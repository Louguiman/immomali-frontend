import dynamic from "next/dynamic";
import HomeMain from "@/components/home-8/Home8";

export const metadata = {
  title: "Home-8 || ImmoMali - Real Estate",
  description: "ImmoMali - Real Estate",
};

const index = () => {
  return (
    <>
      <HomeMain />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
