import dynamic from "next/dynamic";
import Membership from "@/components/membership";

export const metadata = {
  title: "Membership || IKASOWi - Real Estate",
  description: "IKASOWi - Real Estate",
};

const index = () => {
  return (
    <>
      <Membership />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
