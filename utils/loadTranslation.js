async function loadTranslations(locale) {
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
  const messages = {
    ...homeMessages.default,
    ...navbarMessages.default,
    ...commonMessages.default,
    ...searchMessages.default,
    ...propertyMessages.default,
    ...sidebarMessages.default,
    ...dashboardMessages.default,
  };
  return messages;
}

export { loadTranslations };
