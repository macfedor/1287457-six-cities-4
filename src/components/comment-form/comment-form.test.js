import React from "react";
import renderer from "react-test-renderer";
import CommentForm from "./comment-form.jsx";

it(`Should CommentForm render correctly`, () => {
  const tree = renderer
    .create(<CommentForm
      activeSubmit={false}
      onChangeRating={() => {}}
      onChangeComment={() => {}}
      onSubmit={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
