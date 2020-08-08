import * as React from "react";
import {getAuthorizationStatus, getUserEmail} from "../../reducer/user/selectors";
import {getError} from "../../reducer/data/selectors";
import {AuthorizationStatus} from "../../reducer/user/user";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {AppRoute} from "../../consts";

interface Props {
  authorizationStatus: string;
  userEmail: string;
  error: string;
}

const Header: React.FunctionComponent<Props> = (props: Props) => {
  const {authorizationStatus, userEmail, error} = props;
  return <header className="header">
    {error ? <div className="error__message">{error}</div> : ``}
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
  error: getError(state),
});

export {Header};
export default connect(mapStateToProps)(Header);
