async function loadTranslations(locale: string): Promise<Record<string, any>> {
  const commonMessages = await import(`@/public/locales/${locale}/common.json`);
  const homeMessages = await import(`@/public/locales/${locale}/home.json`);
  const searchMessages = await import(`@/public/locales/${locale}/search.json`);
  const navbarMessages = await import(`@/public/locales/${locale}/navbar.json`);
  const propertyMessages = await import(
    `@/public/locales/${locale}/property.json`
  );
  const sidebarMessages = await import(
    `@/public/locales/${locale}/sidebar.json`
  );
  const dashboardMessages = await import(
    `@/public/locales/${locale}/dashboard.json`
  );
  const agencyMessages = await import(`@/public/locales/${locale}/agency.json`); // Fallback to English for agency messages
  const messages = {
    ...homeMessages.default,
    ...navbarMessages.default,
    ...commonMessages.default,
    ...searchMessages.default,
    ...propertyMessages.default,
    ...sidebarMessages.default,
    ...dashboardMessages.default,
    ...agencyMessages.default,
  };
  return messages;
}

export { loadTranslations };
