import dynamic from "next/dynamic";
import Mytenancy from "@/components/dashboard/my-tenancies/my-tenancies";

export const metadata = {
  title: "My Tenancies || IKASOWi - Real Estate",
  description: "IKASOWi - Real Estate",
};

const index = () => {
  return (
    <>
      <Mytenancy />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
