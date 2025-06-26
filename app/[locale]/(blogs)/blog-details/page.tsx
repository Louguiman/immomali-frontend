import dynamic from "next/dynamic";
import BlogDetails from "@/components/blog-details";

export const metadata = {
  title: "Blog Details || IKASOWi - Real Estate",
  description: "IKASOWi - Real Estate",
};

const index = () => {
  return (
    <>
      <BlogDetails />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
