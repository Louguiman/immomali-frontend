"use client";

import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import {
  addFeatured,
  addStatusType,
} from "../../../features/filter/filterSlice";
import {
  addAmenities,
  addAreaMax,
  addAreaMin,
  addBathrooms,
  addBedrooms,
  addGarages,
  addKeyword,
  addLocation,
  addPrice,
  addType,
  addStatus,
  addYearBuilt,
  resetAmenities,
} from "../../../features/properties/propertiesSlice";
import PricingRangeSlider from "../../common/PricingRangeSlider";
import { v4 as uuidv4 } from "uuid";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { addCategory } from "@/features/agent/agentSlice";
import { useTranslations } from "next-intl";

const FilteringItem = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("property"); // Get the translation function

  const {
    keyword,
    location,
    status,
    type,
    bathrooms,
    bedrooms,
    garages,
    yearBuilt,
    area,
    amenities,
    price,
  } = useSelector((state: import("@/store/store").RootState) => state.properties);

  // input state
  const [getKeyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [getLocation, setLocation] = useState(
    searchParams.get("location") || ""
  );
  const [getMinPrice, setMinPrice] = useState(
    searchParams.get("minPrice") || price.min || ""
  );
  const [getMaxPrice, setMaxPrice] = useState(
    searchParams.get("maxPrice") || price.max || ""
  );
  const [getStatus, setStatus] = useState(status || "");
  const [getType, setType] = useState(searchParams.get("type") || "");
  const [getCategory, setCategory] = useState(
    searchParams.get("category") || ""
  );
  const [getBathroom, setBathroom] = useState(bathrooms || "");
  const [getBedroom, setBedroom] = useState(bedrooms || "");
  const [getGarages, setGarages] = useState(garages || "");
  const [getBuiltYear, setBuiltYear] = useState(yearBuilt || "");
  const [getAreaMin, setAreaMin] = useState(area.min || "");
  const [getAreaMax, setAreaMax] = useState(area.max || "");

  // advanced state
  const [getAdvanced, setAdvanced] = useState([
    { id: uuidv4(), name: t("amenities.airConditioning") },
    { id: uuidv4(), name: t("amenities.barbeque") },
    { id: uuidv4(), name: t("amenities.gym") },
    { id: uuidv4(), name: t("amenities.microwave") },
    { id: uuidv4(), name: t("amenities.tvCable") },
    { id: uuidv4(), name: t("amenities.lawn") },
    { id: uuidv4(), name: t("amenities.refrigerator") },
    { id: uuidv4(), name: t("amenities.swimmingPool") },
    { id: uuidv4(), name: t("amenities.wifi") },
    { id: uuidv4(), name: t("amenities.sauna") },
    { id: uuidv4(), name: t("amenities.dryer") },
    { id: uuidv4(), name: t("amenities.washer") },
    { id: uuidv4(), name: t("amenities.laundry") },
    { id: uuidv4(), name: t("amenities.outdoorShower") },
    { id: uuidv4(), name: t("amenities.windowCoverings") },
  ]);

  const dispatch = useDispatch();

  // keyword
  useEffect(() => {
    dispatch(addKeyword(getKeyword));
  }, [dispatch, getKeyword]);

  // location
  useEffect(() => {
    dispatch(addLocation(getLocation));
  }, [dispatch, getLocation]);

  // status
  useEffect(() => {
    dispatch(addStatus(getStatus));
  }, [dispatch, getStatus]);

  // properties type
  useEffect(() => {
    dispatch(addType(getType));
  }, [dispatch, getType]);

  // properties type
  useEffect(() => {
    dispatch(addCategory(getCategory));
  }, [dispatch, getCategory]);

  // bathroom
  useEffect(() => {
    dispatch(addBathrooms(getBathroom));
  }, [dispatch, getBathroom]);

  // bedroom
  useEffect(() => {
    dispatch(addBedrooms(getBedroom));
  }, [dispatch, getBedroom]);

  // garages
  useEffect(() => {
    dispatch(addGarages(getGarages));
  }, [dispatch, getGarages]);

  useEffect(() => {
    dispatch(
      addPrice({
        min: getMinPrice,
        max: getMaxPrice,
      })
    );
  }, [dispatch, getMinPrice, getMaxPrice]);
  // built years
  useEffect(() => {
    dispatch(addYearBuilt(getBuiltYear));
  }, [dispatch, getBuiltYear]);

  // area min
  useEffect(() => {
    dispatch(dispatch(addAreaMin(getAreaMin)));
  }, [dispatch, getAreaMin]);

  // area max
  useEffect(() => {
    dispatch(dispatch(addAreaMax(getAreaMax)));
  }, [dispatch, getAreaMax]);

  // clear filter
  const clearHandler = () => {
    clearAllFilters();
  };

  const clearAllFilters = () => {
    setKeyword("");
    setLocation("");
    setMinPrice("");
    setMaxPrice("");
    setStatus("");
    setType("");
    setCategory("");
    dispatch(addPrice({ min: 10000, max: 20000 }));
    setBathroom("");
    setBedroom("");
    setBedroom("");
    setGarages("");
    setBuiltYear("");
    setAreaMin("");
    setAreaMax("");
    dispatch(resetAmenities());
    dispatch(addStatusType(""));
    dispatch(addFeatured(""));
    clearAdvanced();
  };

  // clear advanced
  const clearAdvanced = () => {
    const changed = getAdvanced.map((item) => {
      item.isChecked = false;
      return item;
    });
    setAdvanced(changed);
  };

  // add advanced
  const advancedHandler = (id) => {
    const data = getAdvanced.map((feature) => {
      if (feature.id === id) {
        if (feature.isChecked) {
          feature.isChecked = false;
        } else {
          feature.isChecked = true;
        }
      }
      return feature;
    });

    setAdvanced(data);
  };

  const handleSearch = useDebouncedCallback(() => {
    const params = new URLSearchParams();

    if (getKeyword) params.set("keyword", getKeyword);
    if (getLocation) params.set("location", getLocation);
    if (getStatus) params.set("status", getStatus);
    if (getType) params.set("type", getType);
    if (getCategory) params.set("category", getCategory);
    if (getBathroom) params.set("bathrooms", getBathroom);
    if (getBedroom) params.set("bedrooms", getBedroom);
    if (getGarages) params.set("garages", getGarages);
    if (getBuiltYear) params.set("yearBuilt", getBuiltYear);
    if (getAreaMin) params.set("minArea", getAreaMin);
    if (getAreaMax) params.set("maxArea", getAreaMax);
    if (getMinPrice) params.set("minPrice", getMinPrice);
    if (getMaxPrice) params.set("maxPrice", getMaxPrice);

    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  // Effect: Update URL when Redux state changes
  useEffect(() => {
    handleSearch();
  }, [
    getKeyword,
    getLocation,
    getStatus,
    getType,
    getBathroom,
    getBedroom,
    getGarages,
    getBuiltYear,
    getAreaMin,
    getAreaMax,
    getCategory,
    getMinPrice,
    getMaxPrice,
    price,
    router,
  ]);

  return (
    <ul className="sasw_list mb0">
      {/* Search by Keyword */}
      <li className="search_area">
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder={t("keyword")}
            value={getKeyword}
            onSubmit={handleSearch}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <label onMouseDown={handleSearch}>
            <span className="flaticon-magnifying-glass"></span>
          </label>
        </div>
      </li>

      {/* Search by Location */}
      <li className="search_area">
        <div className="form-group mb-3">
          <input
            type="search"
            className="form-control"
            id="location"
            placeholder={t("location")}
            value={getLocation}
            onChange={(e) => setLocation(e.target.value)}
          />
          <label htmlFor="location">
            <span className="flaticon-maps-and-flags"></span>
          </label>
        </div>
      </li>

      {/* Category Filter */}
      <li>
        <div className="search_option_two">
          <div className="candidate_revew_select">
            <select
              onChange={(e) => setType(e.target.value)}
              className="selectpicker w100 show-tick form-select"
              value={getType}
            >
              <option value="">{t("Type")}</option>
              <option value="rent">{t("rent")}</option>
              <option value="sale">{t("sale")}</option>
            </select>
          </div>
        </div>
      </li>

      {/* Type Filter */}
      <li>
        <div className="search_option_two">
          <div className="candidate_revew_select">
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="selectpicker w100 show-tick form-select"
              value={getCategory}
            >
              <option value="">{t("category")}</option>
              <option value="apartment">{t("categories.apartment")}</option>
              <option value="house">{t("categories.house")}</option>
              <option value="office">{t("categories.office")}</option>
              <option value="villa">{t("categories.villa")}</option>
              <option value="land">{t("categories.land")}</option>
              <option value="other">{t("categories.other")}</option>
            </select>
          </div>
        </div>
      </li>

      {/* Price Range Filter */}
      <li>
        <div className="small_dropdown2">
          <div
            id="prncgs2"
            className="btn dd_btn"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
            aria-expanded="false"
            role="button"
          >
            <span>{t("priceRange")}</span>
            <label htmlFor="prncgs2">
              <span className="fa fa-angle-down"></span>
            </label>
          </div>
          <div className="dd_content2 style2 dropdown-menu">
            <div className="pricing_acontent ">
              <PricingRangeSlider />
            </div>
          </div>
        </div>
      </li>

      {/* Bathroom Filter */}
      <li>
        <div className="search_option_two">
          <div className="candidate_revew_select">
            <select
              onChange={(e) => setBathroom(e.target.value)}
              className="selectpicker w100 show-tick form-select"
              value={getBathroom}
            >
              <option value="">{t("bathrooms")}</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
        </div>
      </li>

      {/* Bedroom Filter */}
      <li>
        <div className="search_option_two">
          <div className="candidate_revew_select">
            <select
              onChange={(e) => setBedroom(e.target.value)}
              className="selectpicker w100 show-tick form-select"
              value={getBedroom}
            >
              <option value="">{t("bedrooms")}</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
        </div>
      </li>

      {/* Garages Filter */}
      <li>
        <div className="search_option_two">
          <div className="candidate_revew_select">
            <select
              onChange={(e) => setGarages(e.target.value)}
              className="selectpicker w100 show-tick form-select"
              value={getGarages}
            >
              <option value="">{t("garages")}</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="more">{t("more")}</option>
            </select>
          </div>
        </div>
      </li>

      {/* Year Built Filter */}
      <li>
        <div className="search_option_two">
          <div className="candidate_revew_select">
            <select
              onChange={(e) => setBuiltYear(e.target.value)}
              className="selectpicker w100 show-tick form-select"
              value={getBuiltYear}
            >
              <option value="">{t("year_built")}</option>
              <option value="2013">2013</option>
              <option value="2014">2014</option>
              <option value="2015">2015</option>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
            </select>
          </div>
        </div>
      </li>

      {/* Area Min and Max */}
      <li className="min_area list-inline-item">
        <div className="form-group mb-4">
          <input
            type="number"
            className="form-control"
            placeholder={t("minArea")}
            value={getAreaMin}
            onChange={(e) => setAreaMin(e.target.value)}
          />
        </div>
      </li>

      <li className="max_area list-inline-item">
        <div className="form-group mb-4">
          <input
            type="number"
            className="form-control"
            placeholder={t("maxArea")}
            value={getAreaMax}
            onChange={(e) => setAreaMax(e.target.value)}
          />
        </div>
      </li>

      {/* Advanced Features */}
      <li>
        <div id="accordion" className="panel-group">
          <div className="panel">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a
                  href="#panelBodyRating"
                  className="accordion-toggle link"
                  data-bs-toggle="collapse"
                  data-bs-parent="#accordion"
                >
                  <i className="flaticon-more"></i> {t("advancedFeatures")}
                </a>
              </h4>
            </div>
            <div id="panelBodyRating" className="panel-collapse collapse">
              <div className="panel-body row">
                <div className="col-lg-12">
                  <ul className="ui_kit_checkbox selectable-list fn-400">
                    {getAdvanced?.map((feature) => (
                      <li key={feature.id}>
                        <div className="form-check custom-checkbox">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={feature.id}
                            value={feature.name}
                            checked={feature.isChecked || false}
                            onChange={(e) =>
                              dispatch(addAmenities(e.target.value))
                            }
                            onClick={() => advancedHandler(feature.id)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={feature.id}
                          >
                            {feature.name}
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>

      {/* Clear Filters Button */}
      <li>
        <div className="search_option_button">
          <button
            onClick={clearHandler}
            type="button"
            className="btn btn-block btn-thm w-100"
          >
            {t("clearFilters")}
          </button>
        </div>
      </li>
    </ul>
  );
};

export default FilteringItem;
