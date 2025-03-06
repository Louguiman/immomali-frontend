import Link from "next/link";
import { useSelector } from "react-redux";

const CompareFabBtn = () => {
  const compareCount = useSelector(
    (state) => state.property.compareList.length
  );

  return (
    <div className="scrollToHome">
      <Link className="btn btn-primary ms-auto" href="/compare">
        Compare ({compareCount})
      </Link>
    </div>
  );
};

export default CompareFabBtn;
