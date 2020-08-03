import React from "react";
import renderer from "react-test-renderer";
import {Card} from "./card.jsx";
import {Router} from "react-router-dom";
import history from "../../history.js";

const testData = {
  id: 1,
  image: `img/apartment-01.jpg`,
  isPremium: false,
  isFavorite: false,
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
};

const cardType = `city`;

it(`Should Card render correctly`, () => {
  const tree = renderer
    .create(<Router history={history} ><Card
      card={testData}
      cardType={cardType}
      onMouseEnter={() => {}}
      onMouseLeave={() => {}}
      onTitleClick={() => {}}
    /></Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
