import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {formatRating} from "../../utils/common.js";
import {PlaceType} from "../../consts.js";
import ReviewsList from "../reviews-list/reviews-list.jsx";
import NearbyPlaces from "../nearby-places/nearby-places.jsx";
import Map from "../map/map.jsx";
import offers from "../../mocks/offers.js";
import Header from "../header/header.jsx";

class Property extends PureComponent {

  render() {
    const mapPrefix = `property`;
    const {property, onTitleClick} = this.props;
    const nearbyOffers = offers.filter((item) => item.id !== property.id && item.city === property.city);

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
                  <button className="property__bookmark-button button" type="button">
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
                      <img className="property__avatar user__avatar" src={property.host.avatar} width="74" height="74" alt="Host avatar"/>
                    </div>
                    <span className="property__user-name">
                      {property.host.name}
                    </span>
                  </div>
                  <div className="property__description">
                    <p className="property__text">{property.description}</p>
                  </div>
                </div>
                <ReviewsList
                  reviews={property.reviews}
                />
              </div>
            </div>
            <Map
              places={nearbyOffers}
              prefix={mapPrefix}
              activePlace={{coordinates: property.location.coordinates, zoom: property.location.zoom}}
            />
          </section>
          {nearbyOffers.length ?
            <div className="container">
              <NearbyPlaces
                places={nearbyOffers}
                onTitleClick={onTitleClick}
              />
            </div>
            : ``}
        </main>
      </div>
    );
  }
}

Property.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf([PlaceType.APARTMENT, PlaceType.ROOM, PlaceType.HOUSE, PlaceType.HOTEL]).isRequired,
    rating: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    insideItems: PropTypes.arrayOf(PropTypes.string).isRequired,
    bedrooms: PropTypes.number.isRequired,
    guests: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    host: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      isPro: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
    reviews: PropTypes.array,
    city: PropTypes.shape({
      name: PropTypes.string.isRequired,
      coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  onTitleClick: PropTypes.func.isRequired,
};

export default Property;
