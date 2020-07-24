import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "../main/main.jsx";
import {Provider} from "react-redux";
import {createStore} from "redux";
import reducer from "../../reducer/reducer";

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
  const main = mount(<Provider store={store}>
    <Main
      onTitleClick={() => {}}
      onCityClick={() => {}}
      onCardHover={() => {}}
    /></Provider>);

  const citiesStatus = main.find(`.cities__status`);
  expect(citiesStatus.props().children).toEqual(`No places to stay available`);

});
