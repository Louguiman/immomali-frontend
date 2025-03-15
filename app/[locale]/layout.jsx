import ScrollToTop from "@/components/common/ScrollTop";
import "@/public/assets/scss/index.scss";
import "react-toastify/dist/ReactToastify.css";
import StoreProvider from "./StoreProvider";
import { ToastContainer } from "react-toastify";
import AuthProvider from "@/features/auth/AuthProvider";
import I18nProvider from "@/providers/I18nProvider";
import { routing } from "@/i18n/routing";
import notFound from "./not-found";

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }];
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  console.log("root locale: ", locale);
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Nunito:400,400i,500,600,700&display=swap"
        />
        <link rel="icon" href="./favicon.ico" />
      </head>
      <body>
        <I18nProvider>
          <StoreProvider>
            <AuthProvider>{children}</AuthProvider>
          </StoreProvider>
          <ToastContainer position="top-right" autoClose={3000} />
          <ScrollToTop />
        </I18nProvider>
      </body>
    </html>
  );
}
