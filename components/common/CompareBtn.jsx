import {
  addToCompare,
  removeFromCompare,
} from "@/features/properties/propertiesSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const CompareButton = ({ propertyId }) => {
  const dispatch = useDispatch();
  const compareList = useSelector((state) => state.properties.compareList);

  const isCompared = compareList.includes(propertyId);

  const handleFavoriteClick = () => {
    if (isCompared) {
      dispatch(removeFromCompare(propertyId));
      toast.success(`Property with id ${propertyId} removed from compare`);
    } else {
      dispatch(addToCompare(propertyId));
      toast.success(`Property with id ${propertyId} added to compare`);
    }
  };

  return (
    <a
      onClick={handleFavoriteClick}
      className={`btn ${isCompared ? "btn-danger" : "btn-outline-danger"}`}
    >
      <span className="flaticon-transfer-1"></span>
    </a>
  );
};

export default CompareButton;
