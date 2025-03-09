"use client";

const PropertyDetails = ({ property }) => {
  if (!property) return null; // Prevents rendering if no data is available

  // Define property details dynamically
  const details = [
    [
      { label: "Property ID", value: property.id },
      { label: "Price", value: `${property.price.toLocaleString()} FCFA` },
      { label: "Property Size", value: `${property.sqFt} Sq Ft` },
      { label: "Year Built", value: property.builtYear },
    ],
    [
      { label: "Bedrooms", value: property.beds },
      { label: "Bathrooms", value: property.baths },
      { label: "Garage", value: property.garages },
      {
        label: "Garage Size",
        value: property.garageSize ? `${property.garageSize} Sq Ft` : "N/A",
      },
    ],
    [
      { label: "Category", value: property.category },
      {
        label: "Property Type",
        value: property.type === "rent" ? "For Rent" : "For Sale",
      },
    ],
  ];

  return (
    <>
      {details.map((column, index) => (
        <div key={index} className="col-md-6 col-lg-6 col-xl-4">
          <ul className="list-inline-item">
            {column.map(({ label, value }, idx) => (
              <li key={idx}>
                <p>
                  {label} : <span>{value}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default PropertyDetails;
