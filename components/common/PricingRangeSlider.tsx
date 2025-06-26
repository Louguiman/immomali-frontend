"use client";

import { useEffect } from "react";
import { useState } from "react";
import InputRange from "react-input-range";
import { useDispatch } from "react-redux";
import { addPrice } from "../../features/properties/propertiesSlice";
import { useFormatter } from "next-intl";

const RangeSlider = () => {
  const format = useFormatter();
  const [price, setPrice] = useState({
    value: { min: 10000, max: 1000000000 },
  });
  const dispatch = useDispatch();

  const handleOnChange = (value) => {
    setPrice({ value });
  };

  // price add to state
  useEffect(() => {
    dispatch(
      addPrice({
        min: price.value.min,
        max: price.value.max,
      })
    );
  }, [dispatch, price]);

  return (
    <div className="nft__filter-price tp-range-slider tp-range-slider-dark mb-20">
      <div className="nft__filter-price-inner d-flex align-items-center justify-content-between">
        <div className="nft__filter-price-box">
          <div className="d-flex align-items-center">
            <span>
              {format.number(price.value.min, {
                style: "currency",
                currency: "XOF",
              })}
            </span>
          </div>
        </div>
        <div className="nft__filter-price-box">
          <div className="d-flex align-items-center">
            <span>
              {format.number(price.value.max, {
                style: "currency",
                currency: "XOF",
              })}
            </span>
          </div>
        </div>
      </div>

      <InputRange
        formatLabel={(value) => ``}
        maxValue={1000000000}
        minValue={10000}
        value={price.value}
        onChange={(value) => handleOnChange(value)}
      />

      <div className="slider-styled inside-slider" id="nft-slider"></div>
    </div>
  );
};

export default RangeSlider;
