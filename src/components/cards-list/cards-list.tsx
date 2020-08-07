import * as React from "react";
import Card from "../card/card";
import {Offer} from "../../types";

interface Props {
  cards: Offer[];
  onCardHover: (card: Offer) => void;
  cardsListClassName: string;
  cardType: string;
}

class CardsList extends React.PureComponent<Props, Record<string, unknown>> {

  render() {
    const {cards, onCardHover, cardsListClassName, cardType} = this.props;
    return (
      <div className={`places__list ${cardsListClassName}`}>
        {cards.map((card) => (
          <Card key={card.id}
            card={card}
            cardType={cardType}
            onMouseEnter={() => onCardHover(card)}
            onMouseLeave={() => onCardHover(null)}
          />
        ))}
      </div>
    );
  }
}

export default CardsList;
