import AgentManagement from "@/components/dashboard/agents-management";
import dynamic from "next/dynamic";

export const metadata = {
  title: "Agents Management || ImmoMali - Real Estate",
  description: "ImmoMali - Real Estate",
};

const index = () => {
  return (
    <>
      <AgentManagement />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
