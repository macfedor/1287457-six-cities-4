import {extend} from "../../utils/common";
import history from "../../history";
import {AppRoute} from "../../consts";

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  userEmail: ``,
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SET_USER_EMAIL: `SET_USER_EMAIL`,
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(ActionCreator.requiredAuthorization(AuthorizationStatus.AUTH));
          dispatch(ActionCreator.setUserEmail(response.data.email));
        }
      })
      .catch((err) => {
        throw err;
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.email,
      password: authData.password,
    })
    .then((response) => {
      dispatch(ActionCreator.requiredAuthorization(AuthorizationStatus.AUTH));
      dispatch(ActionCreator.setUserEmail(response.data.email));
    })
    .then(() => {
      return history.push(AppRoute.ROOT);
    })
    .catch((err) => {
      throw err;
    });
  },
};

const ActionCreator = {
  requiredAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status
  }),
  setUserEmail: (result) => ({
    type: ActionType.SET_USER_EMAIL,
    payload: result
  }),

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.payload
      });
    case ActionType.SET_USER_EMAIL:
      return extend(state, {
        userEmail: action.payload
      });
    default:
      return state;
  }
};

export {reducer, Operation, ActionType, ActionCreator, AuthorizationStatus};
