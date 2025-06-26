import React from "react";
const GlobalSelectBox: React.FC = () => {
  return (
    <>
      <li className="list-inline-item">
        <div className="candidate_revew_select">
          <label htmlFor="bathrooms" className="visually-hidden">
            Bathrooms
          </label>
          <select id="bathrooms" className="selectpicker w100 show-tick form-select" title="Bathrooms">
            <option>Bathrooms</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
          </select>
        </div>
      </li>
      {/* End li */}

      <li className="list-inline-item">
        <div className="candidate_revew_select">
          <label htmlFor="bedrooms" className="visually-hidden">
            Bedrooms
          </label>
          <select id="bedrooms" className="selectpicker w100 show-tick form-select" title="Bedrooms">
            <option>Bedrooms</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
          </select>
        </div>
      </li>
      {/* End li */}

      <li className="list-inline-item">
        <div className="candidate_revew_select">
          <label htmlFor="yearBuilt" className="visually-hidden">
            Year built
          </label>
          <select id="yearBuilt" className="selectpicker w100 show-tick form-select" title="Year built">
            <option>Year built</option>
            <option>2013</option>
            <option>2014</option>
            <option>2015</option>
            <option>2016</option>
            <option>2017</option>
            <option>2018</option>
            <option>2019</option>
            <option>2020</option>
          </select>
        </div>
      </li>
      {/* End li */}

      <li className="list-inline-item">
        <div className="candidate_revew_select">
          <label htmlFor="builtUpArea" className="visually-hidden">
            Built-up Area
          </label>
          <select id="builtUpArea" className="selectpicker w100 show-tick form-select" title="Built-up Area">
            <option>Built-up Area</option>
            <option>Adana</option>
            <option>Ankara</option>
            <option>Antalya</option>
            <option>Bursa</option>
            <option>Bodrum</option>
            <option>Gaziantep</option>
            <option>İstanbul</option>
            <option>İzmir</option>
            <option>Konya</option>
          </select>
        </div>
      </li>
    </>
  );
};

export default GlobalSelectBox;
