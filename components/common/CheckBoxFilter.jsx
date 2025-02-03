"use client";

import { toggleAmenity } from "@/features/properties/propertiesSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const CheckBoxFilter = () => {
  const dispatch = useDispatch();
  const amenities = useSelector(
    (state) => state.properties.createListing.amenities
  );

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    dispatch(toggleAmenity({ amenity: id, value: checked }));
  };

  return (
    <>
      <div className="col-xxs-6 col-sm col-lg col-xl">
        <ul className="ui_kit_checkbox selectable-list">
          <li>
            <div className="form-check custom-checkbox">
              <input
                type="checkbox"
                className="form-check-input"
                id="airConditioning"
                checked={amenities.airConditioning}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="customCheck1">
                Air Conditioning
              </label>
            </div>
          </li>
          {/* End li */}

          <li>
            <div className="form-check custom-checkbox">
              <input
                type="checkbox"
                className="form-check-input"
                id="lawn"
                checked={amenities.lawn}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="customCheck2">
                Lawn
              </label>
            </div>
          </li>
          {/* End li */}

          <li>
            <div className="form-check custom-checkbox">
              <input
                type="checkbox"
                className="form-check-input"
                id="swimmingPool"
                checked={amenities.swimmingPool}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="customCheck3">
                Swimming Pool
              </label>
            </div>
          </li>
          {/* End li */}
        </ul>
      </div>
      {/* End .col */}

      <div className="col-xs-6 col-sm col-lg col-xl">
        <ul className="ui_kit_checkbox selectable-list">
          <li>
            <div className="form-check custom-checkbox">
              <input
                type="checkbox"
                className="form-check-input"
                id="barbeque"
                checked={amenities.barbeque}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="customCheck4">
                Barbeque
              </label>
            </div>
          </li>
          {/* End li */}

          <li>
            <div className="form-check custom-checkbox">
              <input
                type="checkbox"
                className="form-check-input"
                id="microwave"
                checked={amenities.microwave}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="customCheck5">
                Microwave
              </label>
            </div>
          </li>
          {/* End li */}

          <li>
            <div className="form-check custom-checkbox">
              <input
                type="checkbox"
                className="form-check-input"
                id="tvCable"
                checked={amenities.tvCable}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="customCheck6">
                TV Cable
              </label>
            </div>
          </li>
          {/* End li */}
        </ul>
      </div>
      {/* End .col */}

      <div className="col-xs-6 col-sm col-lg col-xl">
        <ul className="ui_kit_checkbox selectable-list">
          <li>
            <div className="form-check custom-checkbox">
              <input
                type="checkbox"
                className="form-check-input"
                id="dryer"
                checked={amenities.dryer}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="customCheck7">
                Dryer
              </label>
            </div>
          </li>
          {/* End li */}

          <li>
            <div className="form-check custom-checkbox">
              <input
                type="checkbox"
                className="form-check-input"
                id="outdoorShower"
                checked={amenities.outdoorShower}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="customCheck8">
                Outdoor Shower
              </label>
            </div>
          </li>
          {/* End li */}

          <li>
            <div className="form-check custom-checkbox">
              <input
                type="checkbox"
                className="form-check-input"
                id="washer"
                checked={amenities.washer}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="customCheck9">
                Washer
              </label>
            </div>
          </li>
          {/* End li */}
        </ul>
      </div>
      {/* End .col */}

      <div className="col-xxs-6 col-sm col-lg col-xl">
        <ul className="ui_kit_checkbox selectable-list">
          <li>
            <div className="form-check custom-checkbox">
              <input
                type="checkbox"
                className="form-check-input"
                id="gym"
                checked={amenities.gym}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="customCheck10">
                Gym
              </label>
            </div>
          </li>
          {/* End li */}

          <li>
            <div className="form-check custom-checkbox">
              <input
                type="checkbox"
                className="form-check-input"
                id="refrigerator"
                checked={amenities.refrigerator}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="customCheck11">
                Refrigerator
              </label>
            </div>
          </li>
          {/* End li */}

          <li>
            <div className="form-check custom-checkbox">
              <input
                type="checkbox"
                className="form-check-input"
                id="wifi"
                checked={amenities.wifi}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="customCheck12">
                WiFi
              </label>
            </div>
          </li>
          {/* End li */}
        </ul>
      </div>
      {/* End .col */}

      <div className="col-xxs-6 col-sm col-lg col-xl">
        <ul className="ui_kit_checkbox selectable-list">
          <li>
            <div className="form-check custom-checkbox">
              <input
                type="checkbox"
                className="form-check-input"
                id="laundry"
                checked={amenities.laundry}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="customCheck13">
                Laundry
              </label>
            </div>
          </li>
          {/* End li */}

          <li>
            <div className="form-check custom-checkbox">
              <input
                type="checkbox"
                className="form-check-input"
                id="sauna"
                checked={amenities.sauna}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="customCheck14">
                Sauna
              </label>
            </div>
          </li>
          {/* End li */}

          <li>
            <div className="form-check custom-checkbox">
              <input
                type="checkbox"
                className="form-check-input"
                id="windowCoverings"
                checked={amenities.windowCoverings}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="customCheck15">
                Window Coverings
              </label>
            </div>
          </li>
          {/* End li */}
        </ul>
      </div>
      {/* End .col */}
    </>
  );
};

export default CheckBoxFilter;
