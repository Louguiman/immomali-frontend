import dynamic from "next/dynamic";
import Login from "@/components/login";

export const metadata = {
  title: "Login || ImmoMali - Real Estate",
  description: "ImmoMali - Real Estate",
};

const index = () => {
  return (
    <>
      <Login />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
