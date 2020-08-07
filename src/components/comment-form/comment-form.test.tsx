import * as React from "react";
import * as renderer from "react-test-renderer";
import CommentForm from "./comment-form";
import {noop} from "../../utils/common";

it(`Should CommentForm render correctly`, () => {
  const tree = renderer
    .create(<CommentForm
      activeSubmit={false}
      onChangeRating={noop}
      onChangeComment={noop}
      onSubmit={noop}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
