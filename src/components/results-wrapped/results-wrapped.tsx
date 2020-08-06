import * as React from "react";
import CardsList from "../cards-list/cards-list";
import CitiesList from "../cities-list/cities-list";
import Map from "../map/map";
import Sort from "../sort/sort";
import {CardType} from "../../consts";
import withOpenFlag from '../../hocs/with-open-flag/with-open-flag';
import {Offer} from "../../types";

interface Props {
  cities: string[];
  places: Offer[];
  activeCity: string;
  onCityClick: () => void;
  onCardHover: () => void;
  activeOffer: Offer;
}

const SortWrapped = withOpenFlag(Sort);

const ResultsWrapped: React.FunctionComponent<Props> = (props: Props) => {
  const {places, cities, activeCity, onCityClick, onCardHover, activeOffer} = props;
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
            cardsListClassName={cardsListClassName}
            cardType={CardType.CITY}
            onCardHover={onCardHover}
          />
        </section>
        <div className="cities__right-section">
          <Map
            places={places}
            prefix={mapPrefix}
            activePlace={activeOffer}
          />
        </div>
      </div>
    </div>
  </main>;
};

export default ResultsWrapped;
