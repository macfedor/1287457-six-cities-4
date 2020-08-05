import * as React from "react";
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
import {Offer} from "../../types";

interface Props {
  loadFavorites: () => void;
  authorizationStatus: string;
  offers: Offer[];
}

class Favorites extends React.PureComponent<Props, {}> {

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

export {Favorites};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
