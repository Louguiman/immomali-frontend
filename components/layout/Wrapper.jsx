"use client";
import { useAppSelector } from "@/store/hooks";
import CompareFabBtn from "../common/CompareFabBtn";

const Wrapper = ({ children }) => {
  const compareList = useAppSelector((state) => state.properties.compareList);

  return (
    <>
      {children}
      {compareList.length > 0 && <CompareFabBtn />}
    </>
  );
};

export default Wrapper;
