function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export { cn };

export const getAccountMenu = (userRoles = []) => {
  // Determine if the user is an agent or agency
  const rolePath = userRoles.includes("agent")
    ? "agent"
    : userRoles.includes("agency")
    ? "agency"
    : "";

  return {
    name: "Account",
    subMenu: [
      {
        name: "dashboard",
        // routerPath: rolePath ? `/dashboard/${rolePath}` : "/dashboard",
        routerPath: rolePath ? `/dashboard` : "/dashboard",
      },
      {
        name: "myProfile",
        routerPath: rolePath
          ? `/dashboard/${rolePath}/profile`
          : "/dashboard/my-profile",
      },
      {
        name: "myProperties",
        routerPath: rolePath
          ? `/dashboard/${rolePath}/properties`
          : "/dashboard/my-properties",
      },
      {
        name: "myInquiries",
        routerPath: rolePath
          ? `/dashboard/${rolePath}/inquiries`
          : "/dashboard/my-inquiries",
      },
      {
        name: "myRequests",
        routerPath: rolePath
          ? `/dashboard/${rolePath}/maintenance-request`
          : "/dashboard/maintenance-request",
      },
      {
        name: "rentPayments",
        routerPath: rolePath
          ? `/dashboard/${rolePath}/invoices`
          : "/dashboard/my-invoices",
      },
    ],
  };
};
