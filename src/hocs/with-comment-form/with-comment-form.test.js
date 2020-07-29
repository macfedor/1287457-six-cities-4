import React from "react";
import renderer from "react-test-renderer";
import withCommentForm from "./with-comment-form.js";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

const MockComponent = () => <div />;
const MockComponentWrapped = withCommentForm(MockComponent);

const store = mockStore({
  DATA: {
    step: `property`,
    activeCity: null,
    activeOffer: null,
    hoveredOffer: null,
    cities: [],
    places: [],
    activeSortType: `popular`,
  },
  USER: {
    AuthorizationStatus: `NO_AUTH`,
    userEmail: ``,
  }
});

it(`Should HOC render correctly`, () => {
  const tree = renderer
    .create(<Provider store={store}><MockComponentWrapped /></Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
