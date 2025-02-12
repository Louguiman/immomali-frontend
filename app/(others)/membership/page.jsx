import dynamic from "next/dynamic";
import Membership from "@/components/membership";

export const metadata = {
  title: "Membership || ImmoMali - Real Estate",
  description: "ImmoMali - Real Estate",
};

const index = () => {
  return (
    <>
      <Membership />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
