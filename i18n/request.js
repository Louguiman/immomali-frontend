import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  console.log("incomming requestLocale:", requested);

  const locale = routing.locales.includes(requested)
    ? requested
    : routing.defaultLocale;
  console.log("requestLocale:  set ", locale);

  const propertyMessages = await import(
    `@/public/locales/${locale}/property.json`
  );

  const commonMessages = await import(`@/public/locales/${locale}/common.json`);
  const homeMessages = await import(`@/public/locales/${locale}/home.json`);
  const searchMessages = await import(`@/public/locales/${locale}/search.json`);
  const navbarMessages = await import(`@/public/locales/${locale}/navbar.json`);
  const messages = {
    ...homeMessages.default,
    ...navbarMessages.default,
    ...commonMessages.default,
    ...searchMessages.default,
    ...propertyMessages.default,
  };

  return {
    locale,
    messages,
  };
});
