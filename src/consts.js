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

export const MAX_NEARBY_OFFERS = 3;

export const MAX_CITIES = 6;

export const MAX_REVIEWS = 10;

export const MAX_REVIEW_LENGTH = 300;

export const MIN_REVIEW_LENGTH = 50;

export const MONTH_NAMES = [
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
