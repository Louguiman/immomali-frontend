import dynamic from "next/dynamic";
import { AgentInvoicesPage } from "@/components/dashboard/agent-dashboard/invoice";

export const metadata = {
  title: "Invoices || IKASOWi - Real Estate",
  description: "IKASOWi - Real Estate",
};

const index = () => {
  return (
    <>
      <AgentInvoicesPage />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
