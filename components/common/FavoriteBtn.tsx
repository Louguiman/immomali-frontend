import {
  addToFavorites,
  removeFromFavorites,
} from "@/features/properties/propertiesSlice";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

type FavoriteButtonProps = {
  propertyId: string | number;
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ propertyId }) => {
  const dispatch = useDispatch();
  const favorites: (string | number)[] = useAppSelector(
    (state: RootState) => state.properties?.favorites ?? []
  );

  const isFavorited = favorites.includes(propertyId);

  const handleFavoriteClick = () => {
    if (isFavorited) {
      dispatch(removeFromFavorites(propertyId));
      toast.success(`Property with id ${propertyId} removed from favorites`);
    } else {
      dispatch(addToFavorites(propertyId));
      toast.success(`Property with id ${propertyId} added to favorites`);
    }
  };

  return (
    <a
      onClick={handleFavoriteClick}
      className={`btn ${isFavorited ? "btn-danger" : "btn-outline-danger"}`}
    >
      <span className="flaticon-heart"></span>
    </a>
  );
};

export default FavoriteButton;
