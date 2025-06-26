"use client";
import { useAppSelector } from "@/store/store";
import CompareFabBtn from "../common/CompareFabBtn";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  const compareList = useAppSelector(
    (state) => state.properties?.compareList ?? []
  );

  return (
    <>
      {children}
      {compareList.length > 0 && <CompareFabBtn />}
    </>
  );
};

export default Wrapper;
