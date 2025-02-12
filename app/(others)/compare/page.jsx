import dynamic from "next/dynamic";
import Compare from "@/components/compare";

export const metadata = {
  title: "Compare || ImmoMali - Real Estate",
  description: "ImmoMali - Real Estate",
};

const index = () => {
  return (
    <>
      <Compare />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
