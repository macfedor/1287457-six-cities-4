import * as React from "react";
import {Switch, Route, Router} from "react-router-dom";
import Main from "../main/main";
import Property from "../property/property";
import SignIn from "../sign-in/sign-in";
import Favorites from "../favorites/favorites";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/data/data";
import {getActiveOffer, getStep} from "../../reducer/data/selectors";
import {AppRoute} from "../../consts";
import history from "../../history";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {Operation as UserOperation} from "../../reducer/user/user";
import {Offer} from "../../types";

interface Props {
  activeOffer: Offer;
  onCityClick: () => void;
  onCardHover: () => void;
  authorizationStatus: string;
  login: () => void;
}

class App extends React.PureComponent<Props, {}> {

  render() {
    const {login, activeOffer, onCardHover, onCityClick, authorizationStatus} = this.props;
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
          <Route exact path={AppRoute.FAVORITES}>
            <Favorites />
          </Route>
          <Route exact path={AppRoute.OFFER}
            render={(props) => (
              <Property
                routerProps={props}
                property={activeOffer}
                onCardHover={onCardHover}
              />
            )}
          />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  step: getStep(state),
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
