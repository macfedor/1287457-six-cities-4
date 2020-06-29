import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Card from "../card/card.jsx";
import {PlaceType} from "../../consts.js";

class CardsList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeCard: null
    };
  }

  render() {
    const {cards, onTitleClick, cardsListClassName, cardType} = this.props;
    return (
      <div className={`places__list ${cardsListClassName}`}>
        {cards.map((card) => (
          <Card key={card.id}
            card={card}
            cardType={cardType}
            onMouseEnter={() => {
              this.setState({activeCard: card});
            }}
            onTitleClick={() => onTitleClick(this.state.activeCard)}
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
  })).isRequired,
  onTitleClick: PropTypes.func.isRequired,
  cardsListClassName: PropTypes.string.isRequired,
  cardType: PropTypes.string.isRequired,
};

export default CardsList;
