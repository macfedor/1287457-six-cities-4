import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CitiesList from "./cities-list";
import {maxCities} from "../../consts.js";

Enzyme.configure({
  adapter: new Adapter(),
});

const mockCities = [
  `Amsterdam`,
  `Paris`,
  `Cologne`,
  `Brussels`,
  `Hamburg`,
  `Dusseldorf`,
  `Omsk`,
];

it(`Should be max "maxCities" cities`, () => {

  const citiesList = mount(
      <CitiesList
        cities={mockCities}
        activeCity={``}
        onCityClick={() => {}}
      />
  );

  const citiesElements = citiesList.find(`.locations__item`);
  expect(citiesElements.length).toBeLessThanOrEqual(maxCities);
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
        onCityClick={() => {}}
      />
  );

  const activeClassElement = citiesList.find(`.tabs__item--active`);
  const activeClassElementText = activeClassElement.text();
  expect(activeClassElementText).toEqual(activeCity);
  expect(activeClassElement.length).toEqual(1);
});