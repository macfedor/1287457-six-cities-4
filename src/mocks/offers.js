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
    city: `Amsterdam`,
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
    city: `Amsterdam`,
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
    city: `Amsterdam`,
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
    city: `Amsterdam`,
  },
  {
    id: Math.random(),
    image: `img/apartment-03.jpg`,
    isPremium: true,
    price: 2000,
    name: `Paris room`,
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
    location: [48.8534, 2.3488],
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
    city: `Paris`,
  },
  {
    id: Math.random(),
    image: `img/apartment-03.jpg`,
    isPremium: true,
    price: 1000,
    name: `Paris room2`,
    type: `room`,
    rating: 3.4,
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
    location: [48.8534, 2.3488],
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
    city: `Paris`,
  },
  {
    id: Math.random(),
    image: `img/apartment-01.jpg`,
    isPremium: false,
    price: 100,
    name: `Cologne apart`,
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
    location: [50.9333, 6.95],
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
    city: `Cologne`,
  },
  {
    id: Math.random(),
    image: `img/apartment-01.jpg`,
    isPremium: false,
    price: 1000,
    name: `Brussels house`,
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
    location: [50.8504, 4.34878],
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
    city: `Brussels`,
  },
  {
    id: Math.random(),
    image: `img/apartment-02.jpg`,
    isPremium: false,
    price: 100,
    name: `Hamburg apart`,
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
    location: [53.5753, 10.0153],
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
    city: `Hamburg`,
  },
  {
    id: Math.random(),
    image: `img/apartment-03.jpg`,
    isPremium: true,
    price: 2000,
    name: `Dusseldorf room`,
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
    location: [51.2217, 6.77616],
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
    city: `Dusseldorf`,
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
    location: [54.9924, 73.3686],
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
    city: `Omsk`,
  },
];
