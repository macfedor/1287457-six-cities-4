import * as React from "react";
import {shallow, configure} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import {Card} from "./card";
import {Offer, PlaceType} from "../../types";
import {noop} from "../../utils/common";

configure({
  adapter: new Adapter(),
});

const mockOffer: Offer = {
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
};

const cardType = `city`;

it(`Should place's title be pressed`, () => {
  const onTitleClick = jest.fn();
  const card = shallow(
      <Card
        card={mockOffer}
        cardType={cardType}
        onTitleClick={onTitleClick}
        onMouseEnter={noop}
        onMouseLeave={noop}
        onFavoriteToggle={noop}
      />
  );

  const cardTitle = card.find(`.place-card__name Link`);
  cardTitle.simulate(`click`, {activeCard: mockOffer});
  expect(onTitleClick).toHaveBeenCalledTimes(1);
  expect(onTitleClick.mock.calls[0][0]).toMatchObject(mockOffer);
});

it(`Should card be hovered`, () => {
  const onMouseEnter = jest.fn();
  const card = shallow(
      <Card
        card={mockOffer}
        cardType={cardType}
        onTitleClick={noop}
        onMouseEnter={onMouseEnter}
        onMouseLeave={noop}
        onFavoriteToggle={noop}
      />
  );

  const cardBody = card.find(`.place-card`);
  cardBody.simulate(`mouseEnter`, {activeCard: mockOffer});

  expect(onMouseEnter.mock.calls[0][0].activeCard).toMatchObject(mockOffer);
});

