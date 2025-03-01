import dynamic from "next/dynamic";
import Mytenancy from "@/components/dashboard/my-tenancies";

export const metadata = {
  title: "My Tenancies || ImmoMali - Real Estate",
  description: "ImmoMali - Real Estate",
};

const index = () => {
  return (
    <>
      <Mytenancy />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
