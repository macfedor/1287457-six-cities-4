import * as React from "react";
import {mount, configure} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import Main from "../main/main";
import {Provider} from "react-redux";
import {createStore} from "redux";
import reducer from "../../reducer/reducer";
import {Router} from "react-router-dom";
import history from "../../history";
import {AuthorizationStatus} from "../../reducer/user/user";
import {noop} from "../../utils/common";

configure({
  adapter: new Adapter(),
});

const initialState = {
  DATA: {
    activeCity: ``,
    activeOffer: null,
    hoveredOffer: null,
    cities: [],
    places: [],
    activeSortType: `popular`,
    reviews: null,
    nearbyPlaces: null,
    favorites: [],
  },
  USER: {
    AuthorizationStatus: AuthorizationStatus.NO_AUTH,
    userEmail: ``,
  }
};

const store = createStore(reducer, initialState);

it(`Should render no results page`, () => {
  const main = mount(
      <Router history={history} >
        <Provider store={store}>
          <Main
            cities={[]}
            places={[]}
            activeCity={``}
            activeOffer={null}
            onCityClick={noop}
            onCardHover={noop}
          />
        </Provider>
      </Router>
  );

  const citiesStatus = main.find(`.cities__status`);
  expect(citiesStatus.props().children).toEqual(`No places to stay available`);

});
