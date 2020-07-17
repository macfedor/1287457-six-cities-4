import {extend, sortPlaces, getCitiesList} from "./utils/common.js";
import offers from "./mocks/offers.js";
import {SortType} from "./consts.js";

const citiesList = getCitiesList(offers);

const initialState = {
  step: `main`,
  activeCity: citiesList[0],
  activeOffer: null,
  hoveredOffer: null,
  cities: citiesList,
  places: offers,
  activeSortType: SortType.POPULAR
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  SHOW_CARD: `SHOW_CARD`,
  SORTING: `SORTING`,
  HOVER_CARD: `HOVER_CARD`,
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

};

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
    default:
      return state;
  }
};

export {reducer, ActionType, ActionCreator};
