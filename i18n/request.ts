import { getRequestConfig } from "next-intl/server";
import {} from "next-intl";
import { routing } from "./routing";
import { loadTranslations } from "@/utils/loadTranslation";

export default getRequestConfig(async ({ requestLocale }) => {
  try {
    // Typically corresponds to the `[locale]` segment
    const requested = await requestLocale;
    console.log("incoming requestLocale:", requested);

    if (!requested) {
      throw new Error('No locale provided in request');
    }

    const locale = routing.locales.includes(requested as string)
      ? requested as string
      : routing.defaultLocale;
    
    console.log("requestLocale: set ", locale);

    if (!locale) {
      throw new Error('No valid locale found');
    }

    const messages = await loadTranslations(locale);
    
    if (!messages) {
      throw new Error(`Failed to load messages for locale: ${locale}`);
    }

    return {
      locale,
      messages,
    };
  } catch (error) {
    console.error('Error in i18n request handler:', error);
    // Fallback to default locale
    return {
      locale: routing.defaultLocale,
      messages: await loadTranslations(routing.defaultLocale) || {},
    };
  }
});
