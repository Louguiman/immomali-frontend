"use client";

import Link from "next/link";
import { isSinglePageActive } from "../../../../utils/daynamicNavigation";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

const MyAccount = () => {
  const pathname = usePathname();
  const user = useSelector((state) => state.auth?.user);

  const profileMenuItems = [
    { id: 1, name: "Dashboard", routerPath: "/dashboard" },
    { id: 2, name: "My Profile", routerPath: "/dashboard/my-profile" },
    { id: 3, name: "My Properties", routerPath: "/dashboard/my-properties" },
    { id: 4, name: "My Inquiries", routerPath: "/dashboard/my-inquiries" },
    {
      id: 5,
      name: "My Requests",
      routerPath: "/dashboard/maintenance-request",
    },
    { id: 6, name: "Rent Payments", routerPath: "/dashboard/my-invoices" },
    { id: 7, name: " Log out", routerPath: "/logout" },
  ];

  return (
    <>
      <div className="user_set_header">
        <Image
          width={40}
          height={40}
          className="float-start"
          src="/assets/images/team/e1.png"
          alt="e1.png"
        />
        <p>
          Hello, {user?.name || "User"}!<br />
          <span className="address">{user?.email || "User"}</span>
          <small className="address">
            agence: {user?.agency?.name || "N/A"}
          </small>
        </p>
      </div>
      {/* End user_set_header */}

      <div className="user_setting_content">
        {profileMenuItems.map((item) => (
          <Link
            href={item.routerPath}
            key={item.id}
            className="dropdown-item"
            style={
              isSinglePageActive(`${item.ruterPath}`, pathname)
                ? { color: "#ff5a5f" }
                : undefined
            }
          >
            {item.name}
          </Link>
        ))}
      </div>
    </>
  );
};

export default MyAccount;
