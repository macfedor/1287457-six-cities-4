import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Card from "./card";

Enzyme.configure({
  adapter: new Adapter(),
});

const mock = {
  id: 123,
  image: `img/apartment-01.jpg`,
  isPremium: false,
  price: 100,
  name: `First`,
  type: `apartment`,
  rating: 5,
};

it(`Should place's title be pressed`, () => {
  const onTitleClick = jest.fn();
  const onMouseEnter = jest.fn();

  const card = shallow(
      <Card
        card={mock}
        onTitleClick={onTitleClick}
        onMouseEnter={onMouseEnter}
      />
  );

  const cardTitle = card.find(`.place-card__name a`);
  cardTitle.simulate(`click`);

  expect(onTitleClick).toHaveBeenCalledTimes(1);
});

it(`Should card be hovered`, () => { // убрать f
  const onTitleClick = jest.fn();
  const onMouseEnter = jest.fn((...args) => [...args]);

  const card = shallow(
      <Card
        card={mock}
        onTitleClick={onTitleClick}
        onMouseEnter={onMouseEnter}
      />
  );

  const cardBody = card.find(`.place-card`);
  cardBody.simulate(`mouseEnter`, {activeCard: mock});

  expect(onMouseEnter.mock.calls[0][0].activeCard).toMatchObject(mock);
});

