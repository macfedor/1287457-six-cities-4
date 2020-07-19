import React from "react";
import renderer from "react-test-renderer";
import withOpenFlag from "./with-open-flag.js";

const MockComponent = () => <div />;
const MockComponentWrapped = withOpenFlag(MockComponent);

it(`Should HOC render correctly`, () => {
  const tree = renderer
    .create(<MockComponentWrapped />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});