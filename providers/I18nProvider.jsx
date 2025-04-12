"use client";

import { locales } from "@/i18n";
import { loadTranslations } from "@/utils/loadTranslation";
import { NextIntlClientProvider } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
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
        const messages = await loadTranslations(locale);
        setMessages(messages);
      } catch (error) {
        console.log(`Failed to load translations for ${locale}:`, error);
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
