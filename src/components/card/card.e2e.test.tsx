import * as React from "react";
import {shallow, configure} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import {Card} from "./card";
import {Offer} from "../../types";
import {noop} from "../../utils";

configure({
  adapter: new Adapter(),
});

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

it(`Should place's title be pressed`, () => {

  const card = shallow(
      <Card
        card={mock}
        cardType={cardType}
        onTitleClick={jest.fn()}
        onMouseEnter={noop}
        onMouseLeave={noop}
      />
  );

  const cardTitle = card.find(`.place-card__name Link`);
  cardTitle.simulate(`click`, {activeCard: mock});
  expect(onTitleClick).toHaveBeenCalledTimes(1);
  expect(onTitleClick.mock.calls[0][0]).toMatchObject(mock);
});

it(`Should card be hovered`, () => {

  const card = shallow(
      <Card
        card={mock}
        cardType={cardType}
        onTitleClick={noop}
        onMouseEnter={jest.fn()}
        onMouseLeave={noop}
      />
  );

  const cardBody = card.find(`.place-card`);
  cardBody.simulate(`mouseEnter`, {activeCard: mock});

  expect(onMouseEnter.mock.calls[0][0].activeCard).toMatchObject(mock);
});

