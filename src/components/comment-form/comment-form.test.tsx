import * as React from "react";
import * as renderer from "react-test-renderer";
import CommentForm from "./comment-form";

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
