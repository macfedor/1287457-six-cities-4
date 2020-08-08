import * as React from "react";
import {MAX_REVIEW_LENGTH, MIN_REVIEW_LENGTH, WARNING_TIMEOUT} from "../../consts";
import {Operation, ActionCreator} from "../../reducer/data/data";
import {connect} from "react-redux";
import {Subtract} from 'utility-types';

interface InjectedProps {
  activeSubmit: boolean;
  onChangeRating: (rating: number) => void;
  onChangeComment: (comment: string) => void;
  onSubmit: (evt: EventTarget) => void;
}

interface Props {
  postReview: (hotelId: number, rating: number, comment: string, onSuccess: Function, onError: Function) => void;
  hotelId: number;
  changeError: (error: string) => void;
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
    formElement: HTMLFormElement;

    constructor(props) {
      super(props);

      this.state = {
        rating: null,
        comment: ``,
        activeSubmit: false,
      };

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
      inputElements.forEach((item: HTMLInputElement) => {
        item.disabled = false;
      });
      this.formElement.reset();
    }

    onError() {
      const {changeError} = this.props;
      const inputElements = this.formElement.querySelectorAll(`input, textarea, button`);
      inputElements.forEach((item: HTMLInputElement) => {
        item.disabled = false;
      });

      changeError(`Something wrong`);
    }

    submitHandler(evt) {
      const {rating, comment} = this.state;
      const {postReview, hotelId} = this.props;

      postReview(hotelId, rating, comment, this.onSuccess, this.onError);
      this.formElement = evt.target as HTMLFormElement;
      const inputElements = (evt.target as HTMLFormElement).querySelectorAll(`input, textarea, button`);
      inputElements.forEach((item: HTMLInputElement) => {
        item.disabled = true;
      });
    }

    componentDidUpdate() {
      console.log(this.state.rating);
      console.log(this.state.comment.length);
      console.log(this.state.comment.length >= MIN_REVIEW_LENGTH && this.state.comment.length <= MAX_REVIEW_LENGTH);
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
    postReview(hotelId, rating, comment, onSuccess, onError) {
      dispatch(Operation.postReview(hotelId, rating, comment, onSuccess, onError));
    },
    changeError(error) {
      dispatch(ActionCreator.changeError(error));
      setTimeout(() => dispatch(ActionCreator.changeError(``)), WARNING_TIMEOUT);
    }
  });

  return connect(null, mapDispatchToProps)(CommentForm);
};

export default withCommentForm;
