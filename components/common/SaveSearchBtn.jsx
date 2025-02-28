import { useDispatch } from "react-redux";
import { saveSearch } from "@/features/property/propertySlice";

const SaveSearchButton = ({ filters }) => {
  const dispatch = useDispatch();

  const handleSaveSearch = () => {
    dispatch(saveSearch({ id: Date.now(), filters }));
  };

  return <button onClick={handleSaveSearch}>Save Search</button>;
};
