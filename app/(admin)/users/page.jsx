import dynamic from "next/dynamic";
import UsersManagement from "@/components/dashboard/users-management";

export const metadata = {
  title: "User Management || ImmoMali - Real Estate",
  description: "ImmoMali - Real Estate",
};

const index = () => {
  return (
    <>
      <UsersManagement />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
