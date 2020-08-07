import * as React from "react";
import * as renderer from "react-test-renderer";
import Map from "./map";
import {Offer, PlaceType} from "../../types";

const div = document.createElement(`div`);
div.id = `map`;
document.body.appendChild(div);

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

const mockActiveOffer = mockOffers[0];

const prefix = `city`;

it(`Should Map render correctly`, () => {
  const tree = renderer
    .create(<Map
      places={mockOffers}
      prefix={prefix}
      activePlace={mockActiveOffer}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
