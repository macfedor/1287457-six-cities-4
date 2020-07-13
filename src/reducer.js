import {getCitiesList, extend} from "./utils/common.js";

const citiesList = getCitiesList();

const initialState = {
  step: `main`,
  activeCity: citiesList[0],
  activeOffer: null,
  cities: citiesList,
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  SHOW_CARD: `SHOW_CARD`,
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
    default:
      return state;
  }
};

export {reducer, ActionType, ActionCreator};
