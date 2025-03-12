import dynamic from "next/dynamic";
import Service from "@/components/service";

export const metadata = {
  title: "Service || ImmoMali - Real Estate",
  description: "ImmoMali - Real Estate",
};

const index = () => {
  return (
    <>
      <Service />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
