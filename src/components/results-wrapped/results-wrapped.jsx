import React from "react";
import PropTypes from "prop-types";
import CardsList from "../cards-list/cards-list.jsx";
import CitiesList from "../cities-list/cities-list.jsx";
import Map from "../map/map.jsx";
import Sort from "../sort/sort.jsx";
import {PlaceType, CardType} from "../../consts.js";
import withOpenFlag from '../../hocs/with-open-flag/with-open-flag';

const SortWrapped = withOpenFlag(Sort);

const ResultsWrapped = ({places, onTitleClick, cities, activeCity, onCityClick, onCardHover, hoveredOffer}) => {
  const cardsListClassName = `cities__places-list tabs__content`;
  const mapPrefix = `cities`;

  return <main className="page__main page__main--index">
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
          <SortWrapped />
          <CardsList
            cards={places}
            onTitleClick={onTitleClick}
            cardsListClassName={cardsListClassName}
            cardType={CardType.CITY}
            onCardHover={onCardHover}
          />
        </section>
        <div className="cities__right-section">
          <Map
            places={places}
            prefix={mapPrefix}
            activeCity={activeCity}
            activePlace={hoveredOffer}
          />
        </div>
      </div>
    </div>
  </main>;
};

ResultsWrapped.propTypes = {
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
  }).isRequired).isRequired,
  onTitleClick: PropTypes.func.isRequired,
  activeCity: PropTypes.string,
  onCityClick: PropTypes.func.isRequired,
  onCardHover: PropTypes.func.isRequired,
  hoveredOffer: PropTypes.shape({
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
    zoom: PropTypes.number.isRequired,
  }),
};

export default ResultsWrapped;
