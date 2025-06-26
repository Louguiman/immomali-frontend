import dynamic from "next/dynamic";
import Faq from "@/components/faq";

export const metadata = {
  title: "Faq || IKASOWi - Real Estate",
  description: "IKASOWi - Real Estate",
};

const index = () => {
  return (
    <>
      <Faq />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
