import Link from "next/link";
import { useAppSelector } from "@/store/store";

import React from "react";
const CompareFabBtn: React.FC = () => {
  const compareCount: number = useAppSelector(
    (state) => state.properties.compareList.length
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
