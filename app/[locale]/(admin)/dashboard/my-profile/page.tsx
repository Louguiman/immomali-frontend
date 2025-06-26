import dynamic from "next/dynamic";
import MyProfile from "@/components/dashboard/my-profile";

export const metadata = {
  title: "My Profile || IKASOWi - Real Estate",
  description: "IKASOWi - Real Estate",
};

const index = () => {
  return (
    <>
      <MyProfile />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
