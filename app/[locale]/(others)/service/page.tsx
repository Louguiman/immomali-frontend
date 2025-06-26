import dynamic from "next/dynamic";
import Service from "@/components/service";

export const metadata = {
  title: "Service || IKASOWi - Real Estate",
  description: "IKASOWi - Real Estate",
};

const index = () => {
  return (
    <>
      <Service />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
