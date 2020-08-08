import * as React from "react";
import * as renderer from "react-test-renderer";
import {PrivateRoute} from "./private-route";
import {MemoryRouter} from "react-router";
import {AppRoute} from "../../consts";
import {AuthorizationStatus} from "../../reducer/user/user";

const MockComponent = () => <div />;

it(`should render PivateRoute with mock component`, () => {
  const tree = renderer.create(
      <MemoryRouter initialEntries={[AppRoute.FAVORITES]}>
        <PrivateRoute
          exact
          path={AppRoute.FAVORITES}
          authorizationStatus={AuthorizationStatus.AUTH}
          render={() => <MockComponent />}
        />
      </MemoryRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
