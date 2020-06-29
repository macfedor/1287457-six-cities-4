import React from "react";
import PropTypes from "prop-types";
import CardsList from "../cards-list/cards-list.jsx";
import {CardType, PlaceType, maxNearbyOffers} from "../../consts.js";

const NearbyPlaces = ({places, onTitleClick}) => {
  const cardsListClassName = `near-places__list`;
  const offers = places.slice(0, maxNearbyOffers);

  return <section className="near-places places">
    <h2 className="near-places__title">Other places in the neighbourhood</h2>
    <CardsList
      cards={offers}
      onTitleClick={onTitleClick}
      cardsListClassName={cardsListClassName}
      cardType={CardType.NEAR}
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
  }).isRequired).isRequired,
  onTitleClick: PropTypes.func.isRequired,
};

export default NearbyPlaces;
