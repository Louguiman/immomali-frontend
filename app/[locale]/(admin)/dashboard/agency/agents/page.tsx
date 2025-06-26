import AgentManagement from "@/components/dashboard/agents-management";
import dynamic from "next/dynamic";

export const metadata = {
  title: "Agents Management || IKASOWi - Real Estate",
  description: "IKASOWi - Real Estate",
};

const index = () => {
  return (
    <>
      <AgentManagement />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
