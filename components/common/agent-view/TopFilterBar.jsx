"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { addListen } from "../../../features/agent/agentSlice";

const TopFilterBar = () => {
  const t = useTranslations("home.agents.topBar");
  const dispatch = useDispatch();
  const { length = 0, listen } = useSelector((state) => state.agent) || {};

  const [getListen, setListen] = useState(listen || "");

  useEffect(() => {
    dispatch(addListen(getListen));
  }, [dispatch, getListen]);

  // Reset state when `listen` changes to empty
  useEffect(() => {
    if (listen === "") {
      setListen("");
    }
  }, [listen]);

  return (
    <div className="grid_list_search_result style2 d-flex align-items-center flex-wrap">
      {/* Left Area: Search Results */}
      <div className="col-sm-12 col-md-4 col-lg-3 col-xl-3">
        <div className="left_area">
          <p>
            <span className={length === 0 ? "text-danger" : undefined}>
              {length}
            </span>{" "}
            {length !== 0 ? (
              t("search_results")
            ) : (
              <span className="text-danger">{t("no_results")}</span>
            )}
          </p>
        </div>
      </div>

      {/* Right Area: Sorting */}
      <div className="col-sm-12 col-md-8 col-lg-9 col-xl-9">
        <div className="right_area style2 text-end">
          <ul>
            <li className="list-inline-item">
              <span className="shrtby">{t("sort_by")}:</span>
              <select
                onChange={(e) => setListen(e.target.value)}
                className="selectpicker show-tick form-select"
                value={getListen}
              >
                <option value="">{t("select_type")}</option>
                {[1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>
                    {t("listings", { count: num })}
                  </option>
                ))}
              </select>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopFilterBar;
