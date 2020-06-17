import React from "react";
import renderer from "react-test-renderer";
import Card from "./card.jsx";

const testData = {
  id: Math.random(),
  image: `img/apartment-01.jpg`,
  isPremium: false,
  price: 100,
  name: `First`,
  type: `apartment`,
  rating: 5,
};

it(`Should Card render correctly`, () => {
  const tree = renderer
    .create(<Card
      card={testData}
      onMouseOver={() => {}}
      onTitleClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
