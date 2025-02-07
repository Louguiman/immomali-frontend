"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const GlobalFilter = ({ className = "" }) => {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState({
    keyword: "",
    location: "",
    propertyType: "",
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
              placeholder="Enter keyword..."
              onChange={handleInputChange}
            />
          </div>
        </li>

        <li className="list-inline-item">
          <div className="search_option_two">
            <div className="candidate_revew_select">
              <select
                name="propertyType"
                className="selectpicker w100 form-select show-tick"
                onChange={handleInputChange}
              >
                <option value="">Property Type</option>
                <option>Apartment</option>
                <option>Bungalow</option>
                <option>Condo</option>
                <option>House</option>
                <option>Land</option>
                <option>Single Family</option>
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
              placeholder="Location"
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
              <span>Price</span>
              <label>
                <span className="fa fa-angle-down"></span>
              </label>
            </div>
            <div className="dd_content2 dropdown-menu">
              <div className="pricing_acontent">
                <input
                  type="number"
                  name="minPrice"
                  placeholder="Min Price"
                  className="form-control mb-2"
                  onChange={handleInputChange}
                />
                <input
                  type="number"
                  name="maxPrice"
                  placeholder="Max Price"
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
              Search
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default GlobalFilter;
