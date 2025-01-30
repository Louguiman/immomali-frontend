import dynamic from "next/dynamic";
import UsersManagement from "@/components/dashboard/users-management";

export const metadata = {
  title: "User Management || FindHouse - Real Estate React Template",
  description: "FindHouse - Real Estate React Template",
};

const index = () => {
  return (
    <>
      <UsersManagement />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
