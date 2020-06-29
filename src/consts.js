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
