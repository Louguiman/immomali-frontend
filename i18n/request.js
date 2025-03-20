import { getRequestConfig } from "next-intl/server";
import {} from "next-intl";
import { routing } from "./routing";
import { loadTranslations } from "@/utils/loadTranslation";

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  console.log("incomming requestLocale:", requested);

  const locale = routing.locales.includes(requested)
    ? requested
    : routing.defaultLocale;
  console.log("requestLocale:  set ", locale);

  const messages = await loadTranslations(locale);
  return {
    locale,
    messages,
  };
});
