import {monthNames} from "../consts.js";

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
