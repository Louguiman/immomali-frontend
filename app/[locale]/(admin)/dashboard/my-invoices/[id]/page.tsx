import InvoicePage from "@/components/invoice/InvoiceDetailsPage";
import dynamic from "next/dynamic";

export const metadata = {
  title: "My Invoice details || IKASOWi - Real Estate",
  description: "IKASOWi - Real Estate",
};

const index = () => {
  return (
    <>
      <InvoicePage />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
