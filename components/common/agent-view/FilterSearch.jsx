"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import {
  addCategory,
  addCity,
  addListen,
  addName,
} from "../../../features/agent/agentSlice";

const FilterSearch = () => {
  const t = useTranslations("home.agents.sidebar.search");
  const dispatch = useDispatch();
  const { name, category, city } = useSelector((state) => state.agent) || {};

  const [getName, setName] = useState(name || "");
  const [getCategory, setCategory] = useState(category || "");
  const [getCity, setCity] = useState(city || "");

  // Sync state with Redux
  useEffect(() => {
    dispatch(addName(getName));
  }, [dispatch, getName]);

  useEffect(() => {
    dispatch(addCategory(getCategory));
  }, [dispatch, getCategory]);

  useEffect(() => {
    dispatch(addCity(getCity));
  }, [dispatch, getCity]);

  const clearHandler = () => {
    setName("");
    setCategory("");
    setCity("");
    dispatch(addListen(""));
  };

  return (
    <ul className="sasw_list mb0">
      {/* Name Input */}
      <li className="search_area">
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder={t("enter_agent_name")}
            onChange={(e) => setName(e.target.value)}
            value={getName}
          />
        </div>
      </li>

      {/* Category Dropdown */}
      <li>
        <div className="search_option_two mb-3">
          <div className="candidate_revew_select">
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={getCategory}
              className="selectpicker w100 show-tick form-select"
            >
              <option value="">{t("all_categories")}</option>
              <option value="broker">{t("broker")}</option>
              <option value="agent">{t("agent")}</option>
            </select>
          </div>
        </div>
      </li>

      {/* City Dropdown */}
      <li>
        <div className="search_option_two mb-3">
          <div className="candidate_revew_select">
            <select
              onChange={(e) => setCity(e.target.value)}
              value={getCity}
              className="selectpicker w100 show-tick form-select"
            >
              <option value="">{t("all_cities")}</option>
              {[
                "Atlanta",
                "Florida",
                "Los Angeles",
                "Miami",
                "New York",
                "Orlando",
              ].map((city) => (
                <option key={city} value={city.toLowerCase()}>
                  {t(city.toLowerCase())}
                </option>
              ))}
            </select>
          </div>
        </div>
      </li>

      {/* Clear Button */}
      <li>
        <div className="search_option_button">
          <button
            onClick={clearHandler}
            type="button"
            className="btn btn-block btn-thm w-100"
          >
            {t("clear")}
          </button>
        </div>
      </li>
    </ul>
  );
};

export default FilterSearch;
