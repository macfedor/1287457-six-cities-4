export default [
  {
    id: Math.random(),
    image: `img/apartment-01.jpg`,
    isPremium: false,
    price: 100,
    name: `First`,
    type: `apartment`,
    rating: 2.4,
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
    location: [52.3909553943508, 4.85309666406198],
    reviews: [
      {
        avatar: `img/avatar-max.jpg`,
        name: `Max`,
        rating: 2.4,
        date: `April 2019`,
        comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
      },
      {
        avatar: `img/avatar-angelina.jpg`,
        name: `Angelina`,
        rating: 5,
        date: `April 2018`,
        comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
      }
    ],
  },
  {
    id: Math.random(),
    image: `img/apartment-01.jpg`,
    isPremium: false,
    price: 1000,
    name: `Second`,
    type: `house`,
    rating: 4.8,
    images: [`img/room.jpg`, `img/apartment-01.jpg`, `img/apartment-02.jpg`],
    insideItems: [`Wi-Fi`, `Washing machine`, `Towels`],
    bedrooms: 3,
    guests: 4,
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    host: {
      name: `Angelina`,
      avatar: `img/avatar-angelina.jpg`,
      pro: true,
    },
    location: [52.369553943508, 4.85309666406198],
    reviews: [
      {
        avatar: `img/avatar-max.jpg`,
        name: `Max`,
        rating: 2.4,
        date: `April 2019`,
        comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
      },
      {
        avatar: `img/avatar-angelina.jpg`,
        name: `Angelina`,
        rating: 5,
        date: `April 2018`,
        comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
      }
    ],
  },
  {
    id: Math.random(),
    image: `img/apartment-02.jpg`,
    isPremium: false,
    price: 100,
    name: `Third`,
    type: `apartment`,
    rating: 3.3,
    images: [`img/room.jpg`, `img/apartment-01.jpg`, `img/apartment-02.jpg`, `img/apartment-03.jpg`, `img/studio-01.jpg`, `img/studio-01.jpg`],
    insideItems: [`Wi-Fi`, `Washing machine`, `Baby seat`, `Kitchen`, `Dishwasher`, `Cabel TV`, `Fridge`],
    bedrooms: 2,
    guests: 3,
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century. An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`,
    host: {
      name: `Max`,
      avatar: `img/avatar-max.jpg`,
      pro: true,
    },
    location: [52.3909553943508, 4.929309666406198],
    reviews: [
      {
        avatar: `img/avatar-max.jpg`,
        name: `Max`,
        rating: 2.4,
        date: `April 2019`,
        comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
      },
      {
        avatar: `img/avatar-angelina.jpg`,
        name: `Angelina`,
        rating: 5,
        date: `April 2018`,
        comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
      }
    ],
  },
  {
    id: Math.random(),
    image: `img/apartment-03.jpg`,
    isPremium: true,
    price: 2000,
    name: `Last`,
    type: `room`,
    rating: 4.4,
    images: [`img/room.jpg`, `img/apartment-01.jpg`],
    insideItems: [`Wi-Fi`, `Washing machine`],
    bedrooms: 3,
    guests: 4,
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    host: {
      name: `Max`,
      avatar: `img/avatar-max.jpg`,
      pro: true,
    },
    location: [52.3809553943508, 4.939309666406198],
    reviews: [
      {
        avatar: `img/avatar-max.jpg`,
        name: `Max`,
        rating: 2.4,
        date: `April 2019`,
        comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
      },
      {
        avatar: `img/avatar-angelina.jpg`,
        name: `Angelina`,
        rating: 5,
        date: `April 2018`,
        comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
      }
    ],
  }
];
