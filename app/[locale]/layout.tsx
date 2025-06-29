import ScrollToTop from "@/components/common/ScrollTop";
import "@/public/assets/scss/index.scss";
import "react-toastify/dist/ReactToastify.css";
import StoreProvider from "./StoreProvider";
import { ToastContainer } from "react-toastify";
import AuthProvider from "@/features/auth/AuthProvider";
import I18nProvider from "@/providers/I18nProvider";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import BootstrapClientScript from "./components/BootstrapClientScript";
import TokenRehydrate from "./TokenRehydrate";
if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }];
}

import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;
  console.log("root locale: ", locale);
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        {/* Font link moved to _document.tsx for proper Next.js usage */}
        <link rel="icon" href="/assets/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/favicon-16x16.png"
        />
        <link rel="manifest" href="/assets/site.webmanifest" />
      </head>
      <body>
        <I18nProvider>
          <StoreProvider>
            <TokenRehydrate />
            <AuthProvider>{children}</AuthProvider>
          </StoreProvider>
          <ToastContainer position="top-right" autoClose={3000} />
          <ScrollToTop />
        </I18nProvider>
        {/* ✅ Dynamically load Bootstrap JS only on the client */}
        <BootstrapClientScript />
      </body>
    </html>
  );
}
