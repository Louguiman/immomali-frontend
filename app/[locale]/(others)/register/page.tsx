import dynamic from "next/dynamic";
import SignUp from "@/components/register";

export const metadata = {
  title: "SignUp || IKASOWi - Real Estate",
  description: "IKASOWi - Real Estate",
};

const index = () => {
  return (
    <>
      <SignUp />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
