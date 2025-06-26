import dynamic from "next/dynamic";
import MyDashboard from "@/components/dashboard/my-dashboard";

export const metadata = {
  title: "Dashboard || IKASOWi - Real Estate",
  description: "IKASOWi - Real Estate",
};

const index = () => {
  return (
    <>
      <MyDashboard />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
