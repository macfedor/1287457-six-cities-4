import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import CardsList from "./cards-list";
import {Offer, PlaceType} from "../../types";
import {Provider} from "react-redux";
import {createStore} from "redux";
import reducer from "../../reducer/reducer";
import {AuthorizationStatus} from "../../reducer/user/user";
import history from "../../history";
import {Router} from "react-router-dom";

configure({
  adapter: new Adapter(),
});

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

const cardsListClassName = `cities__places-list`;
const cardType = `city`;

it(`Should card be hovered`, () => {
  const onCardHover = jest.fn();
  const cardsList = mount(
      <Router history={history} ><Provider store={store}><CardsList
        cards={mockOffers}
        cardsListClassName={cardsListClassName}
        cardType={cardType}
        onCardHover={onCardHover}
      /></Provider></Router>
  );

  const cardBody = cardsList.find(`.place-card`).at(0);
  cardBody.simulate(`mouseEnter`, {activeCard: mockOffers[0]});

  expect(onCardHover).toHaveBeenCalledTimes(1);
  expect(onCardHover.mock.calls[0][0]).toMatchObject(mockOffers[0]);

  cardBody.simulate(`mouseLeave`);
  expect(onCardHover).toHaveBeenCalledTimes(2);
  expect(onCardHover.mock.calls[1][0]).toBeNull();
});

