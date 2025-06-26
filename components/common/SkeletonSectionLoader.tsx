import React from "react";
import Skeleton from "./Skeleton";

function SkeletonSectionLoader() {
  return (
    <div className="row">
      {Array.from({ length: 6 }).map((_, i) => (
        <div className="col-sm-6 col-lg-4 col-xl-4" key={i}>
          <Skeleton height={241} />
        </div>
      ))}
    </div>
  );
}

export default SkeletonSectionLoader;
