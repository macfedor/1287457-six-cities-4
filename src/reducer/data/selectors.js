import NameSpace from '../name-space.js';
import {createSelector} from "reselect";

const NAME_SPACE = NameSpace.DATA;

const getOffers = (state) => {
  return state[NAME_SPACE].places;
};

export const getCities = (state) => {
  return state[NAME_SPACE].cities;
};

export const getFavorites = (state) => {
  return state[NAME_SPACE].favorites;
};

export const getStep = (state) => {
  return state[NAME_SPACE].step;
};

export const getActiveCity = (state) => {
  return state[NAME_SPACE].activeCity;
};

export const getActiveOffer = (state) => {
  return state[NAME_SPACE].activeOffer;
};

export const getHoveredOffer = (state) => {
  return state[NAME_SPACE].hoveredOffer;
};

export const getActiveSortType = (state) => {
  return state[NAME_SPACE].activeSortType;
};

export const getReviewsList = (state) => {
  if (state[NAME_SPACE].reviews) {
    const sortedReviews = state[NAME_SPACE].reviews.slice().sort(function (a, b) {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });

    return sortedReviews;
  }
  return state[NAME_SPACE].reviews;
};

export const getNearbyPlacesList = (state) => {
  return state[NAME_SPACE].nearbyPlaces;
};

export const getCityOffers = createSelector(
    getOffers,
    getActiveCity,
    (offers, city) => {
      return offers.filter((offer) => offer.city.name === city);
    }
);
