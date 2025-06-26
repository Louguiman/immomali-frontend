import dynamic from "next/dynamic";
import BlogV1 from "@/components/blog-list-1";

export const metadata = {
  title: "Blog List 1 || IKASOWi - Real Estate",
  description: "IKASOWi - Real Estate",
};

const index = () => {
  return (
    <>
      <BlogV1 />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
