import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

it(`Should Main render correctly`, () => {
  const tree = renderer
    .create(<Main
      places={[`Beautiful & luxurious apartment at great location`, `Wood and stone place`, `Third name`, `test`]}
      onTitleClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
