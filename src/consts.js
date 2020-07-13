export const PlaceType = {
  APARTMENT: `apartment`,
  ROOM: `room`,
  HOUSE: `house`,
  HOTEL: `hotel`
};

export const CardType = {
  CITY: `city`,
  NEAR: `near`,
};

export const CardClassName = {
  [CardType.CITY]: `cities__place-card`,
  [CardType.NEAR]: `near-places__card`,
};

export const ImageWrapperClassName = {
  [CardType.CITY]: `cities__image-wrapper`,
  [CardType.NEAR]: `near-places__image-wrapper`,
};

export const maxNearbyOffers = 3;

export const maxCities = 6;

export const maxReviews = 10;

export const monthNames = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `Octoder`,
  `November`,
  `December`,
];

export const SortType = {
  POPULAR: `Popular`,
  PRICE_UP: `Price: low to high`,
  PRICE_DOWN: `Price: high to low`,
  RATING: `Top rated first`
};
