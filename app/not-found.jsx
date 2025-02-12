import dynamic from "next/dynamic";
import NotFound from "@/components/404";

export const metadata = {
  title: "404 Not Found || ImmoMali - Real Estate",
  description: "ImmoMali - Real Estate",
};

const index = () => {
  return (
    <>
      <NotFound />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
