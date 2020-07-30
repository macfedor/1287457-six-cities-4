import {extend, sortPlaces, getCitiesList} from "../../utils/common.js";
import {getAdaptedOffers, getAdaptedReviews, getAdaptedOffer} from "./adapter.js";
import {AuthorizationStatus} from "../user/user.js";
import {SortType, AppRoute} from "../../consts.js";
import NameSpace from '../name-space.js';
import history from "../../history.js";

const initialState = {
  step: `main`,
  activeCity: ``,
  activeOffer: null,
  hoveredOffer: null,
  cities: [],
  places: [],
  activeSortType: SortType.POPULAR,
  reviews: [],
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  SHOW_CARD: `SHOW_CARD`,
  SORTING: `SORTING`,
  HOVER_CARD: `HOVER_CARD`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  SHOW_MAIN: `SHOW_MAIN`,
  SHOW_SIGN_IN: `SHOW_SIGN_IN`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  RELOAD_OFFERS: `RELOAD_OFFERS`,
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadOffers(response.data));
      });
  },
  loadReviews: (hotelId) => (dispatch, getState, api) => {
    return api.get(`/comments/${hotelId}`)
      .then((response) => {
        dispatch(ActionCreator.loadReviews(response.data));
      });
  },
  postReview: (hotelId, reviewRating, reviewComment, onSuccess, onError) => (dispatch, getState, api) => {
    return api.post(`/comments/${hotelId}`, {
      rating: reviewRating,
      comment: reviewComment,
    })
    .then(({data}) => {
      dispatch(ActionCreator.loadReviews(data));
      onSuccess();
    })
    .catch((err) => {
      onError();
      throw err;
    });
  },
  toggleFavorite: (hotelId, status) => (dispatch, getState, api) => {
    if (getState()[NameSpace.USER].authorizationStatus === AuthorizationStatus.NO_AUTH) {
      return history.push(AppRoute.LOGIN);
    }
    return api.post(`/favorite/${hotelId}/${status}`)
      .then(({requestStatus, data}) => {
        if (requestStatus === 200) {
          dispatch(ActionCreator.reloadOffers(data));
        }
      });
  },
};

const ActionCreator = {
  showCard: (result) => ({
    type: ActionType.SHOW_CARD,
    payload: {
      step: `property`,
      activeOffer: result
    }
  }),

  showMain: () => ({
    type: ActionType.SHOW_MAIN,
    payload: {
      step: `main`
    }
  }),

  changeCity: (result) => ({
    type: ActionType.CHANGE_CITY,
    payload: result,
  }),

  changeSortType: (result) => ({
    type: ActionType.SORTING,
    payload: result,
  }),

  hoverCard: (result) => ({
    type: ActionType.HOVER_CARD,
    payload: result,
  }),

  loadOffers: (result) => ({
    type: ActionType.LOAD_OFFERS,
    payload: {
      places: getAdaptedOffers(result),
      cities: getCitiesList(result),
    },
  }),

  reloadOffers: (result) => ({
    type: ActionType.RELOAD_OFFERS,
    payload: result,
  }),

  loadReviews: (result) => ({
    type: ActionType.LOAD_REVIEWS,
    payload: getAdaptedReviews(result),
  }),


};

let defaultSortedOffers = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        activeCity: action.payload
      });
    case ActionType.SHOW_CARD:
      return extend(state, {
        step: action.payload.step,
        activeOffer: action.payload.activeOffer,
      });
    case ActionType.SHOW_SIGN_IN:
      return extend(state, {
        step: action.payload.step,
      });
    case ActionType.SHOW_MAIN:
      return extend(state, {
        step: action.payload.step,
      });
    case ActionType.SORTING:
      return extend(state, {
        places: sortPlaces(state.places, action.payload),
        activeSortType: action.payload
      });
    case ActionType.HOVER_CARD:
      return extend(state, {
        hoveredOffer: action.payload
      });
    case ActionType.LOAD_OFFERS:
      defaultSortedOffers = action.payload.places;
      return extend(state, {
        places: action.payload.places,
        cities: action.payload.cities,
        activeCity: action.payload.cities[0],
      });
    case ActionType.LOAD_REVIEWS:
      return extend(state, {
        reviews: action.payload
      });
    case ActionType.RELOAD_OFFERS:
      return Object.assign({}, state, {
        places: state.places.map((content) => {
          if (content.id === action.payload.id) {
            return getAdaptedOffer(action.payload);
          } else {
            return content;
          }
        }),
        activeOffer: getAdaptedOffer(action.payload)
      });
    default:
      return state;
  }
};

export {reducer, Operation, ActionType, ActionCreator, defaultSortedOffers};
