import React from "react";
import PropTypes from "prop-types";
import ResultsWrapped from "../results-wrapped/results-wrapped.jsx";
import NoResults from "../no-results/no-results.jsx";
import {PlaceType} from "../../consts.js";

const Main = ({places, onTitleClick, cities, activeCity, onCityClick, onCardHover, hoveredOffer}) => {

  return <div className="page page--gray page--main">
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <a className="header__nav-link header__nav-link--profile" href="#">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
    {places.length ? <ResultsWrapped
      places={places}
      onTitleClick={onTitleClick}
      cities={cities}
      activeCity={activeCity}
      onCityClick={onCityClick}
      onCardHover={onCardHover}
      hoveredOffer={hoveredOffer}
    />
      : <NoResults />}
  </div>;
};

Main.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string.isRequired),
  places: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf([PlaceType.APARTMENT, PlaceType.ROOM, PlaceType.HOUSE, PlaceType.HOTEL]).isRequired,
    rating: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    insideItems: PropTypes.arrayOf(PropTypes.string).isRequired,
    bedrooms: PropTypes.number.isRequired,
    guests: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    host: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      pro: PropTypes.bool.isRequired,
    }).isRequired,
    location: PropTypes.arrayOf(PropTypes.number).isRequired,
    reviews: PropTypes.arrayOf(PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
      comment: PropTypes.string.isRequired,
    }).isRequired).isRequired,
    city: PropTypes.string.isRequired,
  }).isRequired),
  onTitleClick: PropTypes.func.isRequired,
  activeCity: PropTypes.string,
  onCityClick: PropTypes.func.isRequired,
  onCardHover: PropTypes.func.isRequired,
  hoveredOffer: PropTypes.arrayOf(PropTypes.number),
};

export default Main;
