import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import Property from "../property/property.jsx";
import offers from "../../mocks/offers.js";
import {getCitiesList} from "../../utils/common.js";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import {PlaceType} from "../../consts.js";

const cities = getCitiesList();

const getOffersByCity = (city) => offers.filter((item) => item.city === city);


class App extends PureComponent {

  _renderScreen() {
    const {step, activeCity, activeOffer, onTitleClick, onCityClick} = this.props;
    if (step === `main`) {
      return <Main
        places={getOffersByCity(activeCity)}
        onTitleClick={onTitleClick}
        cities={cities}
        activeCity={activeCity}
        onCityClick={onCityClick}
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
          <Route exact path="/dev-offer">
            <Property
              property={offers[0]}
              onTitleClick={this.props.onTitleClick}
            />;
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  step: state.step,
  activeCity: state.activeCity,
  activeOffer: state.activeOffer,
});

const mapDispatchToProps = (dispatch) => ({
  onTitleClick(result) {
    dispatch(ActionCreator.showCard(result));
  },
  onCityClick(evt) {
    dispatch(ActionCreator.changeCity(evt.target.innerText));
  },
});

App.propTypes = {
  step: PropTypes.string.isRequired,
  activeCity: PropTypes.string,
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
      pro: PropTypes.bool.isRequired,
    }).isRequired,
    location: PropTypes.arrayOf(PropTypes.number).isRequired,
    reviews: PropTypes.arrayOf(PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
      comment: PropTypes.string.isRequired,
    }).isRequired).isRequired,
    city: PropTypes.string.isRequired,
  }),
  onTitleClick: PropTypes.func.isRequired,
  onCityClick: PropTypes.func,
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
