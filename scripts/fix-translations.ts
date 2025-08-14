const fs = require("fs");
const path = require("path");
const { set } = require("lodash");

// Type definitions for better type checking
interface TranslationObject {
  [key: string]: any;
}

// Path to your translations folders
const locales = ["en", "fr"];
const baseDir = path.join(__dirname, "../public/locales");

locales.forEach((locale) => {
  const localeDir = path.join(baseDir, locale);

  if (!fs.existsSync(localeDir)) {
    console.warn(`Locale directory not found: ${localeDir}`);
    return;
  }

  fs.readdirSync(localeDir).forEach((file: string) => {
    if (!file.endsWith(".json")) return;

    const filePath = path.join(localeDir, file);
    const raw = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const nested: TranslationObject = {};
    Object.entries(raw).forEach(([key, value]) => {
      set(nested, key, value);
    });

    fs.writeFileSync(filePath, JSON.stringify(nested, null, 2), "utf8");
    console.log(`Fixed: ${locale}/${file}`);
  });
});
