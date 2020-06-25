import React from "react";
import renderer from "react-test-renderer";
import ReviewsList from "./reviews-list.jsx";

const testData = [
  {
    avatar: `img/avatar-max.jpg`,
    name: `Max`,
    rating: 2.4,
    date: `April 2019`,
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
  },
  {
    avatar: `img/avatar-angelina.jpg`,
    name: `Angelina`,
    rating: 5,
    date: `April 2018`,
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
  }
];

it(`Should ReviewsList render correctly`, () => {
  const tree = renderer
    .create(<ReviewsList
      reviews={testData}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
