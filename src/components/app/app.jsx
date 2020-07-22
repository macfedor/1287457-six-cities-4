import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import Property from "../property/property.jsx";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/data/data.js";
import {getActiveOffer, getStep} from "../../reducer/data/selectors.js";
import {PlaceType} from "../../consts.js";

class App extends PureComponent {

  _renderScreen() {
    const {step, activeOffer, onTitleClick, onCityClick, onCardHover} = this.props;
    if (step === `main`) {
      return <Main
        onTitleClick={onTitleClick}
        onCityClick={onCityClick}
        onCardHover={onCardHover}
      />;
    }

    if (step === `property`) {
      return <Property
        property={activeOffer}
        onTitleClick={onTitleClick}
      />;
    }

    return null;
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderScreen()}
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  step: getStep(state),
  activeOffer: getActiveOffer(state),
});

const mapDispatchToProps = (dispatch) => ({
  onTitleClick(result) {
    dispatch(ActionCreator.showCard(result));
  },
  onCityClick(evt) {
    dispatch(ActionCreator.changeCity(evt.target.innerText));
  },
  onCardHover(result) {
    dispatch(ActionCreator.hoverCard(result));
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
  onTitleClick: PropTypes.func.isRequired,
  onCityClick: PropTypes.func,
  onCardHover: PropTypes.func,
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
