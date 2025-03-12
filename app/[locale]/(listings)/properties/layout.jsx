import React from "react";

function Layout({ children }) {
  return <React.Suspense>{children}</React.Suspense>;
}

export default Layout;
