import * as React from "react";
import Card from "../card/card";
import {Offer} from "../../types";

interface Props {
  cards: Offer[];
  onCardHover: (card: Offer) => void;
  cardsListClassName: string;
  cardType: string;
}

const CardsList: React.FunctionComponent<Props> = (props: Props) => {

  const {cards, onCardHover, cardsListClassName, cardType} = props;
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
};

export default CardsList;
