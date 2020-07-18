import React from "react";
import renderer from "react-test-renderer";
import ResultsWrapped from "./results-wrapped.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

const div = document.createElement(`div`);
div.id = `map`;
document.body.appendChild(div);

const testData = [
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

const cities = [
  `Amsterdam`,
  `Paris`,
  `Cologne`,
  `Brussels`,
  `Hamburg`,
  `Dusseldorf`,
  `Omsk`,
];

it(`Should ResultsWrapped render correctly`, () => {
  const store = mockStore({
    activeSortType: `Popular`
  });
  const tree = renderer
    .create(<Provider store={store}><ResultsWrapped
      places={testData}
      cities={cities}
      activeCity={`Paris`}
      onTitleClick={() => {}}
      onCityClick={() => {}}
      onCardHover={() => {}}
    /></Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});