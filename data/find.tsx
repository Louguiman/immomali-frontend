import React from "react";
import {
  HiHomeModern,
  HiHome,
  HiBuildingOffice2,
  HiBuildingOffice,
  HiMap,
} from "react-icons/hi2";

interface CategoryData {
  id: number;
  title: string;
  key: string;
  route: string;
  icon: React.ReactNode;
  text: string;
}

const data: CategoryData[] = [
  {
    id: 1,
    title: "Modern Villa",
    key: "categories.villa",
    route: "/properties?category=villa",
    icon: (
      <div className="p-2 bg-primary/10 rounded-full">
        <HiHomeModern
          size={30}
          className="text-primary"
        />
      </div>
    ),
    text: `Aliquam dictum elit vitae mauris facilisis, at dictum urna.`,
  },
  {
    id: 2,
    title: "Family House",
    key: "categories.house",
    icon: (
      <div className="p-2 bg-primary/10 rounded-full">
        <HiHome
          size={30}
          className="text-primary"
        />
      </div>
    ),
    route: "/properties?category=house",
    text: `Aliquam dictum elit vitae mauris facilisis, at dictum urna.`,
  },
  {
    id: 3,
    title: "Office",
    icon: (
      <div className="p-2 bg-primary/10 rounded-full">
        <HiBuildingOffice2
          size={30}
          className="text-primary"
        />
      </div>
    ),
    key: "categories.office",
    route: "/properties?category=office",
    text: `Aliquam dictum elit vitae mauris facilisis, at dictum urna.`,
  },
  {
    id: 4,
    title: "Apartment",
    icon: (
      <div className="p-2 bg-primary/10 rounded-full">
        <HiBuildingOffice
          size={30}
          className="text-primary"
        />
      </div>
    ),
    key: "categories.apartment",
    route: "/properties?category=apartment",
    text: `Aliquam dictum elit vitae mauris facilisis, at dictum urna.`,
  },
  {
    id: 5,
    title: "Land",
    icon: (
      <div className="p-2 bg-primary/10 rounded-full">
        <HiMap
          size={30}
          className="text-primary"
        />
      </div>
    ),
    key: "categories.land",
    route: "/properties?category=land",
    text: `Aliquam dictum elit vitae mauris facilisis, at dictum urna.`,
  },
];

export default data;
