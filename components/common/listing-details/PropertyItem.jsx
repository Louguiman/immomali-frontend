const PropertyItem = ({ propertyType, beds, baths, size }) => {
  return (
    <ul className="mb0">
      <li className="list-inline-item">
        <a href="#">{propertyType}</a>
      </li>
      <li className="list-inline-item">
        <a href="#">Beds: {beds}</a>
      </li>
      <li className="list-inline-item">
        <a href="#">Baths: {baths}</a>
      </li>
      <li className="list-inline-item">
        <a href="#">Sq Ft: {size}</a>
      </li>
    </ul>
  );
};

export default PropertyItem;
