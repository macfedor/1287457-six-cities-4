import * as React from "react";
import {sortOffersByCity} from "../../utils/common";
import Card from "../card/card";
import {CardType} from "../../consts";
import {Offer} from "../../types";

interface Props {
  offers: Offer[];
}

const FavoritesList: React.FunctionComponent<Props> = (props: Props) => {
  const {offers} = props;
  const citiesOffers = sortOffersByCity(offers);

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {Object.entries(citiesOffers).map(([cityName, cityOffers], index) => (
              <li className="favorites__locations-items" key={index}>
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>{cityName}</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  {cityOffers.map((offer) => (
                    <Card key={offer.id}
                      card={offer}
                      cardType={CardType.FAVORITE}
                    />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
};

export default FavoritesList;
