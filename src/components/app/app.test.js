import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const testData = [
  {
    id: Math.random(),
    image: `img/apartment-01.jpg`,
    isPremium: false,
    price: 100,
    name: `First`,
    type: `apartment`,
    rating: 5,
  },
  {
    id: Math.random(),
    image: `img/apartment-02.jpg`,
    isPremium: true,
    price: 150,
    name: `Second`,
    type: `room`,
    rating: 2.4,
  }
];

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      places={testData}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
