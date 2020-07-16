import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./app.jsx";
import offers from "../../mocks/offers.js";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {reducer} from "../../reducer";

jest.mock(`../map/map.jsx`, () => `section`);

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

const mockActiveCity = mockCities[0];

const initialState = {
  step: `main`,
  activeCity: mockActiveCity,
  activeOffer: null,
  hoveredOffer: null,
  cities: mockCities,
  places: offers,
  activeSortType: `popular`,
  isSortOpen: false
};

const store = createStore(reducer, initialState);

function getSortedDesc(array) {
  return array.slice().sort((a, b) => b - a);
}

function getSortedAsc(array) {
  return array.slice().sort((a, b) => a - b);
}

function getRating(app) {
  const ratingNodes = app.find(`.rating__stars`);
  const rating = [];
  ratingNodes.forEach((ratingItem) => {
    rating.push(
        Number(
            ratingItem
              .find(`span`)
              .first()
              .props()
              .style.width.replace(`%`, ``)
        )
    );
  });

  return rating;
}

function getPrices(app) {
  const priceNodes = app.find(`.place-card__price-value`);
  const prices = [];
  priceNodes.forEach((priceItem) => {
    prices.push(
        Number(
            priceItem
              .props()
              .children[1]
        )
    );
  });

  return prices;
}

function getNames(app) {
  const namesNodes = app.find(`.place-card__name`);
  const names = [];
  namesNodes.forEach((nameItem) => {
    names.push(
        String(
            nameItem
              .find(`a`)
              .props()
              .children
        )
    );
  });

  return names;
}

function getNamesInOffers() {
  const currentCityOffers = offers.filter((item) => item.city === mockActiveCity);
  return currentCityOffers.map((item) => item.name);
}

describe(`Should sort item be clicked`, () => {

  const appWithProvider = mount(
      <Provider store={store}><App /></Provider>
  );

  const sort = appWithProvider.find(`.places__sorting .places__sorting-type`);

  it(`Should sort by rating: top first`, () => {

    const ratingBeforeSorting = getRating(appWithProvider);

    sort.simulate(`click`);

    const topRatedFirst = appWithProvider.find(`.places__options li`).last();
    topRatedFirst.simulate(`click`);

    const ratingAfterSorting = getRating(appWithProvider);

    expect(ratingBeforeSorting).not.toEqual(getSortedDesc(ratingBeforeSorting));
    expect(ratingBeforeSorting).not.toEqual(ratingAfterSorting);
    expect(ratingAfterSorting).toEqual(getSortedDesc(ratingBeforeSorting));

  });

  it(`Should sort by price: high to low`, () => {

    const pricesBeforeSorting = getPrices(appWithProvider);

    sort.simulate(`click`);

    const topPricesFirst = appWithProvider.find(`.places__options li`).at(2);
    topPricesFirst.simulate(`click`);

    const pricesAfterSorting = getPrices(appWithProvider);

    expect(pricesBeforeSorting).not.toEqual(getSortedDesc(pricesBeforeSorting));
    expect(pricesBeforeSorting).not.toEqual(pricesAfterSorting);
    expect(pricesAfterSorting).toEqual(getSortedDesc(pricesBeforeSorting));

  });

  it(`Should sort by price: low to high`, () => {

    const pricesBeforeSorting = getPrices(appWithProvider);

    sort.simulate(`click`);

    const topPricesFirst = appWithProvider.find(`.places__options li`).at(1);
    topPricesFirst.simulate(`click`);

    const pricesAfterSorting = getPrices(appWithProvider);

    expect(pricesBeforeSorting).not.toEqual(getSortedAsc(pricesBeforeSorting));
    expect(pricesBeforeSorting).not.toEqual(pricesAfterSorting);
    expect(pricesAfterSorting).toEqual(getSortedAsc(pricesBeforeSorting));

  });

  it(`Should sort by popular`, () => {

    sort.simulate(`click`);

    const popularFirst = appWithProvider.find(`.places__options li`).at(0);
    popularFirst.simulate(`click`);

    const namesAfterSorting = getNames(appWithProvider);
    const namesDefaultSorting = getNamesInOffers();

    expect(namesAfterSorting).toEqual(namesDefaultSorting);

  });
});
