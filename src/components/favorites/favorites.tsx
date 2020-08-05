import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Header from "../header/header";
import FavoritesEmpty from "../favorites-empty/favorites-empty";
import FavoritesList from "../favorites-list/favorites-list";
import {Operation as DataOperation} from "../../reducer/data/data";
import {getFavorites} from "../../reducer/data/selectors";
import {connect} from "react-redux";
import {PlaceType, AppRoute} from "../../consts";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {AuthorizationStatus} from "../../reducer/user/user";
import history from "../../history";

class Favorites extends PureComponent {

  componentDidMount() {
    const {loadFavorites} = this.props;
    loadFavorites();
  }

  componentDidUpdate() {
    if (this.props.authorizationStatus === AuthorizationStatus.NO_AUTH) {
      return history.push(AppRoute.LOGIN);
    }

    return true;
  }

  render() {
    const {offers} = this.props;

    return (
      <div className="page">
        <Header />
        {offers.length > 0 ?
          <FavoritesList
            offers={offers}
          />
          :
          <FavoritesEmpty />
        }
        <footer className="footer container">
          <a className="footer__logo-link" href="main.html">
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
          </a>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  offers: getFavorites(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadFavorites() {
    dispatch(DataOperation.loadFavorites());
  },
});

Favorites.propTypes = {
  loadFavorites: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape({
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
  })),
};

export {Favorites};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
