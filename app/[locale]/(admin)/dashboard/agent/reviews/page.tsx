import dynamic from "next/dynamic";
import MyReview from "@/components/dashboard/my-review";

export const metadata = {
  title: "My Review || IKASOWi - Real Estate",
  description: "IKASOWi - Real Estate",
};

const index = () => {
  return (
    <>
      <MyReview />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
