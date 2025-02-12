import dynamic from "next/dynamic";
import HomeMain from "@/components/home-6";

export const metadata = {
  title: "Home-6 || ImmoMali - Real Estate",
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
