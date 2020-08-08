import * as React from "react";
import * as ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import App from "./components/app/app";
import {WARNING_TIMEOUT} from "./consts";
import {Operation as DataOperation, ActionCreator as DataActionCreator} from "./reducer/data/data";
import {Operation as UserOperation, ActionCreator, AuthorizationStatus} from "./reducer/user/user";
import reducer from "./reducer/reducer";
import thunk from "redux-thunk";
import {createAPI} from "./api";

const onUnauthorized = () => {
  store.dispatch(ActionCreator.requiredAuthorization(AuthorizationStatus.NO_AUTH));
};

const onResponseError = (error) => {
  store.dispatch(DataActionCreator.changeError(error));
  setTimeout(() => store.dispatch(DataActionCreator.changeError(``)), WARNING_TIMEOUT);
};

const api = createAPI(onUnauthorized, onResponseError);

const store = createStore(
    reducer,
    applyMiddleware(thunk.withExtraArgument(api))
);

store.dispatch(DataOperation.loadOffers());
store.dispatch(UserOperation.checkAuth());

const init = () => {
  ReactDOM.render(
      <Provider store={store}>
        <App/>
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
