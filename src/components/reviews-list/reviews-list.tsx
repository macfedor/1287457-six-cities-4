import * as React from "react";
import Review from "../review/review";
import {MAX_REVIEWS} from "../../consts";
import withCommentForm from "../../hocs/with-comment-form/with-comment-form";
import CommentForm from "../comment-form/comment-form";
import {AuthorizationStatus} from "../../reducer/user/user";
import {ReviewInterface} from "../../types";

interface Props {
  reviews: ReviewInterface[];
  authorizationStatus: string;
  propertyId: number;
}

const CommentFormWrapped = withCommentForm(CommentForm);

const ReviewsList: React.FunctionComponent<Props> = (props: Props) => {
  const {reviews, authorizationStatus, propertyId} = props;
  const lastReviews = reviews.slice(0, MAX_REVIEWS);
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

export default ReviewsList;
