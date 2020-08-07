import * as React from "react";
import * as renderer from "react-test-renderer";
import withCommentForm from "./with-comment-form";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {AuthorizationStatus} from "../../reducer/user/user";

const mockStore = configureStore([]);

const MockComponent = () => <div />;
const MockComponentWrapped = withCommentForm(MockComponent);

const store = mockStore({
  DATA: {
    activeCity: null,
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
});

it(`Should HOC render correctly`, () => {
  const tree = renderer
    .create(<Provider store={store}><MockComponentWrapped /></Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
