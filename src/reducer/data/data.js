import {extend, sortPlaces, getCitiesList} from "../../utils/common";
import {getAdaptedOffers, getAdaptedReviews, getAdaptedOffer} from "./adapter";
import {AuthorizationStatus} from "../user/user";
import {SortType, AppRoute, CardType} from "../../consts";
import NameSpace from '../name-space.js';
import history from "../../history";

const initialState = {
  activeCity: ``,
  activeOffer: null,
  hoveredOffer: null,
  cities: [],
  places: [],
  activeSortType: SortType.POPULAR,
  reviews: null,
  nearbyPlaces: null,
  favorites: [],
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  SORTING: `SORTING`,
  SET_ACTIVE_OFFER: `SET_ACTIVE_OFFER`,
  HOVER_CARD: `HOVER_CARD`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  LOAD_FAVORITES: `LOAD_FAVORITES`,
  RELOAD_OFFERS: `RELOAD_OFFERS`,
  RELOAD_NEARBY_PLACES: `RELOAD_NEARBY_PLACES`,
  GET_OFFER_BY_ID: `GET_OFFER_BY_ID`,
  LOAD_NEARBY_PLACES: `LOAD_NEARBY_PLACES`,
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
  loadFavorites: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        dispatch(ActionCreator.loadFavorites(response.data));
      });
  },
  loadNearbyPlaces: (hotelId) => (dispatch, getState, api) => {
    return api.get(`/hotels/${hotelId}/nearby/`)
      .then((response) => {
        dispatch(ActionCreator.loadNearbyPlaces(response.data));
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
  toggleFavorite: (hotelId, status, type) => (dispatch, getState, api) => {
    if (getState()[NameSpace.USER].authorizationStatus === AuthorizationStatus.NO_AUTH) {
      return history.push(AppRoute.LOGIN);
    }
    return api.post(`/favorite/${hotelId}/${status}`)
      .then(({requestStatus, data}) => {
        const FIX_CONSTANT = 1;
        if (requestStatus === 200 || FIX_CONSTANT) { // почему-то вместо requestStatus стало возвращаться undefined
          switch (type) {
            case CardType.CITY:
              dispatch(ActionCreator.reloadOffers(data));
              break;
            case CardType.NEAR:
              dispatch(ActionCreator.reloadNearbyPlaces(data));
              break;
            case CardType.FAVORITE:
              dispatch(Operation.loadFavorites());
              break;
            default:
              const adaptedData = getAdaptedOffer(data);
              dispatch(ActionCreator.setActiveOffer(adaptedData));
          }
        }
      });
  },
  getOfferById: (offerId) => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.getOfferById(response.data, offerId));
      });
  },
};

const ActionCreator = {

  changeCity: (result) => ({
    type: ActionType.CHANGE_CITY,
    payload: result,
  }),

  setActiveOffer: (result) => ({
    type: ActionType.SET_ACTIVE_OFFER,
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

  loadNearbyPlaces: (result) => ({
    type: ActionType.LOAD_NEARBY_PLACES,
    payload: getAdaptedOffers(result),
  }),

  reloadNearbyPlaces: (result) => ({
    type: ActionType.RELOAD_NEARBY_PLACES,
    payload: result,
  }),

  loadFavorites: (result) => ({
    type: ActionType.LOAD_FAVORITES,
    payload: result,
  }),

  getOfferById: (result, offerId) => ({
    type: ActionType.GET_OFFER_BY_ID,
    payload: {
      places: result,
      currentId: offerId,
    },
  }),

};

let defaultSortedOffers = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        activeCity: action.payload
      });
    case ActionType.SET_ACTIVE_OFFER:
      return extend(state, {
        activeOffer: action.payload,
      });
    case ActionType.SORTING:
      return extend(state, {
        places: sortPlaces(state.places, action.payload),
        activeSortType: action.payload
      });
    case ActionType.HOVER_CARD:
      return extend(state, {
        activeOffer: action.payload
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
    case ActionType.LOAD_NEARBY_PLACES:
      return extend(state, {
        nearbyPlaces: action.payload
      });
    case ActionType.LOAD_FAVORITES:
      return extend(state, {
        favorites: getAdaptedOffers(action.payload)
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
      });

    case ActionType.RELOAD_NEARBY_PLACES:
      return Object.assign({}, state, {
        nearbyPlaces: state.nearbyPlaces.map((content) => {
          if (content.id === action.payload.id) {
            return getAdaptedOffer(action.payload);
          } else {
            return content;
          }
        }),
      });
    case ActionType.GET_OFFER_BY_ID:
      return extend(state, {
        activeOffer: getAdaptedOffer(action.payload.places.find((place) => place.id === Number(action.payload.currentId)))
      });
    default:
      return state;
  }
};

export {reducer, Operation, ActionType, ActionCreator, defaultSortedOffers};
