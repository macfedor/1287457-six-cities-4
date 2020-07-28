import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {maxReviewLength, minReviewLength, WARNING_TIMEOUT} from "../../consts.js";
import {Operation} from "../../reducer/data/data.js";
import {connect} from "react-redux";

const withCommentForm = (Component) => {
  class CommentForm extends PureComponent {
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
      if (this.state.rating && (this.state.comment.length >= minReviewLength && this.state.comment.length <= maxReviewLength)) {
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

  CommentForm.propTypes = {
    postReview: PropTypes.func.isRequired,
    hotelId: PropTypes.number.isRequired,
  };

  return connect(null, mapDispatchToProps)(CommentForm);
};

export default withCommentForm;
