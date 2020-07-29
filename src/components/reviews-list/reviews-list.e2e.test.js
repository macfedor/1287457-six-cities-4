import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ReviewsList from "./reviews-list";
import {maxReviews} from "../../consts.js";
import {compareDates} from "../../utils/common.js";

Enzyme.configure({
  adapter: new Adapter(),
});

const mockReviews = [
  {
    avatar: `img/avatar-max.jpg`,
    name: `Max`,
    rating: 2.4,
    date: new Date(`2020-03-21`),
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
  },
  {
    avatar: `img/avatar-angelina.jpg`,
    name: `Angelina`,
    rating: 5,
    date: new Date(`2020-04-23`),
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
  },
  {
    avatar: `img/avatar-max.jpg`,
    name: `Max`,
    rating: 2.4,
    date: new Date(`2020-05-21`),
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
  },
  {
    avatar: `img/avatar-angelina.jpg`,
    name: `Angelina`,
    rating: 5,
    date: new Date(`2020-02-23`),
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
  },
  {
    avatar: `img/avatar-max.jpg`,
    name: `Max`,
    rating: 2.4,
    date: new Date(`2020-01-21`),
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
  },
  {
    avatar: `img/avatar-angelina.jpg`,
    name: `Angelina`,
    rating: 5,
    date: new Date(`2020-06-23`),
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
  },
  {
    avatar: `img/avatar-max.jpg`,
    name: `Max`,
    rating: 2.4,
    date: new Date(`2020-07-21`),
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
  },
  {
    avatar: `img/avatar-angelina.jpg`,
    name: `Angelina`,
    rating: 5,
    date: new Date(`2020-08-23`),
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
  },
  {
    avatar: `img/avatar-max.jpg`,
    name: `Max`,
    rating: 2.4,
    date: new Date(`2020-09-21`),
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
  },
  {
    avatar: `img/avatar-angelina.jpg`,
    name: `Angelina`,
    rating: 5,
    date: new Date(`2020-10-23`),
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
  },
  {
    avatar: `img/avatar-max.jpg`,
    name: `Max`,
    rating: 2.4,
    date: new Date(`2020-11-21`),
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
  },
  {
    avatar: `img/avatar-angelina.jpg`,
    name: `Angelina`,
    rating: 5,
    date: new Date(`2020-12-23`),
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
  },
];

it(`Should be max "maxReviews" reviews`, () => {

  const reviewsList = mount(
      <ReviewsList
        reviews={mockReviews}
      />
  );

  const reviews = reviewsList.find(`.reviews__item`);
  expect(reviews.length).toBeLessThanOrEqual(maxReviews);
});

it(`Should be correct number of reviews`, () => {

  const reviewsList = mount(
      <ReviewsList
        reviews={mockReviews}
      />
  );

  const reviewsCount = +reviewsList.find(`.reviews__amount`).text();
  expect(reviewsCount).toEqual(mockReviews.length);
});

it(`Should be sorted reviews`, () => {

  const reviewsList = mount(
      <ReviewsList
        reviews={mockReviews}
      />
  );

  const reviewFirstDate = reviewsList.find(`.reviews__item`).first().find(`.reviews__time`).prop(`dateTime`);
  const reviewLastDate = reviewsList.find(`.reviews__item`).last().find(`.reviews__time`).prop(`dateTime`);

  expect(compareDates(reviewLastDate, reviewFirstDate)).toBeGreaterThan(0);
});
