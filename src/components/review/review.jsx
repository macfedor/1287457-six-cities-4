import React from "react";
import PropTypes from "prop-types";
import {formatRating} from "../../utils/common.js";

const Review = ({review}) => {

  return <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img className="reviews__avatar user__avatar" src={review.avatar} width="54" height="54" alt="Reviews avatar" />
      </div>
      <span className="reviews__user-name">
        {review.name}
      </span>
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <div className="reviews__stars rating__stars">
          <span style={{width: formatRating(review.rating)}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <p className="reviews__text">
        {review.comment}
      </p>
      <time className="reviews__time" dateTime="2019-04-24">{review.date}</time>
    </div>
  </li>;
};

// значение в dateTime пропущено не случайно - не хочется писать функцию форматирования времени наугад, не зная, что в итоге будет приходить в дату. Как появятся реальные данные внесу корректировки тут

Review.propTypes = {
  review: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
  }).isRequired,
};

export default Review;
