import React from "react";
import Image from "next/image";

// Define an interface for a Property (adapt as necessary)
// interface Property {
//   id: number;
//   title: string;
//   location: string;
//   price: number;
//   createdAt: string;
//   status: string;
//   views: number;
//   img: string;
//   // Additional fields can be added as needed
// }

// // Define the header interface
// interface Header {
//   label: string;
//   key: string;
// }

// Define the props interface for TableData
// interface TableDataProps {
//   data: Property[];
//   headers?: Header[];
//   onEdit: (property: Property) => void;
//   onDelete: (id: number) => void;
// }

// Default headers if none are provided
const defaultHeaders = [
  { label: "Property", key: "title" },
  { label: "Type", key: "listynfType" },
  { label: "Price/Rent ", key: "price" },
  { label: "Views", key: "views" },
  { label: "Status", key: "status" },
  { label: "Published Date", key: "createdAt" },
  { label: "Action", key: "action" },
];

const TableData = ({ data, headers = defaultHeaders, onEdit, onDelete }) => {
  return (
    <table className="table">
      <thead className="thead-light">
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header.label}</th>
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
                  src={item.images[0]?.imageUrl}
                  alt={item.title}
                />
                <div>
                  <h5>{item.title}</h5>
                  <p className="mb-0">
                    <small>{item.location}</small>
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
                {item.status}
              </span>
            </td>
            {/* Published Date Column */}
            <td>{new Date(item.createdAt).toLocaleDateString()}</td>

            {/* Action Column */}
            <td>
              <ul className="list-inline mb-0">
                <li className="list-inline-item" title="Edit">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onEdit(item.id)}
                  >
                    <i className="fa fa-edit"></i>
                  </button>
                </li>
                <li className="list-inline-item" title="Delete">
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete(item.id)}
                  >
                    <i className="fa fa-trash"></i>
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
