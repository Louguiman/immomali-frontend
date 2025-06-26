import Link from "next/link";
import { useSelector } from "react-redux";

import React from "react";
const CompareFabBtn: React.FC = () => {
  const compareCount: number = useSelector(
    (state: any) => state.properties.compareList.length
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
