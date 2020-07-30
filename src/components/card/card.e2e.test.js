import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Card} from "./card";

Enzyme.configure({
  adapter: new Adapter(),
});

const mock = {
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
};

const cardType = `city`;

it(`Should place's title be pressed`, () => {
  const onTitleClick = jest.fn();
  const onMouseEnter = () => {};
  const onMouseLeave = () => {};

  const card = shallow(
      <Card
        card={mock}
        cardType={cardType}
        onTitleClick={onTitleClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
  );

  const cardTitle = card.find(`.place-card__name a`);
  cardTitle.simulate(`click`, {activeCard: mock});

  expect(onTitleClick).toHaveBeenCalledTimes(1);
  expect(onTitleClick.mock.calls[0][0].activeCard).toMatchObject(mock);
});

it(`Should card be hovered`, () => {
  const onTitleClick = () => {};
  const onMouseLeave = () => {};
  const onMouseEnter = jest.fn();

  const card = shallow(
      <Card
        card={mock}
        cardType={cardType}
        onTitleClick={onTitleClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
  );

  const cardBody = card.find(`.place-card`);
  cardBody.simulate(`mouseEnter`, {activeCard: mock});

  expect(onMouseEnter.mock.calls[0][0].activeCard).toMatchObject(mock);
});

