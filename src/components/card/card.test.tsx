import * as React from "react";
import * as renderer from "react-test-renderer";
import {Card} from "./card";
import {Router} from "react-router-dom";
import history from "../../history";
import {Offer} from "../../types";
import {noop} from "../../utils";

const mockOffer: Offer = {
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

const cardType: string = `city`;

it(`Should Card render correctly`, () => {
  const tree = renderer
    .create(<Router history={history} ><Card
      card={mockOffer}
      cardType={cardType}
      onMouseEnter={noop}
      onMouseLeave={noop}
      onTitleClick={noop}
    /></Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
