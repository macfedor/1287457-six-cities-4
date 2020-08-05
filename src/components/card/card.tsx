import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {capitalize, formatRating} from "../../utils/common";
import {PlaceType, CardClassName, ImageWrapperClassName, AppRoute} from "../../consts";
import {Operation, ActionCreator} from "../../reducer/data/data";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class Card extends PureComponent {

  render() {
    const {card, cardType, onMouseEnter, onMouseLeave, onTitleClick, onFavoriteToggle} = this.props;
    const placeTypeName = capitalize(card.type);

    return (
      <article onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={`${CardClassName[cardType]} place-card`}>
        {card.isPremium ?
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
          : ``}
        <div className={`${ImageWrapperClassName[cardType]} place-card__image-wrapper`}>
          <a href="#">
            <img className="place-card__image" src={card.image} width="260" height="200" alt="Place image"/>
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{card.price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button onClick={() => {
              onFavoriteToggle(card.id, Number(!card.isFavorite), cardType);
            }} className={`${card.isFavorite ? `place-card__bookmark-button--active` : ``} place-card__bookmark-button button`} type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: formatRating(card.rating)}} />
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <Link to={`${AppRoute.OFFER_LINK}${card.id}`} onClick={ () => {
              onTitleClick(card);
            }} >{card.name}</Link>
          </h2>
          <p className="place-card__type">{placeTypeName}</p>
        </div>
      </article>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onFavoriteToggle(id, status, cardType) {
    dispatch(Operation.toggleFavorite(id, status, cardType));
  },
  onTitleClick(offer) {
    dispatch(ActionCreator.setActiveOffer(offer));
  },
});

Card.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired,
    isFavorite: PropTypes.bool.isRequired,
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
  cardType: PropTypes.string.isRequired,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onTitleClick: PropTypes.func.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
};

export {Card};
export default connect(null, mapDispatchToProps)(Card);
