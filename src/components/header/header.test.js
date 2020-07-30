import React from "react";
import renderer from "react-test-renderer";
import {Header} from "./header.jsx";
import {Router} from "react-router-dom";
import history from "../../history.js";

it(`Header component render correctly`, () => {
  const tree = renderer
    .create(
        <Router history={history} >
          <Header
            authorizationStatus={`AUTH`}
            userEmail={`test@test.com`}
          />
        </Router>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
