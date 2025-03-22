import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

// Define an interface for a Property (adapt as necessary)
// interface Property {
//   id: number;
//   title: string;
//   address: string;
//   city: string;
//   country: string;
//   price: number;
//   createdAt: string;
//   status: string;
//   views: number;
//   images: { imageUrl: string }[]; // Ensure images is an array of objects
//   listingType: string;
// }

// // Define the header interface
// interface Header {
//   label: string;
//   key: string;
// }

// // Define the props interface for TableData
// interface TableDataProps {
//   data: Property[];
//   headers?: Header[];
//   onEdit: (id: number) => void;
//   onDelete: (id: number) => void;
// }

// Default headers if none are provided
const defaultHeaders = [
  { label: "Property", key: "title" },
  { label: "Type", key: "listingType" },
  { label: "Price/Rent", key: "price" },
  { label: "Views", key: "views" },
  { label: "Status", key: "status" },
  { label: "Published Date", key: "createdAt" },
  { label: "Action", key: "action" },
];

const TableData = ({ data, headers = defaultHeaders, onEdit, onDelete }) => {
  const t = useTranslations("property"); // Initialize the translations hook

  return (
    <table className="table">
      <thead className="thead-light">
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{t(header.label) || header.label}</th> // Using translation for header labels
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {/* Title Column with Image and Location */}
            <td>
              <div className="d-flex align-items-center">
                <Image
                  width={150}
                  height={100}
                  className="img-thumbnail me-2"
                  src={item.images[0]?.imageUrl || "/placeholder-image.jpg"} // Fallback image
                  alt={item.title}
                />
                <div>
                  <h5>{item.title}</h5>
                  <p className="mb-0">
                    <small>{item.address}</small>
                    <small>{item.city}</small>
                    <small>{item.country}</small>
                  </p>
                </div>
              </div>
            </td>

            <td>{item.listingType}</td>
            <td>{item.price} </td>
            {/* Views Column */}
            <td>{item.views}</td>

            {/* Status Column */}
            <td>
              <span
                className={`badge ${
                  item.status === "active" ? "bg-success" : "bg-warning"
                }`}
              >
                {t(item.status) || item.status} {/* Translating status */}
              </span>
            </td>
            {/* Published Date Column */}
            <td>{new Date(item.createdAt).toLocaleDateString()}</td>

            {/* Action Column */}
            <td>
              <ul className="list-inline mb-0">
                <li className="list-inline-item" title={t("edit") || "Edit"}>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onEdit(item.id)}
                  >
                    <i className="fa fa-edit"></i> {t("edit")}
                  </button>
                </li>
                <li
                  className="list-inline-item"
                  title={t("delete") || "Delete"}
                >
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete(item.id)}
                  >
                    <i className="fa fa-trash"></i> {t("delete")}
                  </button>
                </li>
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableData;
