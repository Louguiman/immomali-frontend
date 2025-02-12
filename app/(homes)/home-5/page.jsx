import dynamic from "next/dynamic";
import HomeMain from "@/components/home-5";

export const metadata = {
  title: "Home-5 || ImmoMali - Real Estate",
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
