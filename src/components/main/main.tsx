import * as React from "react";
import ResultsWrapped from "../results-wrapped/results-wrapped";
import NoResults from "../no-results/no-results";
import {PlaceType} from "../../consts";
import {connect} from "react-redux";
import {getActiveCity, getActiveOffer, getCityOffers, getCities} from "../../reducer/data/selectors";
import Header from "../header/header";
import {Offer} from "../../types";

interface Props {
  cities: string[];
  places: Offer[];
  activeCity: string;
  onCityClick: () => void;
  onCardHover: () => void;
  hoveredOffer: {
    coordinates: number[],
    zoom: number,
  },
  activeOffer: Offer;
}

const Main: React.FunctionComponent<Props> = (props: Props) => {
  const {places, cities, activeCity, onCityClick, onCardHover, activeOffer} = props;
  return <div className="page page--gray page--main">
    <Header />
    {places.length ? <ResultsWrapped
      places={places}
      cities={cities}
      activeCity={activeCity}
      onCityClick={onCityClick}
      onCardHover={onCardHover}
      activeOffer={activeOffer}
    />
      : <NoResults />}
  </div>;
};

const mapStateToProps = (state) => ({
  activeCity: getActiveCity(state),
  cities: getCities(state),
  places: getCityOffers(state),
  activeOffer: getActiveOffer(state),
});

export {Main};
export default connect(mapStateToProps)(Main);
