import dynamic from "next/dynamic";
import InvoiceManagement from "@/components/dashboard/my-invoices";

export const metadata = {
  title: "My Invoices || ImmoMali - Real Estate",
  description: "ImmoMali - Real Estate",
};

const index = () => {
  return (
    <>
      <InvoiceManagement />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
