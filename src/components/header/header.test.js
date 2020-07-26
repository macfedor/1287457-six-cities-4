import React from "react";
import renderer from "react-test-renderer";
import {Header} from "./header.jsx";

it(`Header component render correctly`, () => {
  const tree = renderer
    .create(<Header
      authorizationStatus={`AUTH`}
      userEmail={`test@test.com`}
      onSignInClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
