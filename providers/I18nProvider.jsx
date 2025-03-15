"use client";

import { locales } from "@/i18n";
import { NextIntlClientProvider } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { useEffect, useState } from "react";

export default function I18nProvider({ children }) {
  const pathname = usePathname();

  // Extract locale from the URL (e.g., /en/home -> "en")
  const pathLocale = pathname.split("/")[1];

  // Ensure it's a supported locale, fallback to "en"
  const locale = locales.includes(pathLocale) ? pathLocale : "en";

  const [messages, setMessages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load messages dynamically
  useEffect(() => {
    async function loadMessages(locale) {
      setIsLoading(true);
      try {
        const commonMessages = await import(
          `@/public/locales/${locale}/common.json`
        );
        const homeMessages = await import(
          `@/public/locales/${locale}/home.json`
        );
        const searchMessages = await import(
          `@/public/locales/${locale}/search.json`
        );
        const navbarMessages = await import(
          `@/public/locales/${locale}/navbar.json`
        );
        const propertyMessages = await import(
          `@/public/locales/${locale}/property.json`
        );

        setMessages({
          ...commonMessages.default,
          ...homeMessages.default,
          ...searchMessages.default,
          ...navbarMessages.default,
          ...propertyMessages.default,
        });
      } catch (error) {
        console.error(`Failed to load translations for ${locale}:`, error);
      } finally {
        setIsLoading(false);
      }
    }

    loadMessages(locale);

    return () => {};
  }, [locale]);

  if (isLoading) return <div>Loading...</div>;

  if (!messages) return null; // Prevent rendering before messages are loaded

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
