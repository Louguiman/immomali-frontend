"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Categorie() {
  const t = useTranslations("property"); // Access translations from the 'property' namespace
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/statistics/categories`
        );

        if (!response.ok) {
          throw new Error(
            `API Error: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          setError("Invalid data format received.");
        }
      } catch (error) {
        console.log("Error fetching categories:", error);
        setError("Failed to load categories.");
      }
    };

    fetchCategories();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {categories.length > 0 ? (
        categories.map((category, index) => (
          <Link
            key={index}
            href={`/properties?category=${category.category}`}
            className="d-flex justify-content-between align-items-center py-2 px-3 border-bottom"
          >
            <i className="fa fa-caret-right mr10"></i>
            {t(`categories.${category.category}`, category.category)}
            {/* Translated category name */}
            <span className="float-end">
              {category.count} {t("Properties")}
            </span>
          </Link>
        ))
      ) : (
        <li>{t("no_categories", "No categories available.")}</li> // Fallback if no categories
      )}
    </>
  );
}
