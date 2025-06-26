"use client";

import { useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { cn } from "@/utils/lib";
import { useParams } from "next/navigation";

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: "en", name: "English", flag: "/assets/images/resource/english.jpg" },
  { code: "fr", name: "Français", flag: "/assets/images/resource/franch.jpg" },
];

export default function LanguageSwitcher() {
  const params = useParams();
  const currentLocale = typeof params['locale'] === 'string' ? params['locale'] : 'en';
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language | undefined>(
    languages.find((lang) => lang.code === currentLocale) || languages[0]
  );

  const changeLanguage = (locale: string): void => {
    if (!locale) return;
    
    // Set the locale cookie
    document.cookie = `NEXT_LOCALE=${locale}; path=/`;
    
    // Update the URL with the new locale
    startTransition(() => {
      const newPath = pathname ? `/${locale}${pathname.substring(3)}` : `/${locale}`;
      router.replace(newPath);
    });
    
    // Update the current language
    const newLang = languages.find((lang) => lang.code === locale);
    if (newLang) {
      setCurrentLang(newLang);
    }
    
    setIsOpen(false);
  };

  return (
    <div
      className={`relative ${
        isPending && "transition-opacity [&:disabled]:opacity-30"
      }`}
    >
      <button
        disabled={isPending}
        className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          src={currentLang?.flag || "/flags/us.svg"}
          width={20}
          height={20}
          alt={currentLang?.name || "Lang"}
        />
        <span className="ml-5">{currentLang?.name}</span>
      </button>

      {isOpen && (
        <ul className="absolute mt-2 w-40 bg-white shadow-lg rounded-lg overflow-hidden">
          {languages.map((lang) => (
            <li
              key={lang.code}
              className={cn(
                "flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100",
                currentLocale === lang.code && "bg-gray-300"
              )}
              onClick={() => changeLanguage(lang.code)}
            >
              <Image
                className="mr-1"
                src={lang.flag}
                width={18}
                height={18}
                alt={lang.name}
              />
              {lang.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
