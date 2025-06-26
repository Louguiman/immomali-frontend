import dynamic from "next/dynamic";
import Terms from "@/components/terms-conditions";

export const metadata = {
  title: "Terms & Conditions || IKASOWi - Real Estate",
  description: "IKASOWi - Real Estate",
};

const index = () => {
  return (
    <>
      <Terms />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
