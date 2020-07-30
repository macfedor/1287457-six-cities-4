import React from "react";
import renderer from "react-test-renderer";
import {Property} from "./property.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {Router} from "react-router-dom";
import history from "../../history.js";

const mockStore = configureStore([]);

const div = document.createElement(`div`);
div.id = `map`;
document.body.appendChild(div);

const testData = {
  id: Math.random(),
  image: `img/apartment-01.jpg`,
  isPremium: false,
  price: 1000,
  name: `Secont`,
  type: `room`,
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
  },
};

const mockReviews = [
  {
    id: 1,
    avatar: `img/avatar-max.jpg`,
    name: `Max`,
    rating: 2.4,
    date: String(new Date(`2020-03-21`)),
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
  },
  {
    id: 2,
    avatar: `img/avatar-angelina.jpg`,
    name: `Angelina`,
    rating: 5,
    date: String(new Date(`2020-04-23`)),
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
  }
];

const store = mockStore({
  DATA: {
    step: `property`,
    activeCity: null,
    activeOffer: testData,
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

it(`Should Property render correctly`, () => {
  const tree = renderer
    .create(
        <Router history={history} >
          <Provider store={store}><Property
            property={testData}
            reviews={mockReviews}
            onTitleClick={() => {}}
            getReviews={() => {}}
          /></Provider>
        </Router>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
