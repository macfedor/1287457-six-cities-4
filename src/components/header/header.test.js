import * as React from "react";
import renderer from "react-test-renderer";
import {Header} from "./header";
import {Router} from "react-router-dom";
import history from "../../history";

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
