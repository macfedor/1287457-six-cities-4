import React from "react";
import PropTypes from "prop-types";
import {getAuthorizationStatus, getUserEmail} from "../../reducer/user/selectors.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {ActionCreator} from "../../reducer/data/data.js";
import {connect} from "react-redux";

const Header = ({authorizationStatus, userEmail, onSignInClick}) => {
  return <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <a className="header__logo-link header__logo-link--active">
            <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
          </a>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item user">
              <a className="header__nav-link header__nav-link--profile" href="#">
                <div className="header__avatar-wrapper user__avatar-wrapper">
                </div>
                {authorizationStatus === AuthorizationStatus.NO_AUTH ?
                  <span onClick={onSignInClick} className="header__login">Sign in</span>
                  :
                  <span className="header__user-name user__name">{userEmail}</span>
                }
              </a>
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

const mapDispatchToProps = (dispatch) => ({
  onSignInClick() {
    dispatch(ActionCreator.showSignIn());
  },
});

Header.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  onSignInClick: PropTypes.func.isRequired,
};

export {Header};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
