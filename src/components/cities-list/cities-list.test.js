import React from "react";
import renderer from "react-test-renderer";
import CitiesList from "./cities-list.jsx";

const testData = [
  `Amsterdam`,
  `Paris`,
  `Cologne`,
  `Brussels`,
  `Hamburg`,
  `Dusseldorf`,
  `Omsk`,
];

const activeCity = `Paris`;

it(`Should CitiesList render correctly`, () => {
  const tree = renderer
    .create(<CitiesList
      cities={testData}
      activeCity={activeCity}
      onCityClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
