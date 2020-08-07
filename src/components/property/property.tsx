import * as React from "react";
import {RouteProps} from "react-router-dom";
import {formatRating} from "../../utils/common";
import ReviewsList from "../reviews-list/reviews-list";
import NearbyPlaces from "../nearby-places/nearby-places";
import Map from "../map/map";
import Header from "../header/header";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {connect} from "react-redux";
import {Operation as DataOperation} from "../../reducer/data/data";
import {getReviewsList, getActiveOffer, getNearbyPlacesList} from "../../reducer/data/selectors";
import {Offer, ReviewInterface} from "../../types";

type Props = RouteProps & {
  property: Offer;
  getReviews: (id: number) => void;
  onCardHover: () => void;
  getNearbyPlaces: (id: number) => void;
  getOfferById: (id: number) => void;
  authorizationStatus: string;
  reviews: ReviewInterface[];
  onFavoriteToggle: (id: number, status: number) => void;
  nearbyPlaces: Offer[];
}

class Property extends React.PureComponent<Props, Record<string, unknown>> {

  componentDidMount() {
    const {property, getReviews, getNearbyPlaces} = this.props;

    if (property) {
      getReviews(property.id);
      getNearbyPlaces(property.id);
    }
  }

  componentDidUpdate(prevProps) {
    const {property, getReviews, getNearbyPlaces, reviews, nearbyPlaces} = this.props;

    if (property) {
      if (reviews === null || prevProps.property && property.id !== prevProps.property.id) {
        getReviews(property.id);
      }
      if (nearbyPlaces === null || prevProps.property && property.id !== prevProps.property.id) {
        getNearbyPlaces(property.id);
      }
    }

    if (prevProps.property && property.id !== prevProps.property.id) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const mapPrefix = `property`;
    const {property, authorizationStatus, reviews, onFavoriteToggle, getOfferById, nearbyPlaces} = this.props;
    if (!property && this.props.routerProps.match.params.id) {
      getOfferById(this.props.routerProps.match.params.id);
    }
    if (!property) {
      return null;
    }

    return (
      <div className="page">
        <Header />

        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {property.images.map((image, i) => (
                  <div key={`${i}-${image}`} className="property__image-wrapper">
                    <img className="property__image" src={image} alt="Photo studio" />
                  </div>
                ))}
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {property.isPremium ?
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>
                  : ``}
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {property.name}
                  </h1>
                  <button onClick={() => {
                    onFavoriteToggle(property.id, Number(!property.isFavorite));
                  }} className={`${property.isFavorite ? `property__bookmark-button--active` : ``} property__bookmark-button button`} type="button">
                    <svg className="property__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: formatRating(property.rating)}} />
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{property.rating}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {property.type}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {property.bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {property.guests} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{property.price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {property.insideItems.map((item, i) => (
                      <li key={`${i}-${item}`} className="property__inside-item">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className={property.host.isPro ? `property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper` : `property__avatar-wrapper user__avatar-wrapper`}>
                      <img className="property__avatar user__avatar" src={`/${property.host.avatar}`} width="74" height="74" alt="Host avatar"/>
                    </div>
                    <span className="property__user-name">
                      {property.host.name}
                    </span>
                  </div>
                  <div className="property__description">
                    <p className="property__text">{property.description}</p>
                  </div>
                </div>
                {reviews !== null ?
                  <ReviewsList
                    reviews={reviews}
                    authorizationStatus={authorizationStatus}
                    propertyId={property.id}
                  />
                  : ``}
              </div>
            </div>
            <Map
              places={nearbyPlaces}
              prefix={mapPrefix}
              activePlace={property}
            />
          </section>
          {nearbyPlaces !== null ?
            <div className="container">
              <NearbyPlaces
                places={nearbyPlaces}
              />
            </div>
            : ``}
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  property: getActiveOffer(state),
  reviews: getReviewsList(state),
  nearbyPlaces: getNearbyPlacesList(state),
});

const mapDispatchToProps = (dispatch) => ({
  getReviews(hotelId) {
    dispatch(DataOperation.loadReviews(hotelId));
  },
  getNearbyPlaces(hotelId) {
    dispatch(DataOperation.loadNearbyPlaces(hotelId));
  },
  onFavoriteToggle(id, status) {
    dispatch(DataOperation.toggleFavorite(id, status));
  },
  getOfferById(offerId) {
    dispatch(DataOperation.getOfferById(offerId));
  }
});

export {Property};
export default connect(mapStateToProps, mapDispatchToProps)(Property);
