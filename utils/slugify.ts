// utils/slugify.ts
export const slugify = (text: string): string =>
  text
    .toLowerCase()
    .normalize("NFD") // Normalize accents
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
