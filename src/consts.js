export const PlaceType = {
  APARTMENT: `apartment`,
  ROOM: `room`,
  HOUSE: `house`,
  HOTEL: `hotel`
};

export const CardType = {
  CITY: `city`,
  NEAR: `near`,
  FAVORITE: `favorite`,
};

export const SortType = {
  POPULAR: `Popular`,
  TO_HIGH: `Price: low to high`,
  TO_LOW: `Price: high to low`,
  TOP_RATED: `Top rated first`,
};

export const CardClassName = {
  [CardType.CITY]: `cities__place-card`,
  [CardType.NEAR]: `near-places__card`,
  [CardType.FAVORITE]: `favorites__card`,
};

export const ImageWrapperClassName = {
  [CardType.CITY]: `cities__image-wrapper`,
  [CardType.NEAR]: `near-places__image-wrapper`,
  [CardType.FAVORITE]: `favorites__image-wrapper`,
};

export const maxNearbyOffers = 3;

export const maxCities = 6;

export const maxReviews = 10;

export const maxReviewLength = 300;

export const minReviewLength = 50;

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

export const WARNING_TIMEOUT = 3000;

export const AppRoute = {
  ROOT: `/`,
  LOGIN: `/login`,
  FAVORITES: `/favorites`,
  OFFER: `/offer/:id`,
  OFFER_LINK: `/offer/`,
};
