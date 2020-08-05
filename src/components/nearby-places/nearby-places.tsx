import * as React from "react";
import Card from "../card/card";
import {CardType, PlaceType, MAX_NEARBY_OFFERS} from "../../consts";
import {Offer} from "../../types";

interface Props {
  places: Offer[];
}

const NearbyPlaces: React.FunctionComponent<Props> = (props: Props) => {
  const {places} = props;
  const offers = places.slice(0, MAX_NEARBY_OFFERS);

  return <section className="near-places places">
    <h2 className="near-places__title">Other places in the neighbourhood</h2>
    <div className="places__list near-places__list">
      {offers.map((card) => (
        <Card key={card.id}
          card={card}
          cardType={CardType.NEAR}
        />
      ))}
    </div>
  </section>;
};

export default NearbyPlaces;
