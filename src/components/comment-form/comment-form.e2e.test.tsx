import * as React from "react";
import {mount, configure} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import CommentForm from "./comment-form";
import {noop} from "../../utils/common";

configure({
  adapter: new Adapter(),
});


it(`Should CommentForm be submited`, () => {
  const onSubmit = jest.fn();
  const comment = mount(
      <CommentForm
        activeSubmit={true}
        onChangeRating={noop}
        onChangeComment={noop}
        onSubmit={onSubmit}
      />
  );

  const mockComment = `test text`;
  const mockRating = 5;

  const commetnForm = comment.find(`form`);
  commetnForm.simulate(`submit`, {comment: mockComment, rating: mockRating});

  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit.mock.calls[0][0].comment).toEqual(mockComment);
  expect(onSubmit.mock.calls[0][0].rating).toEqual(mockRating);

});

