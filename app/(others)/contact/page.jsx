import dynamic from "next/dynamic";
import Contact from "@/components/contact";

export const metadata = {
  title: "Contact || ImmoMali - Real Estate",
  description: "ImmoMali - Real Estate",
};

const index = () => {
  return (
    <>
      <Contact />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
