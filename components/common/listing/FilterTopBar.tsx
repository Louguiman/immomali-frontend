"use client";

import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl"; // Import the useTranslations hook
import {
  addFeatured,
  addStatusType,
} from "../../../features/filter/filterSlice";

const FilterTopBar = () => {
  const { length } = useSelector((state) => state.properties);
  const { statusType, featured } = useSelector((state) => state.filter);
  const [getStatus, setStatus] = useState(statusType);
  const [getFeatured, setFeatured] = useState(featured);

  const dispatch = useDispatch();

  // Translate the strings using useTranslations hook
  const t = useTranslations("common");

  // add status
  useEffect(() => {
    dispatch(addStatusType(getStatus));
  }, [dispatch, getStatus]);

  // add featured
  useEffect(() => {
    dispatch(addFeatured(getFeatured));
  }, [dispatch, getFeatured]);

  // clear filter
  useEffect(() => {
    statusType === "" && setStatus("");
    featured === "" && setFeatured("");
  }, [statusType, setStatus, featured, setFeatured]);

  return (
    <>
      <div className="col-sm-12 col-md-4 col-lg-4 col-xl-5">
        <div className="left_area tac-xsd">
          <p>
            <span className={length === 0 ? "text-danger" : undefined}>
              {length}{" "}
            </span>
            {length !== 0 ? (
              t("searchResults")
            ) : (
              <span className="text-danger">{t("noResults")}</span>
            )}
          </p>
        </div>
      </div>
      {/* End .col */}

      <div className="col-sm-12 col-md-8 col-lg-8 col-xl-7">
        <div className="right_area text-end tac-xsd">
          <ul>
            <li className="list-inline-item">
              <span className="stts">{t("status")}:</span>
              <select
                className="selectpicker show-tick"
                onChange={(e) => setStatus(e.target.value)}
                value={getStatus}
              >
                <option value="">{t("allStatus")}</option>
                <option value="old">{t("old")}</option>
                <option value="recent">{t("recent")}</option>
              </select>
            </li>
            <li className="list-inline-item">
              <span className="shrtby">{t("sortBy")}:</span>
              <select
                className="selectpicker show-tick"
                onChange={(e) => setFeatured(e.target.value)}
                value={getFeatured}
              >
                <option value="">{t("featuredAll")}</option>
                <option value="sale">{t("sale")}</option>
                <option value="rent">{t("rent")}</option>
              </select>
            </li>
          </ul>
        </div>
      </div>
      {/* End .col */}
    </>
  );
};

export default FilterTopBar;
