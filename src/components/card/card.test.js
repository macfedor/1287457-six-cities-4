import React from "react";
import renderer from "react-test-renderer";
import Card from "./card.jsx";

const testData = {
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
};

it(`Should Card render correctly`, () => {
  const tree = renderer
    .create(<Card
      card={testData}
      onMouseEnter={() => {}}
      onTitleClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});