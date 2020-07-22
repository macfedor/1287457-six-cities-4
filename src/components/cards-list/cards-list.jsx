import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Card from "../card/card.jsx";
import {PlaceType} from "../../consts.js";

class CardsList extends PureComponent {

  render() {
    const {cards, onTitleClick, onCardHover, cardsListClassName, cardType} = this.props;
    return (
      <div className={`places__list ${cardsListClassName}`}>
        {cards.map((card) => (
          <Card key={card.id}
            card={card}
            cardType={cardType}
            onMouseEnter={() => onCardHover({coordinates: card.location.coordinates, zoom: card.location.zoom})}
            onMouseLeave={() => onCardHover(null)}
            onTitleClick={() => onTitleClick(card)}
          />
        ))}
      </div>
    );
  }
}

CardsList.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,
  onTitleClick: PropTypes.func.isRequired,
  onCardHover: PropTypes.func,
  cardsListClassName: PropTypes.string.isRequired,
  cardType: PropTypes.string.isRequired,
};

export default CardsList;
