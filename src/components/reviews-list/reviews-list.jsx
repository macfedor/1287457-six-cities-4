import React from "react";
import PropTypes from "prop-types";
import Review from "../review/review.jsx";
import {maxReviews} from "../../consts.js";

const ReviewsList = ({reviews}) => {
  const sortedReviews = reviews.slice().sort(function (a, b) {
    return b.date.getTime() - a.date.getTime();
  }).slice(0, maxReviews);
  return <section className="property__reviews reviews">
    <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
    <ul className="reviews__list">
      {sortedReviews.map((review, i) => (
        <Review key={i} // просто i т.к. моки. как появятся реальные данные посмотрю, к чему можно привязаться
          review={review}
        />
      ))}
    </ul>
  </section>;
};

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    comment: PropTypes.string.isRequired,
  })).isRequired,
};

export default ReviewsList;
