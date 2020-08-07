import * as React from "react";
import Header from "../header/header";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import history from "../../history";
import {AppRoute} from "../../consts";
import {AuthorizationStatus} from "../../reducer/user/user";
import {connect} from "react-redux";

interface Props {
  onSubmit: ({login, password}: {login: string; password: string}) => void;
  authorizationStatus: string;
}

class SignIn extends React.PureComponent<Props, Record<string, unknown>> {
  private emailRef: React.RefObject<HTMLInputElement>;
  private passwordRef: React.RefObject<HTMLInputElement>;

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
  }

  handleSubmit(evt) {
    const {onSubmit} = this.props;

    evt.preventDefault();

    onSubmit({
      login: this.emailRef.current.value,
      password: this.passwordRef.current.value,
    });
  }

  componentDidUpdate() {
    if (this.props.authorizationStatus === AuthorizationStatus.AUTH) {
      return history.push(AppRoute.ROOT);
    }

    return true;
  }

  render() {
    return (
      <div className="page page--gray page--login">
        <Header />
        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form className="login__form form" action="#" method="post" onSubmit={this.handleSubmit}>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input className="login__input form__input" type="email" name="email" placeholder="Email" required ref={this.emailRef} />
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input className="login__input form__input" type="password" name="password" placeholder="Password" required ref={this.passwordRef} />
                </div>
                <button className="login__submit form__submit button" type="submit">Sign in</button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>Amsterdam</span>
                </a>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export {SignIn};
export default connect(mapStateToProps)(SignIn);
