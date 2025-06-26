import dynamic from "next/dynamic";
import MyMessage from "@/components/dashboard/my-message";

export const metadata = {
  title: "My Inquiries || IKASOWi - Real Estate",
  description: "IKASOWi - Real Estate",
};

const index = () => {
  return (
    <>
      <MyMessage />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
