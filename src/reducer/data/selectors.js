import NameSpace from '../name-space.js';
import {createSelector} from "reselect";

const NAME_SPACE = NameSpace.DATA;

const getOffers = (state) => {
  return state[NAME_SPACE].places;
};

export const getCities = (state) => {
  return state[NAME_SPACE].cities;
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

export const getCityOffers = createSelector(
    getOffers,
    getActiveCity,
    (offers, city) => {
      return offers.filter((offer) => offer.city.name === city);
    }
);
