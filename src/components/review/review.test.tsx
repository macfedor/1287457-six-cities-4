import * as React from "react";
import * as renderer from "react-test-renderer";
import Review from "./review";

const testData = {
  id: 1,
  avatar: `img/avatar-max.jpg`,
  name: `Max`,
  rating: 2.4,
  date: `2020-04-23`,
  comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
};

it(`Should Review render correctly`, () => {
  const tree = renderer
    .create(<Review
      review={testData}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
