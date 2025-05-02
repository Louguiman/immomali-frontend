"use client";
import React from "react";
import Skeleton from "@/components/common/Skeleton";
import { useGetTopCitiesQuery } from "@/features/api/properties.api";
import FindProperties from "./FindProperties";
import SkeletonSectionLoader from "../common/SkeletonSectionLoader";

const CitiesSection = () => {
  const { data, isLoading, isError } = useGetTopCitiesQuery();

  if (isLoading) {
    return <SkeletonSectionLoader />;
  }

  if (isError || !data) {
    return <p>Unable to load top cities at the moment.</p>;
  }

  return (
    <div className="row">
      <FindProperties data={data} />
    </div>
  );
};

export default CitiesSection;
