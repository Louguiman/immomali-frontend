import dynamic from "next/dynamic";
import AgentV1 from "@/components/agent-view/agent-v1";

export const metadata = {
  title: "Simple Listing – AgencyV1 || IKASOWI - Real Estate",
  description: "IKASOWI - Real Estate ",
};

const index = () => {
  return (
    <>
      <AgentV1 />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
