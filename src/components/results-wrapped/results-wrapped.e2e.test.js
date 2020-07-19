import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "../main/main.jsx";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {reducer} from "../../reducer";

Enzyme.configure({
  adapter: new Adapter(),
});

jest.mock(`../map/map.jsx`, () => `section`);

Enzyme.configure({
  adapter: new Adapter(),
});

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
      name: `Angelina`,
      avatar: `img/avatar-angelina.jpg`,
      pro: true,
    },
    location: [52.3909553943508, 4.929309666406198],
    reviews: [
      {
        avatar: `img/avatar-max.jpg`,
        name: `Max`,
        rating: 2.4,
        date: new Date(`2020-03-21`),
        comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
      },
      {
        avatar: `img/avatar-angelina.jpg`,
        name: `Angelina`,
        rating: 5,
        date: new Date(`2020-04-23`),
        comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
      }
    ],
    city: `Paris`
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
      pro: true,
    },
    location: [52.3809553943508, 4.939309666406198],
    reviews: [
      {
        avatar: `img/avatar-max.jpg`,
        name: `Max`,
        rating: 2.4,
        date: new Date(`2020-03-21`),
        comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
      },
      {
        avatar: `img/avatar-angelina.jpg`,
        name: `Angelina`,
        rating: 5,
        date: new Date(`2020-04-23`),
        comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
      }
    ],
    city: `Paris`
  }
];

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
  places: mockOffers,
  activeSortType: `popular`,
};

const store = createStore(reducer, initialState);

it(`Should render places`, () => {
  const main = mount(<Provider store={store}><Main places={mockOffers} cities={mockCities} /></Provider>);

  const placesList = main.find(`.places__list`);
  const placesCards = main.find(`.place-card`);

  expect(placesList).not.toBeUndefined();
  expect(placesCards.length).toEqual(mockOffers.length);

});
