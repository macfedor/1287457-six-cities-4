import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withCommentForm from "./with-comment-form.js";
import CommentForm from "../../components/comment-form/comment-form.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

Enzyme.configure({
  adapter: new Adapter(),
});

const MockComponentWrapped = withCommentForm(CommentForm);

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

describe(`Should change state`, () => {
  const wrapper = mount(
    <Provider store={store}><MockComponentWrapped /></Provider>
  );

  it(`Should rating state change`, () => {
    const item = wrapper.find(`[name="rating"]`).first();

    item.simulate(`change`);
    expect(wrapper.find(MockComponentWrapped).childAt(0).state().rating).toEqual(item.getElement().props.value);
  });
  
  it(`Should comment state change`, () => {
    const item = wrapper.find(`[name="review"]`);

    item.simulate(`change`, { target: { value: `test text` } });
    expect(wrapper.find(MockComponentWrapped).childAt(0).state().comment).toEqual(`test text`);
  });

});

fit(`Should call onSubmit with data`, () => {
  const wrapper = mount(
    <Provider store={store}><MockComponentWrapped /></Provider>
  );

  const wrappedComponent = wrapper.find(MockComponentWrapped).find(CommentForm);
  const commentText = `test text`;
  const rating = 5;

  wrappedComponent.props().onChangeComment(commentText);
  wrappedComponent.props().onChangeRating(rating);
  wrappedComponent.props().onSubmit();

  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toHaveBeenNthCalledWith(1, {commentText, rating});

});
