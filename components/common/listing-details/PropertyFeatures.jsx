"use client";

const PropertyFeatures = ({ amenities }) => {
  if (!amenities) return null; // Prevents rendering if no data is available

  // Convert amenities object into an array of enabled features
  const featureList = Object.entries(amenities)
    .filter(([_, value]) => value === true) // Only keep enabled amenities
    .map(([key]) => key.replace(/([A-Z])/g, " $1").trim()); // Format names

  // Split features into 3 balanced groups for layout
  const chunkSize = Math.ceil(featureList.length / 3);
  const propertyFeatures = [
    featureList.slice(0, chunkSize),
    featureList.slice(chunkSize, chunkSize * 2),
    featureList.slice(chunkSize * 2),
  ];

  return (
    <>
      {propertyFeatures.map((list, index) => (
        <div className="col-sm-6 col-md-6 col-lg-4" key={index}>
          <ul className="order_list list-inline-item">
            {list.map((feature, i) => (
              <li key={i}>
                <span className="flaticon-tick"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default PropertyFeatures;
