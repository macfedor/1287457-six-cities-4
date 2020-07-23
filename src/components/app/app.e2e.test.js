import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./app.jsx";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import reducer from "../../reducer/reducer";

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

const mockOffers = [
  {
    id: Math.random(),
    image: `img/apartment-01.jpg`,
    isPremium: false,
    price: 100,
    name: `First`,
    type: `apartment`,
    rating: 5,
    images: [`img/room.jpg`, `img/apartment-01.jpg`, `img/apartment-02.jpg`, `img/apartment-03.jpg`, `img/studio-01.jpg`, `img/studio-01.jpg`],
    insideItems: [`Wi-Fi`, `Washing machine`, `Towels`, `Heating`, `Coffee machine`, `Baby seat`, `Kitchen`, `Dishwasher`, `Cabel TV`, `Fridge`],
    bedrooms: 2,
    guests: 3,
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century. An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`,
    host: {
      id: 1,
      name: `Angelina`,
      avatar: `img/avatar-angelina.jpg`,
      isPro: true,
    },
    location: {
      coordinates: [52.3909553943508, 4.929309666406198],
      zoom: 13,
    },
    city: {
      coordinates: [52.3909553943508, 4.929309666406198],
      zoom: 13,
      name: `Paris`,
    }
  },
  {
    id: Math.random(),
    image: `img/apartment-01.jpg`,
    isPremium: false,
    price: 1000,
    name: `Secont`,
    type: `room`,
    rating: 5,
    images: [`img/room.jpg`, `img/apartment-01.jpg`, `img/apartment-02.jpg`],
    insideItems: [`Wi-Fi`, `Washing machine`, `Towels`],
    bedrooms: 3,
    guests: 4,
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    host: {
      name: `Angelina`,
      avatar: `img/avatar-angelina.jpg`,
      isPro: true,
      id: 2,
    },
    location: {
      coordinates: [52.3909553943508, 4.929309666406198],
      zoom: 13,
    },
    city: {
      coordinates: [52.3909553943508, 4.929309666406198],
      zoom: 13,
      name: `Paris`,
    }
  }
];

const initialState = {
  DATA: {
    step: `main`,
    activeCity: mockActiveCity,
    activeOffer: null,
    hoveredOffer: null,
    cities: mockCities,
    places: mockOffers,
    activeSortType: `popular`,
  }
};

const store = createStore(
    reducer,
    initialState,
    applyMiddleware()
);

jest.mock(`../map/map.jsx`, () => `section`);

Enzyme.configure({
  adapter: new Adapter(),
});

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
  const currentCityOffers = mockOffers.filter((item) => item.city === mockActiveCity);
  return currentCityOffers.map((item) => item.name);
}

describe(`Should sort item be clicked`, () => {
  const appWithProvider = mount(
      <Provider store={store}><App places={[{}, {}]}/></Provider>
  );
  
  console.log(appWithProvider.debug())

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
