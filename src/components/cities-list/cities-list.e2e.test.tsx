import * as React from "react";
import {mount, configure} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import CitiesList from "./cities-list";
import {MAX_CITIES} from "../../consts";
import {noop} from "../../utils/common";

configure({
  adapter: new Adapter(),
});

const mockCities: string[] = [
  `Amsterdam`,
  `Paris`,
  `Cologne`,
  `Brussels`,
  `Hamburg`,
  `Dusseldorf`,
  `Omsk`,
];

it(`Should be max "MAX_CITIES" cities`, () => {

  const citiesList = mount(
      <CitiesList
        cities={mockCities}
        activeCity={``}
        onCityClick={noop}
      />
  );

  const citiesElements = citiesList.find(`.locations__item`);
  expect(citiesElements.length).toBeLessThanOrEqual(MAX_CITIES);
});

it(`Should be unique cities`, () => {

  let uniqueCities = true;
  const citiesObj = {};
  for (let i = 0; i < mockCities.length; i++) {
    if (!citiesObj[mockCities[i]]) {
      citiesObj[mockCities[i]] = true;
    } else {
      uniqueCities = false;
      break;
    }
  }

  expect(uniqueCities).toBeTruthy();
});

it(`Should active city has special class`, () => {
  const activeCity = `Paris`;
  const citiesList = mount(
      <CitiesList
        cities={mockCities}
        activeCity={activeCity}
        onCityClick={noop}
      />
  );

  const activeClassElement = citiesList.find(`.tabs__item--active`);
  const activeClassElementText = activeClassElement.text();
  expect(activeClassElementText).toEqual(activeCity);
  expect(activeClassElement.length).toEqual(1);
});
