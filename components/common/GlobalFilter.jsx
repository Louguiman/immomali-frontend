"use client";
import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const GlobalFilter = ({ className = "", type }) => {
  const t = useTranslations("search");

  const router = useRouter();
  const [searchParams, setSearchParams] = useState({
    keyword: "",
    location: "",
    category: "",
    type,
    minPrice: "",
    maxPrice: "",
  });

  const handleInputChange = (e) => {
    setSearchParams((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = () => {
    const queryString = new URLSearchParams(searchParams).toString();
    router.push(`/properties?${queryString}`);
  };

  return (
    <div className={`home1-advnc-search ${className}`}>
      <ul className="h1ads_1st_list mb0">
        <li className="list-inline-item">
          <div className="form-group">
            <input
              type="text"
              name="keyword"
              className="form-control"
              placeholder={t("searchbar.placeholder")}
              onChange={handleInputChange}
            />
          </div>
        </li>

        <li className="list-inline-item">
          <div className="search_option_two">
            <div className="candidate_revew_select">
              <select
                name="category"
                className="selectpicker w100 form-select show-tick"
                onChange={handleInputChange}
              >
                <option value="">{t("searchbar.category")}</option>
                <option value="apartment">{t("categories.apartment")}</option>
                <option value="office">{t("categories.office")}</option>
                <option value="house">{t("categories.house")}</option>
                <option value="villa">{t("categories.villa")}</option>
                <option value="land">{t("categories.land")}</option>
                <option value="other">{t("categories.other")}</option>
              </select>
            </div>
          </div>
        </li>

        <li className="list-inline-item">
          <div className="form-group">
            <input
              type="text"
              name="location"
              className="form-control"
              placeholder={t("searchbar.location")}
              onChange={handleInputChange}
            />
            <label>
              <span className="flaticon-maps-and-flags"></span>
            </label>
          </div>
        </li>

        <li className="list-inline-item">
          <div className="small_dropdown2">
            <div className="btn dd_btn" data-bs-toggle="dropdown">
              <span>{t("searchbar.price")}</span>
              <label>
                <span className="fa fa-angle-down"></span>
              </label>
            </div>
            <div className="dd_content2 dropdown-menu">
              <div className="pricing_acontent">
                <input
                  type="number"
                  name="minPrice"
                  placeholder={t("searchbar.minPrice")}
                  className="form-control mb-2"
                  onChange={handleInputChange}
                />
                <input
                  type="number"
                  name="maxPrice"
                  placeholder={t("searchbar.maxPrice")}
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </li>

        <li className="list-inline-item">
          <div className="search_option_button">
            <button
              onClick={submitHandler}
              type="submit"
              className="btn btn-thm"
            >
              {t("searchbar.button")}
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default GlobalFilter;
