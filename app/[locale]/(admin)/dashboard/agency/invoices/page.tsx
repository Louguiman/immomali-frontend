import dynamic from "next/dynamic";
import { AgencyInvoicesPage } from "@/components/dashboard/agency-dashboard/invoice";

export const metadata = {
  title: "Invoices || IKASOWi - Real Estate",
  description: "IKASOWi - Real Estate",
};

const index = () => {
  return (
    <>
      <AgencyInvoicesPage />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
