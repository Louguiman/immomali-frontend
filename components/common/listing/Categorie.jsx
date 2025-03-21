"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

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
        console.error("Error fetching categories:", error);
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
          <li key={index}>
            <a href="#">
              <i className="fa fa-caret-right mr10"></i>
              {t(`categories.${category.category}`, category.category)}
              {/* Translated category name */}
              <span className="float-end">{category.count} properties</span>
            </a>
          </li>
        ))
      ) : (
        <li>{t("no_categories", "No categories available.")}</li> // Fallback if no categories
      )}
    </>
  );
}
