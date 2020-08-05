import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, Router} from "react-router-dom";
import Main from "../main/main";
import Property from "../property/property";
import SignIn from "../sign-in/sign-in";
import Favorites from "../favorites/favorites";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/data/data";
import {getActiveOffer, getStep} from "../../reducer/data/selectors";
import {PlaceType, AppRoute} from "../../consts";
import history from "../../history";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {Operation as UserOperation} from "../../reducer/user/user";

class App extends PureComponent {

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

App.propTypes = {
  step: PropTypes.string.isRequired,
  activeOffer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf([PlaceType.APARTMENT, PlaceType.ROOM, PlaceType.HOUSE, PlaceType.HOTEL]).isRequired,
    rating: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    insideItems: PropTypes.arrayOf(PropTypes.string).isRequired,
    bedrooms: PropTypes.number.isRequired,
    guests: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    host: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      isPro: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
    reviews: PropTypes.array,
    city: PropTypes.shape({
      name: PropTypes.string.isRequired,
      coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
  }),
  onCityClick: PropTypes.func,
  onCardHover: PropTypes.func,
  authorizationStatus: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
