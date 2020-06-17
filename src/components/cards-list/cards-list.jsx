import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Card from "../card/card.jsx";

class CardsList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeCard: null
    };
  }

  render() {
    const {cards} = this.props;
    return (
      <div className="cities__places-list places__list tabs__content">
        {cards.map((card) => (
          <Card key={card.id}
            card={card}
            onMouseEnter={() => {
              this.setState(() => ({
                activeCard: card,
              }));
            }}
            onTitleClick={() => {}}
          />
        ))}
      </div>
    );
  }
}

CardsList.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CardsList;
