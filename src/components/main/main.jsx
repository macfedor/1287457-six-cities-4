import React from "react";
import PropTypes from "prop-types";
import ResultsWrapped from "../results-wrapped/results-wrapped.jsx";
import NoResults from "../no-results/no-results.jsx";
import {PlaceType} from "../../consts.js";
import {connect} from "react-redux";
import {getActiveCity, getHoveredOffer, getCityOffers, getCities} from "../../reducer/data/selectors.js";
import Header from "../header/header.jsx";

const Main = ({places, onTitleClick, cities, activeCity, onCityClick, onCardHover, hoveredOffer}) => {
  return <div className="page page--gray page--main">
    <Header />
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

const mapStateToProps = (state) => ({
  activeCity: getActiveCity(state),
  cities: getCities(state),
  places: getCityOffers(state),
  hoveredOffer: getHoveredOffer(state),
});

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
      isPro: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
    reviews: PropTypes.array,
    city: PropTypes.shape({
      name: PropTypes.string.isRequired,
      coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired),
  onTitleClick: PropTypes.func.isRequired,
  activeCity: PropTypes.string,
  onCityClick: PropTypes.func.isRequired,
  onCardHover: PropTypes.func.isRequired,
  hoveredOffer: PropTypes.shape({
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
    zoom: PropTypes.number.isRequired,
  }),
};

export {Main};
export default connect(mapStateToProps)(Main);
