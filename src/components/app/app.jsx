import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, Router} from "react-router-dom";
import Main from "../main/main.jsx";
import Property from "../property/property.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/data/data.js";
import {getActiveOffer, getStep} from "../../reducer/data/selectors.js";
import {PlaceType, AppRoute} from "../../consts.js";
import history from "../../history.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";

class App extends PureComponent {

  _renderScreen() {
    const {onTitleClick, onCityClick, onCardHover, authorizationStatus} = this.props;
    return <Main
      onCityClick={onCityClick}
      onCardHover={onCardHover}
      authorizationStatus={authorizationStatus}
    />;
  }

  render() {
    const {login, activeOffer, onCardHover} = this.props;
    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            {this._renderScreen()}
          </Route>
          <Route exact path={AppRoute.LOGIN}>
            <SignIn onSubmit={login}/>
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
