import React from "react";
import PropTypes from "prop-types";
import Review from "../review/review.jsx";

const ReviewsList = ({reviews}) => {

  return <section className="property__reviews reviews">
    <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
    <ul className="reviews__list">
      {reviews.map((review, i) => (
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
    date: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
  })).isRequired,
};

export default ReviewsList;
