import dynamic from "next/dynamic";
import MyPackage from "@/components/dashboard/my-package";

export const metadata = {
  title: "My Package || IKASOWi - Real Estate",
  description: "IKASOWi - Real Estate",
};

const index = () => {
  return (
    <>
      <MyPackage />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
