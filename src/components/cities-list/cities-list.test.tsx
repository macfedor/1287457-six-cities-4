import * as React from "react";
import * as renderer from "react-test-renderer";
import CitiesList from "./cities-list";
import {noop} from "../../utils/common";

const mockCities: string[] = [
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
      cities={mockCities}
      activeCity={activeCity}
      onCityClick={noop}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
