import React from "react";
import PropTypes from "prop-types";
import {maxCities} from "../../consts.js";


const CitiesList = ({cities, activeCity, onCityClick}) => {
  const formatedCities = cities.slice(0, maxCities);

  return <section className="locations container">
    <ul className="locations__list tabs__list">
      {formatedCities.map((city, i) => (
        <li key={`city` + i} className="locations__item">
          <a onClick={onCityClick} className={`locations__item-link tabs__item ${city === activeCity ? `tabs__item--active` : ``}`} href="#">
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  </section>;
};

CitiesList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  activeCity: PropTypes.string.isRequired,
  onCityClick: PropTypes.func.isRequired,
};

export default CitiesList;
