import * as React from "react";
import {MAX_REVIEW_LENGTH, MIN_REVIEW_LENGTH, WARNING_TIMEOUT} from "../../consts";
import {Operation} from "../../reducer/data/data";
import {connect} from "react-redux";
import {Subtract} from 'utility-types';

interface InjectedProps {
  activeSubmit: boolean;
  onChangeRating: ({rating}: {rating: number}) => void;
  onChangeComment: ({comment}: {comment: string}) => void;
  onSubmit: ({evt}: {evt: EventTarget}) => void;
}

interface Props {
  postReview: ({hotelId, comment, rating, onSuccess, onError}: {hotelId: number; comment: string; rating: number; onSuccess: Function; onError: Function}) => void;
  hotelId: number;
}

interface State {
  rating: number;
  comment: string;
  activeSubmit: boolean;
}

const withCommentForm = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectedProps>;

  class CommentForm extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        rating: null,
        comment: ``,
        activeSubmit: false,
      };

      this.formElement = null;

      this.changeRatingHandler = this.changeRatingHandler.bind(this);
      this.changeCommentHandler = this.changeCommentHandler.bind(this);
      this.submitHandler = this.submitHandler.bind(this);
      this.resetState = this.resetState.bind(this);
      this.onSuccess = this.onSuccess.bind(this);
      this.onError = this.onError.bind(this);

    }

    changeRatingHandler(value) {
      this.setState({rating: value});
    }

    changeCommentHandler(value) {
      this.setState({comment: value});
    }

    onSuccess() {
      this.resetState();
      const inputElements = this.formElement.querySelectorAll(`input, textarea, button`);
      inputElements.forEach((item) => {
        item.disabled = false;
      });
      this.formElement.reset();
    }

    onError() {
      const inputElements = this.formElement.querySelectorAll(`input, textarea, button`);
      inputElements.forEach((item) => {
        item.disabled = false;
      });

      document.body.insertAdjacentHTML(`afterbegin`, `<div class="warning" style="position:fixed;top:0;left:0;width:100%;box-sizing:border-box;padding:10px;background:#ff0000;color:#fff;text-align:center;z-index:100">Something wrong</div>`);

      setTimeout(() => {
        document.querySelector(`.warning`).remove();
      }, WARNING_TIMEOUT);
    }

    submitHandler(evt) {
      const {rating, comment} = this.state;
      const {postReview, hotelId} = this.props;

      postReview(hotelId, rating, comment, this.onSuccess, this.onError);
      this.formElement = evt.target;
      const inputElements = evt.target.querySelectorAll(`input, textarea, button`);
      inputElements.forEach((item) => {
        item.disabled = true;
      });
    }

    componentDidUpdate() {
      if (this.state.rating && (this.state.comment.length >= MIN_REVIEW_LENGTH && this.state.comment.length <= MAX_REVIEW_LENGTH)) {
        this.setState({activeSubmit: true});
      } else {
        this.setState({activeSubmit: false});
      }
    }

    resetState() {
      this.setState({
        rating: null,
        comment: ``,
        activeSubmit: false,
      });
    }

    render() {
      return <Component
        activeSubmit={this.state.activeSubmit}
        onChangeRating={this.changeRatingHandler}
        onChangeComment={this.changeCommentHandler}
        onSubmit={this.submitHandler}
      />;
    }
  }

  const mapDispatchToProps = (dispatch) => ({
    postReview(hotelId, comment, rating, onSuccess, onError) {
      dispatch(Operation.postReview(hotelId, comment, rating, onSuccess, onError));
    },
  });

  return connect(null, mapDispatchToProps)(CommentForm);
};

export default withCommentForm;
