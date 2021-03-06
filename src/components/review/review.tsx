import * as React from "react";
import {formatRating, formatDate, formatDateShort} from "../../utils/common";
import {ReviewInterface} from "../../types";

interface Props {
  review: ReviewInterface;
}

const Review: React.FunctionComponent<Props> = (props: Props) => {
  const {review} = props;
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
      <time className="reviews__time" dateTime={formatDateShort(review.date)}>{formatDate(review.date)}</time>
    </div>
  </li>;
};

export default Review;
