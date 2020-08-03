import React from "react";
import PropTypes from "prop-types";
import Review from "../review/review.jsx";
import {maxReviews} from "../../consts.js";
import withCommentForm from "../../hocs/with-comment-form/with-comment-form.js";
import CommentForm from "../comment-form/comment-form.jsx";
import {AuthorizationStatus} from "../../reducer/user/user.js";

const CommentFormWrapped = withCommentForm(CommentForm);

const ReviewsList = ({reviews, authorizationStatus, propertyId}) => {
  const lastReviews = reviews.slice(0, maxReviews);
  return <section className="property__reviews reviews">
    <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
    <ul className="reviews__list">
      {lastReviews.map((review) => (
        <Review key={review.id}
          review={review}
        />
      ))}
    </ul>
    {authorizationStatus === AuthorizationStatus.AUTH ? <CommentFormWrapped hotelId={propertyId}/> : ``}
  </section>;
};

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
  })),
  authorizationStatus: PropTypes.string.isRequired,
  propertyId: PropTypes.number.isRequired,
};

export default ReviewsList;
