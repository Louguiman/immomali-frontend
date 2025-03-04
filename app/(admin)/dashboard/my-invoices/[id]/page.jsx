import InvoicePage from "@/components/invoice/InvoiceDetailsPage";
import dynamic from "next/dynamic";

export const metadata = {
  title: "My Invoice details || ImmoMali - Real Estate",
  description: "ImmoMali - Real Estate",
};

const index = () => {
  return (
    <>
      <InvoicePage />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
