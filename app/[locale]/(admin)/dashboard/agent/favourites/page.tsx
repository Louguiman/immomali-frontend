import dynamic from "next/dynamic";
import MyFavourites from "@/components/dashboard/my-favourites";

export const metadata = {
  title: "My Favourites || IKASOWi - Real Estate",
  description: "IKASOWi - Real Estate",
};

const index = () => {
  return (
    <>
      <MyFavourites />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
