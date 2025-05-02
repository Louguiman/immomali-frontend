const { default: LazyIcon } = require("@/components/LazyIcon");

module.exports = [
  {
    id: 1,
    title: "Modern Villa",
    key: "categories.villa",
    route: "/properties?category=villa",
    icon: <span className={"flaticon-house"}></span>,
    text: `Aliquam dictum elit vitae mauris facilisis, at dictum urna.`,
  },
  {
    id: 2,
    title: "Family House",
    key: "categories.house",
    icon: <span className={"flaticon-house-1"}></span>,
    route: "/properties?category=house",
    text: `Aliquam dictum elit vitae mauris facilisis, at dictum urna.`,
  },
  {
    id: 3,
    title: "Office",
    icon: <span className={"flaticon-house-2"}></span>,
    key: "categories.office",
    route: "/properties?category=office",
    text: `Aliquam dictum elit vitae mauris facilisis, at dictum urna.`,
  },
  {
    id: 4,
    title: "Apartment",
    icon: <span className={"flaticon-building"}></span>,
    key: "categories.apartment",
    route: "/properties?category=apartment",
    text: `Aliquam dictum elit vitae mauris facilisis, at dictum urna.`,
  },
  {
    id: 5,
    title: "Land",
    icon: <LazyIcon iconName="004-land" alt="House Icon" />,
    key: "categories.land",
    route: "/properties?category=land",
    text: `Aliquam dictum elit vitae mauris facilisis, at dictum urna.`,
  },
];
