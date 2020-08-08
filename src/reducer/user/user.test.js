import {reducer, ActionCreator, ActionType, Operation, AuthorizationStatus} from "./user";
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api';

const api = createAPI(() => {});

const mockUser = {
  email: `test@test.com`,
  password: `qwerty`,
};

const mockAuthInfo = {
  "avatar_url": `img/1.png`,
  "email": `Oliver.conner@gmail.com`,
  "id": 1,
  "is_pro": false,
  "name": `Oliver.conner`
};

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    userEmail: ``,
  });
});

it(`Reducer should change authorizationStatus by a given value`, () => {
  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.NO_AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  });
});

it(`Reducer should change userEmail by a given value`, () => {
  expect(reducer({
    userEmail: ``,
  }, {
    type: ActionType.SET_USER_EMAIL,
    payload: `test@test.com`,
  })).toEqual({
    userEmail: `test@test.com`,
  });

  expect(reducer({
    userEmail: `test@test.com`,
  }, {
    type: ActionType.SET_USER_EMAIL,
    payload: ``,
  })).toEqual({
    userEmail: ``,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for require authorization returns correct action`, () => {
    expect(ActionCreator.requiredAuthorization(AuthorizationStatus.NO_AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH,
    });

    expect(ActionCreator.requiredAuthorization(AuthorizationStatus.AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    });
  });
  it(`Action creator for set user email returns correct action`, () => {
    expect(ActionCreator.setUserEmail(`test@test.com`)).toEqual({
      type: ActionType.SET_USER_EMAIL,
      payload: `test@test.com`,
    });

    expect(ActionCreator.setUserEmail(``)).toEqual({
      type: ActionType.SET_USER_EMAIL,
      payload: ``,
    });
  });
});

describe(`Operation works correctly`, () => {
  it(`Should make a correct GET-request to /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkLogin = Operation.checkAuth();

    apiMock
        .onGet(`/login`)
        .reply(200, mockUser);

    return checkLogin(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_USER_EMAIL,
          payload: mockUser.email,
        });
      });
  });

  it(`Should make a correct POST-request to /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const login = Operation.login(mockUser);

    apiMock
        .onPost(`/login`)
        .reply(200, mockAuthInfo);

    return login(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_USER_EMAIL,
          payload: mockAuthInfo.email,
        });
      });
  });

});
