import * as React from "react";
import {mount, configure} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import ReviewsList from "./reviews-list";
import {MAX_REVIEWS} from "../../consts";
import {compareDates} from "../../utils/common";
import {AuthorizationStatus} from "../../reducer/user/user";

configure({
  adapter: new Adapter(),
});

import {Provider} from "react-redux";
import {createStore} from "redux";
import reducer from "../../reducer/reducer";
import {Offer, PlaceType} from "../../types";

const mockCities: string[] = [
  `Paris`,
  `Cologne`,
  `Brussels`,
  `Hamburg`,
  `Dusseldorf`,
  `Omsk`,
];

const mockActiveCity: string = mockCities[0];

const mockOffers: Offer[] = [
  {
    id: 1,
    image: `img/apartment-01.jpg`,
    isPremium: false,
    isFavorite: false,
    price: 100,
    name: `First`,
    type: PlaceType.APARTMENT,
    rating: 5,
    images: [`img/room.jpg`, `img/apartment-01.jpg`, `img/apartment-02.jpg`, `img/apartment-03.jpg`, `img/studio-01.jpg`, `img/studio-01.jpg`],
    insideItems: [`Wi-Fi`, `Washing machine`, `Towels`, `Heating`, `Coffee machine`, `Baby seat`, `Kitchen`, `Dishwasher`, `Cabel TV`, `Fridge`],
    bedrooms: 2,
    guests: 3,
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century. An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`,
    host: {
      id: 1,
      name: `Angelina`,
      avatar: `img/avatar-angelina.jpg`,
      isPro: true,
    },
    location: {
      coordinates: [52.3909553943508, 4.929309666406198],
      zoom: 13,
    },
    city: {
      coordinates: [52.3909553943508, 4.929309666406198],
      zoom: 13,
      name: `Paris`,
    }
  },
  {
    id: 2,
    image: `img/apartment-01.jpg`,
    isPremium: false,
    isFavorite: false,
    price: 1000,
    name: `Secont`,
    type: PlaceType.ROOM,
    rating: 5,
    images: [`img/room.jpg`, `img/apartment-01.jpg`, `img/apartment-02.jpg`],
    insideItems: [`Wi-Fi`, `Washing machine`, `Towels`],
    bedrooms: 3,
    guests: 4,
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    host: {
      name: `Angelina`,
      avatar: `img/avatar-angelina.jpg`,
      isPro: true,
      id: 2,
    },
    location: {
      coordinates: [52.3909553943508, 4.929309666406198],
      zoom: 13,
    },
    city: {
      coordinates: [52.3909553943508, 4.929309666406198],
      zoom: 13,
      name: `Paris`,
    }
  }
];

const mockReviews = [
  {
    avatar: `img/avatar-max.jpg`,
    name: `Max`,
    rating: 2.4,
    date: `2020-03-21`,
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    id: 1,
  },
  {
    avatar: `img/avatar-angelina.jpg`,
    name: `Angelina`,
    rating: 5,
    date: `2020-04-23`,
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    id: 2,
  },
  {
    avatar: `img/avatar-max.jpg`,
    name: `Max`,
    rating: 2.4,
    date: `2020-05-21`,
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    id: 3,
  },
  {
    avatar: `img/avatar-angelina.jpg`,
    name: `Angelina`,
    rating: 5,
    date: `2020-02-23`,
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    id: 4,
  },
  {
    avatar: `img/avatar-max.jpg`,
    name: `Max`,
    rating: 2.4,
    date: `2020-01-21`,
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    id: 5,
  },
  {
    avatar: `img/avatar-angelina.jpg`,
    name: `Angelina`,
    rating: 5,
    date: `2020-06-23`,
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    id: 6,
  },
  {
    avatar: `img/avatar-max.jpg`,
    name: `Max`,
    rating: 2.4,
    date: `2020-07-21`,
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    id: 7,
  },
  {
    avatar: `img/avatar-angelina.jpg`,
    name: `Angelina`,
    rating: 5,
    date: `2020-08-23`,
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    id: 8,
  },
  {
    avatar: `img/avatar-max.jpg`,
    name: `Max`,
    rating: 2.4,
    date: `2020-09-21`,
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    id: 9,
  },
  {
    avatar: `img/avatar-angelina.jpg`,
    name: `Angelina`,
    rating: 5,
    date: `2020-10-23`,
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    id: 10,
  },
  {
    avatar: `img/avatar-max.jpg`,
    name: `Max`,
    rating: 2.4,
    date: `2020-11-21`,
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    id: 11,
  },
  {
    avatar: `img/avatar-angelina.jpg`,
    name: `Angelina`,
    rating: 5,
    date: `2020-12-23`,
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    id: 12,
  },
];

const initialState = {
  DATA: {
    activeCity: mockActiveCity,
    activeOffer: null,
    hoveredOffer: null,
    cities: mockCities,
    places: mockOffers,
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
};

const store = createStore(
    reducer,
    initialState
);

it(`Should be max "MAX_REVIEWS" reviews`, () => {

  const reviewsList = mount(
      <Provider store={store}><ReviewsList
        reviews={mockReviews}
        authorizationStatus={AuthorizationStatus.AUTH}
        propertyId={1}
      /></Provider>
  );

  const reviews = reviewsList.find(`.reviews__item`);
  expect(reviews.length).toBeLessThanOrEqual(MAX_REVIEWS);
});

it(`Should be correct number of reviews`, () => {

  const reviewsList = mount(
      <Provider store={store}><ReviewsList
        reviews={mockReviews}
        authorizationStatus={AuthorizationStatus.AUTH}
        propertyId={1}
      /></Provider>
  );

  const reviewsCount = +reviewsList.find(`.reviews__amount`).text();
  expect(reviewsCount).toEqual(mockReviews.length);
});

it(`Should be sorted reviews`, () => {

  const reviewsList = mount(
      <Provider store={store}><ReviewsList
        reviews={mockReviews}
        authorizationStatus={AuthorizationStatus.AUTH}
        propertyId={1}
      /></Provider>
  );

  const reviewFirstDate = reviewsList.find(`.reviews__item`).first().find(`.reviews__time`).prop(`dateTime`);
  const reviewLastDate = reviewsList.find(`.reviews__item`).last().find(`.reviews__time`).prop(`dateTime`);

  expect(compareDates(reviewLastDate, reviewFirstDate)).toBeGreaterThan(0);
});
