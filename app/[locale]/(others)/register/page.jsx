import dynamic from "next/dynamic";
import SignUp from "@/components/register";

export const metadata = {
  title: "SignUp || ImmoMali - Real Estate",
  description: "ImmoMali - Real Estate",
};

const index = () => {
  return (
    <>
      <SignUp />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
