import dynamic from "next/dynamic";
import Compare from "@/components/compare";

export const metadata = {
  title: "Compare || IKASOWi - Real Estate",
  description: "IKASOWi - Real Estate",
};

const index = () => {
  return (
    <>
      <Compare />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
