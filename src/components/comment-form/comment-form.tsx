import * as React from "react";
import PropTypes from "prop-types";
import {MAX_REVIEW_LENGTH, MIN_REVIEW_LENGTH} from "../../consts";

const CommentForm = ({activeSubmit, onChangeRating, onChangeComment, onSubmit}) => {
  return <form className="reviews__form form" action="#" method="post" onSubmit={(evt) => {
    evt.preventDefault();
    onSubmit(evt);
  }}>
    <label className="reviews__label form__label" htmlFor="review">Your review</label>
    <div className="reviews__rating-form form__rating" onChange={(evt) => onChangeRating(evt.target.value)}>
      <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" required />
      <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>

      <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" required />
      <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>

      <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" required />
      <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>

      <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" required />
      <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>

      <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" required />
      <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </div>
    <textarea onChange={(evt) => onChangeComment(evt.target.value)} maxLength={MAX_REVIEW_LENGTH} minLength={MIN_REVIEW_LENGTH} className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
    <div className="reviews__button-wrapper">
      <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{MIN_REVIEW_LENGTH} characters</b>.
      </p>
      <button className="reviews__submit form__submit button" type="submit" disabled={activeSubmit ? false : true}>Submit</button>
    </div>
  </form>;
};

CommentForm.propTypes = {
  activeSubmit: PropTypes.bool.isRequired,
  onChangeRating: PropTypes.func.isRequired,
  onChangeComment: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CommentForm;
