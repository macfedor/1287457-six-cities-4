import {reducer, ActionCreator, ActionType} from "./reducer.js";
import {getCitiesList} from "./utils/common.js";

const cities = getCitiesList();

const mockOffer = {
  id: Math.random(),
  image: `img/apartment-01.jpg`,
  isPremium: false,
  price: 100,
  name: `First`,
  type: `apartment`,
  rating: 5,
  images: [`img/room.jpg`, `img/apartment-01.jpg`, `img/apartment-02.jpg`, `img/apartment-03.jpg`, `img/studio-01.jpg`, `img/studio-01.jpg`],
  insideItems: [`Wi-Fi`, `Washing machine`, `Towels`, `Heating`, `Coffee machine`, `Baby seat`, `Kitchen`, `Dishwasher`, `Cabel TV`, `Fridge`],
  bedrooms: 2,
  guests: 3,
  description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century. An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`,
  host: {
    name: `Angelina`,
    avatar: `img/avatar-angelina.jpg`,
    pro: true,
  },
  location: [52.3909553943508, 4.929309666406198],
  reviews: [
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
    }
  ],
  city: `Paris`
};

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual({
    activeCity: cities[0],
    activeOffer: null,
    step: `main`
  });
});

it(`Reducer should change state by a given value`, () => {
  expect(reducer({
    activeCity: cities[0],
    activeOffer: null,
    step: `main`
  }, {
    type: ActionType.SHOW_CARD,
    payload: {
      step: `property`,
      activeOffer: mockOffer
    }
  })).toEqual({
    activeCity: cities[0],
    activeOffer: mockOffer,
    step: `property`
  });

  expect(reducer({
    activeCity: cities[0],
    activeOffer: null,
    step: `main`
  }, {
    type: ActionType.CHANGE_CITY,
    payload: `Paris`,
  })).toEqual({
    activeCity: `Paris`,
    activeOffer: null,
    step: `main`
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for showCard returns correct action`, () => {
    expect(ActionCreator.showCard(mockOffer)).toEqual({
      type: ActionType.SHOW_CARD,
      payload: {
        step: `property`,
        activeOffer: mockOffer
      },
    });
  });

  it(`Action creator for changeCity returns correct action`, () => {
    expect(ActionCreator.changeCity(`Paris`)).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: `Paris`,
    });
  });

});
