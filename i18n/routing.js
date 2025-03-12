import { defineRouting } from "next-intl/routing";

export const locales = ["en", "fr"]; // supported locales
export const defaultLocale = "en"; // default locale if no match

export const routing = defineRouting({
  locales, // List of supported locales
  defaultLocale, // Default locale if no match
});
