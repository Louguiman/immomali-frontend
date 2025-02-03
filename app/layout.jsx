"use client";

import ScrollToTop from "@/components/common/ScrollTop";
import "../public/assets/scss/index.scss";
import "react-toastify/dist/ReactToastify.css";
import StoreProvider from "./StoreProvider";

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Nunito:400,400i,500,600,700&display=swap"
        />
        <link rel="icon" href="./favicon.ico" />
      </head>
      <body>
        <StoreProvider>{children}</StoreProvider>

        <ScrollToTop />
      </body>
    </html>
  );
}
