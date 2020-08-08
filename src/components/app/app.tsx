import * as React from "react";
import {Switch, Route, Router} from "react-router-dom";
import Main from "../main/main";
import Property from "../property/property";
import SignIn from "../sign-in/sign-in";
import Favorites from "../favorites/favorites";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/data/data";
import {getActiveOffer} from "../../reducer/data/selectors";
import {AppRoute} from "../../consts";
import history from "../../history";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {Operation as UserOperation} from "../../reducer/user/user";
import {Offer} from "../../types";
import PrivateRoute from "../private-route/private-route";

interface Props {
  activeOffer: Offer;
  onCityClick: () => void;
  onCardHover: () => void;
  authorizationStatus: string;
  login: () => void;
}

const App: React.FunctionComponent<Props> = (props: Props) => {

  const {login, activeOffer, onCardHover, onCityClick, authorizationStatus} = props;
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <Main
            onCityClick={onCityClick}
            onCardHover={onCardHover}
            authorizationStatus={authorizationStatus}
          />
        </Route>
        <Route exact path={AppRoute.LOGIN}>
          <SignIn onSubmit={login}/>
        </Route>
        <PrivateRoute exact path={AppRoute.FAVORITES}>
          <Favorites/>
        </PrivateRoute>
        <Route exact path={AppRoute.OFFER}
          render={(renderProps) => (
            <Property
              routerProps={renderProps}
              property={activeOffer}
              onCardHover={onCardHover}
            />
          )}
        />
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  activeOffer: getActiveOffer(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick(evt) {
    dispatch(ActionCreator.changeCity(evt.target.innerText));
  },
  onCardHover(result) {
    dispatch(ActionCreator.hoverCard(result));
  },
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
