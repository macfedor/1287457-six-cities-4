import * as React from "react";
import PropTypes from "prop-types";
import {getAuthorizationStatus, getUserEmail} from "../../reducer/user/selectors";
import {AuthorizationStatus} from "../../reducer/user/user";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {AppRoute} from "../../consts";

const Header = ({authorizationStatus, userEmail}) => {
  return <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <a className="header__logo-link header__logo-link--active">
            <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41"/>
          </a>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item user">
              {authorizationStatus === AuthorizationStatus.NO_AUTH ?
                <Link to={AppRoute.LOGIN} className="header__nav-link header__nav-link--profile" href="#">
                  <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                  <span className="header__login">Sign in</span>
                </Link>
                :
                <Link to={AppRoute.FAVORITES} className="header__nav-link header__nav-link--profile" href="#">
                  <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                  <span className="header__user-name user__name">{userEmail}</span>
                </Link>
              }
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>;
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  userEmail: getUserEmail(state),
});

Header.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
};

export {Header};
export default connect(mapStateToProps)(Header);
