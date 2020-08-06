import * as React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "../main/main";
import {Provider} from "react-redux";
import {createStore} from "redux";
import reducer from "../../reducer/reducer";
import {Router} from "react-router-dom";
import history from "../../history";

Enzyme.configure({
  adapter: new Adapter(),
});

const initialState = {
  DATA: {
    step: `main`,
    activeCity: ``,
    activeOffer: null,
    hoveredOffer: null,
    cities: [],
    places: [],
    activeSortType: `popular`,
  }
};

const store = createStore(reducer, initialState);

it(`Should render no results page`, () => {
  const main = mount(
      <Router history={history} >
        <Provider store={store}>
          <Main
            onTitleClick={() => {}}
            onCityClick={() => {}}
            onCardHover={() => {}}
          />
        </Provider>
      </Router>
  );

  const citiesStatus = main.find(`.cities__status`);
  expect(citiesStatus.props().children).toEqual(`No places to stay available`);

});
