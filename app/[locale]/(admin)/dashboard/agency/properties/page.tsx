import dynamic from "next/dynamic";
import MyProperties from "@/components/dashboard/my-properties";

export const metadata = {
  title: "My Properties || IKASOWi - Real Estate",
  description: "IKASOWi - Real Estate",
};

const index = () => {
  return (
    <>
      <MyProperties />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
