import * as React from "react";
import {mount, configure} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import App from "./app";
import {Provider} from "react-redux";
import {createStore} from "redux";
import reducer from "../../reducer/reducer";
import {Offer, PlaceType} from "../../types";
import {noop} from "../../utils/common";
import {AuthorizationStatus} from "../../reducer/user/user";

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
  },
  {
    id: 4,
    image: `img/apartment-01.jpg`,
    isPremium: false,
    isFavorite: false,
    price: 10,
    name: `Third`,
    type: PlaceType.APARTMENT,
    rating: 2.5,
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
    id: 3,
    image: `img/apartment-01.jpg`,
    isPremium: false,
    isFavorite: false,
    price: 100000,
    name: `Last`,
    type: PlaceType.ROOM,
    rating: 4,
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

const div = document.createElement(`div`);
div.id = `map`;
document.body.appendChild(div);

configure({
  adapter: new Adapter(),
});

function getSortedDesc(array) {
  return array.slice().sort((a, b) => b - a);
}

function getSortedAsc(array) {
  return array.slice().sort((a, b) => a - b);
}

function getRating(app) {
  const ratingNodes = app.find(`.rating__stars`);
  const rating = [];
  ratingNodes.forEach((ratingItem) => {
    rating.push(
        Number(
            ratingItem
              .find(`span`)
              .first()
              .props()
              .style.width.replace(`%`, ``)
        )
    );
  });

  return rating;
}

function getPrices(app) {
  const priceNodes = app.find(`.place-card__price-value`);
  const prices = [];
  priceNodes.forEach((priceItem) => {
    prices.push(
        Number(
            priceItem
              .props()
              .children[1]
        )
    );
  });

  return prices;
}

describe(`Should sort item be clicked`, () => {
  const appWithProvider = mount(
      <Provider store={store}>
        <App
          activeOffer={null}
          authorizationStatus={AuthorizationStatus.NO_AUTH}
          onCityClick={noop}
          onCardHover={noop}
          login={noop}
        />
      </Provider>
  );

  const sort = appWithProvider.find(`.places__sorting .places__sorting-type`);

  it(`Should sort by rating: top first`, () => {

    const ratingBeforeSorting = getRating(appWithProvider);

    sort.simulate(`click`);

    const topRatedFirst = appWithProvider.find(`.places__options li`).last();
    topRatedFirst.simulate(`click`);

    const ratingAfterSorting = getRating(appWithProvider);

    expect(ratingBeforeSorting).not.toEqual(getSortedDesc(ratingBeforeSorting));
    expect(ratingBeforeSorting).not.toEqual(ratingAfterSorting);
    expect(ratingAfterSorting).toEqual(getSortedDesc(ratingBeforeSorting));

  });

  it(`Should sort by price: high to low`, () => {

    const pricesBeforeSorting = getPrices(appWithProvider);

    sort.simulate(`click`);

    const topPricesFirst = appWithProvider.find(`.places__options li`).at(2);
    topPricesFirst.simulate(`click`);

    const pricesAfterSorting = getPrices(appWithProvider);

    expect(pricesBeforeSorting).not.toEqual(getSortedDesc(pricesBeforeSorting));
    expect(pricesBeforeSorting).not.toEqual(pricesAfterSorting);
    expect(pricesAfterSorting).toEqual(getSortedDesc(pricesBeforeSorting));

  });

  it(`Should sort by price: low to high`, () => {

    const pricesBeforeSorting = getPrices(appWithProvider);

    sort.simulate(`click`);

    const topPricesFirst = appWithProvider.find(`.places__options li`).at(1);
    topPricesFirst.simulate(`click`);

    const pricesAfterSorting = getPrices(appWithProvider);

    expect(pricesBeforeSorting).not.toEqual(getSortedAsc(pricesBeforeSorting));
    expect(pricesBeforeSorting).not.toEqual(pricesAfterSorting);
    expect(pricesAfterSorting).toEqual(getSortedAsc(pricesBeforeSorting));

  });

});
