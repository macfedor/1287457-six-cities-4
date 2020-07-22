import {extend, sortPlaces, getCitiesList} from "../../utils/common.js";
import {getAdaptedOffers} from "./adapter.js";
import {SortType} from "../../consts.js";

const initialState = {
  step: `main`,
  activeCity: ``,
  activeOffer: null,
  hoveredOffer: null,
  cities: [],
  places: [],
  activeSortType: SortType.POPULAR
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  SHOW_CARD: `SHOW_CARD`,
  SORTING: `SORTING`,
  HOVER_CARD: `HOVER_CARD`,
  LOAD_OFFERS: `LOAD_OFFERS`,
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadOffers(response.data));
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
    default:
      return state;
  }
};

export {reducer, Operation, ActionType, ActionCreator, defaultSortedOffers};
