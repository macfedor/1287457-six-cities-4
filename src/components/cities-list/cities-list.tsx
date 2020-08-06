import * as React from "react";
import {MAX_CITIES} from "../../consts";

interface Props {
  cities: string[];
  activeCity: string;
  onCityClick: () => void;
}

const CitiesList: React.FunctionComponent<Props> = (props: Props) => {
  const {cities, activeCity, onCityClick} = props;
  const formatedCities = cities.slice(0, MAX_CITIES);

  return <section className="locations container">
    <ul className="locations__list tabs__list">
      {formatedCities.map((city, i) => (
        <li key={`city` + i} className="locations__item">
          <a onClick={onCityClick} className={`locations__item-link tabs__item ${city === activeCity ? `tabs__item--active` : ``}`} href="#">
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  </section>;
};

export default CitiesList;
