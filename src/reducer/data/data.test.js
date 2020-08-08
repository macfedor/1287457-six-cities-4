import {reducer, ActionCreator, ActionType, Operation} from "./data";
import {getAdaptedOffers} from "./adapter";
import {SortType} from "../../consts";
import {sortPlaces, getCitiesList} from "../../utils/common";
import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api";

const api = createAPI(() => {});

const citiesList = [
  `Amsterdam`,
  `Paris`,
  `Berlin`
];

const mockServerTypeOffers = [
  {
    "bedrooms": 5,
    "city": {
      "location": {
        "latitude": 52.37454,
        "longitude": 4.897976,
        "zoom": 13,
      },
      "name": `Amsterdam`,
    },
    "description": `I rent out a very sunny and bright apartment only 7 minutes walking distance to the metro station. The apartment has a spacious living room with a kitchen, one bedroom and a bathroom with mit bath. A terrace can be used in summer.`,
    "goods": [`Laptop friendly workspace`],
    "host": {
      "avatar_url": `img/avatar-angelina.jpg`,
      "id": 25,
      "is_pro": true,
      "name": `Angelina`,
    },
    "id": 1,
    "images": [`https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/20.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/16.jpg`],
    "is_favorite": false,
    "is_premium": false,
    "location": {
      "latitude": 52.385540000000006,
      "longitude": 4.886976,
      "zoom": 16,
    },
    "max_adults": 6,
    "preview_image": `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg`,
    "price": 813,
    "rating": 2.4,
    "title": `Wood and stone place`,
    "type": `house`,
  },
  {
    "bedrooms": 2,
    "city": {
      "location": {
        "latitude": 52.37454,
        "longitude": 4.897976,
        "zoom": 13,
      },
      "name": `Amsterdam`,
    },
    "description": `I rent out a very sunny and bright apartment only 7 minutes walking distance to the metro station. The apartment has a spacious living room with a kitchen, one bedroom and a bathroom with mit bath. A terrace can be used in summer.`,
    "goods": [`Laptop friendly workspace`],
    "host": {
      "avatar_url": `img/avatar-angelina.jpg`,
      "id": 25,
      "is_pro": true,
      "name": `Angelina`,
    },
    "id": 1,
    "images": [`https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/20.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/16.jpg`],
    "is_favorite": false,
    "is_premium": false,
    "location": {
      "latitude": 52.385540000000006,
      "longitude": 4.886976,
      "zoom": 16,
    },
    "max_adults": 6,
    "preview_image": `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg`,
    "price": 1000,
    "rating": 4,
    "title": `Wood and stone place`,
    "type": `house`,
  }
];

const mocksSort = [
  {
    price: 200,
    rating: 4,
  },
  {
    price: 100,
    rating: 2,
  },
  {
    price: 150,
    rating: 5,
  },
];

it(`Sort works correctly`, () => {
  const sortedToHigh = sortPlaces(mocksSort, SortType.TO_HIGH);
  const sortedToLow = sortPlaces(mocksSort, SortType.TO_LOW);
  const sortedByRating = sortPlaces(mocksSort, SortType.TOP_RATED);
  const sortedDefault = sortPlaces(mocksSort);
  expect(sortedToHigh[0].price).toBeLessThan(sortedToHigh[sortedToHigh.length - 1].price);
  expect(sortedToLow[0].price).toBeGreaterThan(sortedToLow[sortedToLow.length - 1].price);
  expect(sortedByRating[0].rating).toBeGreaterThan(sortedByRating[sortedByRating.length - 1].rating);
  expect(sortedDefault).toEqual(mocksSort);

  expect(reducer({
    places: mocksSort
  }, {type: ActionType.SORTING, payload: SortType.TO_LOW})).toEqual({
    activeSortType: `Price: high to low`,
    places: [
      {
        price: 200,
        rating: 4,
      },
      {
        price: 150,
        rating: 5,
      },
      {
        price: 100,
        rating: 2,
      },
    ]
  });

  expect(reducer({
    places: mocksSort
  }, {type: ActionType.SORTING, payload: SortType.TOP_RATED})).toEqual({
    activeSortType: `Top rated first`,
    places: [
      {
        price: 150,
        rating: 5,
      },
      {
        price: 200,
        rating: 4,
      },
      {
        price: 100,
        rating: 2,
      },
    ]
  });

  expect(reducer({
    places: mocksSort
  }, {type: ActionType.SORTING, payload: SortType.TO_HIGH})).toEqual({
    activeSortType: `Price: low to high`,
    places: [
      {
        price: 100,
        rating: 2,
      },
      {
        price: 150,
        rating: 5,
      },
      {
        price: 200,
        rating: 4,
      },
    ]
  });
});

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer({
    activeCity: citiesList[0],
    activeOffer: null,
    cities: citiesList
  }, {})).toEqual({
    activeCity: citiesList[0],
    activeOffer: null,
    cities: citiesList
  });
});

it(`Reducer should change state by a given value`, () => {
  expect(reducer({
    activeCity: citiesList[0],
    activeOffer: null,
    cities: citiesList
  }, {
    type: ActionType.CHANGE_CITY,
    payload: `Paris`,
  })).toEqual({
    activeCity: `Paris`,
    activeOffer: null,
    cities: citiesList
  });
});

describe(`Action creators work correctly`, () => {

  it(`Action creator for changeCity returns correct action`, () => {
    expect(ActionCreator.changeCity(`Paris`)).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: `Paris`,
    });
  });

});

describe(`Operation works correctly`, () => {
  it(`Should make a correct API call to /hotels`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loadOffers = Operation.loadOffers();

    apiMock
      .onGet(`/hotels`)
      .reply(200, mockServerTypeOffers);

    return loadOffers(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS,
          payload: {
            cities: getCitiesList(mockServerTypeOffers),
            places: getAdaptedOffers(mockServerTypeOffers),
          }
        });
      });
  });
});
