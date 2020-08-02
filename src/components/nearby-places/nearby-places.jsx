import React from "react";
import PropTypes from "prop-types";
import CardsList from "../cards-list/cards-list.jsx";
import {CardType, PlaceType, maxNearbyOffers} from "../../consts.js";

const NearbyPlaces = ({places, onCardHover}) => {
  const cardsListClassName = `near-places__list`;
  const offers = places.slice(0, maxNearbyOffers);

  return <section className="near-places places">
    <h2 className="near-places__title">Other places in the neighbourhood</h2>
    <CardsList
      cards={offers}
      cardsListClassName={cardsListClassName}
      cardType={CardType.NEAR}
      onCardHover={onCardHover}
    />
  </section>;
};

NearbyPlaces.propTypes = {
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
};

export default NearbyPlaces;
