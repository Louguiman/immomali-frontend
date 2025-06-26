const PropertyItem = ({ label, type, beds, baths, size }) => {
  return (
    <ul className="mb0">
      <li className="list-inline-item">
        <a href="#">{type}</a>
      </li>
      <li className="list-inline-item">
        <a href="#">
          {label.beds}: {beds}
        </a>
      </li>
      <li className="list-inline-item">
        <a href="#">
          {label.baths}: {baths}
        </a>
      </li>
      <li className="list-inline-item">
        <a href="#">
          {label.sqFt}: {size}
        </a>
      </li>
    </ul>
  );
};

export default PropertyItem;
