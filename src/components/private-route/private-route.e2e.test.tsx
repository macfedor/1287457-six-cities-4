import * as React from "react";
import {mount, configure} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import {PrivateRoute} from "./private-route";
import {MemoryRouter} from "react-router";
import {AppRoute} from "../../consts";
import {AuthorizationStatus} from "../../reducer/user/user";

configure({
  adapter: new Adapter(),
});

const MockComponent = () => <div />;

it(`Should render PrivateRoute if user has been authenticated`, () => {
  const wrapper = mount(
      <MemoryRouter initialEntries={[AppRoute.FAVORITES]}>
        <PrivateRoute
          exact
          path={AppRoute.FAVORITES}
          authorizationStatus={AuthorizationStatus.AUTH}
          render={() => <MockComponent />}
        />
      </MemoryRouter>
  );

  expect(wrapper.exists(MockComponent)).toBe(true);
});

it(`Should redirect to Login if user is not authenticated`, () => {
  const wrapper = mount(
      <MemoryRouter initialEntries={[AppRoute.FAVORITES]}>
        <PrivateRoute
          exact
          path={AppRoute.FAVORITES}
          authorizationStatus={AuthorizationStatus.NO_AUTH}
          render={() => <MockComponent />}
        />
      </MemoryRouter>
  );

  const history = wrapper.find(`Router`).prop(`history`);
  expect(history.location.pathname).toBe(AppRoute.LOGIN);
});
