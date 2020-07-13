import React from "react";
import PropTypes from "prop-types";
import CardsList from "../cards-list/cards-list.jsx";
import CitiesList from "../cities-list/cities-list.jsx";
import Map from "../map/map.jsx";
import Sort from "../sort/sort.jsx";
import {PlaceType, CardType} from "../../consts.js";

const Main = ({places, onTitleClick, cities, activeCity, onCityClick}) => {

  const cardsListClassName = `cities__places-list tabs__content`;
  const mapPrefix = `cities`;

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
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <CitiesList
          cities={cities}
          activeCity={activeCity}
          onCityClick={onCityClick}
        />
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{places.length} places to stay in {activeCity}</b>
            <Sort />
            <CardsList
              cards={places}
              onTitleClick={onTitleClick}
              cardsListClassName={cardsListClassName}
              cardType={CardType.CITY}
            />
          </section>
          <div className="cities__right-section">
            <Map
              places={places}
              prefix={mapPrefix}
              activeCity={activeCity}
            />
          </div>
        </div>
      </div>
    </main>
  </div>;
};

Main.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
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
  }).isRequired).isRequired,
  onTitleClick: PropTypes.func.isRequired,
  activeCity: PropTypes.string,
  onCityClick: PropTypes.func.isRequired,
};

export default Main;
