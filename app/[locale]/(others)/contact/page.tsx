import dynamic from "next/dynamic";
import Contact from "@/components/contact";

export const metadata = {
  title: "Contact || IKASOWi - Real Estate",
  description: "IKASOWi - Real Estate",
};

const index = () => {
  return (
    <>
      <Contact />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
