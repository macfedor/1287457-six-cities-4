import * as React from "react";
import * as renderer from "react-test-renderer";
import {Card} from "./card";
import {Router} from "react-router-dom";
import history from "../../history";
import {Offer, PlaceType} from "../../types";
import {noop} from "../../utils/common";

const mockOffer: Offer = {
  id: 1,
  image: `img/apartment-01.jpg`,
  isPremium: false,
  isFavorite: false,
  price: 100,
  name: `First`,
  type: PlaceType.APARTMENT,
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
};

const cardType = `city`;

it(`Should Card render correctly`, () => {
  const tree = renderer
    .create(<Router history={history} ><Card
      card={mockOffer}
      cardType={cardType}
      onMouseEnter={noop}
      onMouseLeave={noop}
      onTitleClick={noop}
      onFavoriteToggle={noop}
    /></Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
