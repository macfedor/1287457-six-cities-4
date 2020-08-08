import * as React from "react";
import {mount, configure} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import withCommentForm from "./with-comment-form";
import CommentForm from "../../components/comment-form/comment-form";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {AuthorizationStatus} from "../../reducer/user/user";

const mockStore = configureStore([]);

configure({
  adapter: new Adapter(),
});

const MockComponentWrapped = withCommentForm(CommentForm);

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
    error: ``,
  },
  USER: {
    AuthorizationStatus: AuthorizationStatus.NO_AUTH,
    userEmail: ``,
  }
});

describe(`Should change state`, () => {
  const wrapper = mount(
      <Provider store={store}><MockComponentWrapped /></Provider>
  );

  it(`Should rating state change`, () => {
    const item = wrapper.find(`[name="rating"]`).first();

    item.simulate(`change`);
    expect(wrapper.find(MockComponentWrapped).childAt(0).state().rating).toEqual(Number(item.getElement().props.value));
  });

  it(`Should comment state change`, () => {
    const item = wrapper.find(`[name="review"]`);

    item.simulate(`change`, {target: {value: `test text`}});
    expect(wrapper.find(MockComponentWrapped).childAt(0).state().comment).toEqual(`test text`);
  });

});

it(`Should call onSubmit with data`, () => {
  const wrapper = mount(
      <Provider store={store}><MockComponentWrapped /></Provider>
  );

  const wrappedComponent = wrapper.find(MockComponentWrapped).find(CommentForm);
  const commentText = `test text`;
  const rating = 5;

  const onSubmitMock = jest.fn();

  wrappedComponent.props().onChangeComment(commentText);
  wrappedComponent.props().onChangeRating(rating);

  const stateComment = wrapper.find(MockComponentWrapped).childAt(0).state().comment;
  const stateRating = wrapper.find(MockComponentWrapped).childAt(0).state().rating;

  wrappedComponent.props().onSubmit = onSubmitMock;
  wrappedComponent.props().onSubmit(stateComment, stateRating);

  expect(wrappedComponent.props().onSubmit).toHaveBeenCalledTimes(1);
  expect(wrappedComponent.props().onSubmit).toHaveBeenCalledWith(commentText, rating);

});
