import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Card from "./card";

Enzyme.configure({
  adapter: new Adapter(),
});

const mock = {
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
      date: `April 2019`,
      comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
    },
    {
      avatar: `img/avatar-angelina.jpg`,
      name: `Angelina`,
      rating: 5,
      date: `April 2018`,
      comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
    }
  ],
};

const cardType = `city`;

it(`Should place's title be pressed`, () => {
  const onTitleClick = jest.fn();
  const onMouseEnter = () => {};

  const card = shallow(
      <Card
        card={mock}
        cardType={cardType}
        onTitleClick={onTitleClick}
        onMouseEnter={onMouseEnter}
      />
  );

  const cardTitle = card.find(`.place-card__name a`);
  cardTitle.simulate(`click`, {activeCard: mock});

  expect(onTitleClick).toHaveBeenCalledTimes(1);
  expect(onTitleClick.mock.calls[0][0].activeCard).toMatchObject(mock);
});

it(`Should card be hovered`, () => {
  const onTitleClick = () => {};
  const onMouseEnter = jest.fn();

  const card = shallow(
      <Card
        card={mock}
        cardType={cardType}
        onTitleClick={onTitleClick}
        onMouseEnter={onMouseEnter}
      />
  );

  const cardBody = card.find(`.place-card`);
  cardBody.simulate(`mouseEnter`, {activeCard: mock});

  expect(onMouseEnter.mock.calls[0][0].activeCard).toMatchObject(mock);
});

