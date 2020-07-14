import {monthNames, SortType} from "../consts.js";

const RATING_PITCH = 20;

const formatDozens = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const capitalize = (string) => string[0].toUpperCase() + string.slice(1);

export const formatRating = (rating) => String(Math.round(rating) * RATING_PITCH) + `%`;

export const formatDate = (date) => monthNames[date.getMonth()] + ` ` + date.getFullYear();

export const formatDateShort = (date) => date.getFullYear() + `-` + formatDozens(date.getMonth()) + `-` + formatDozens(date.getDate());

export const compareDates = (dateFirst, dateSecond) => {
  const firstDate = new Date(dateFirst);
  const secondDate = new Date(dateSecond);
  return firstDate.getTime() - secondDate.getTime();
};

export const getNameById = (id, array) => {
  return array.find((item) => item.id === id).name;
};

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const sortPlaces = (array, sortType) => {
  switch (sortType) {
    case SortType.TO_HIGH:
      return array.slice().sort((a, b) => a.price - b.price);
    case SortType.TO_LOW:
      return array.slice().sort((a, b) => b.price - a.price);
    case SortType.TOP_RATED:
      return array.slice().sort((a, b) => b.rating - a.rating);
    default:
      return array;
  }
};
