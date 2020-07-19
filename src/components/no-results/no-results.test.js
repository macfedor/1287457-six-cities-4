import React from "react";
import renderer from "react-test-renderer";
import NoResults from "./no-results.jsx";

it(`Should NoResults render correctly`, () => {

  const tree = renderer.create(<NoResults />).toJSON();

  expect(tree).toMatchSnapshot();
});
