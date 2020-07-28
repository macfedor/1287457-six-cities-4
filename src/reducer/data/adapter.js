export const getAdaptedOffer = (offer) => {
  return {
    id: offer.id,
    image: offer.preview_image,
    isPremium: offer.is_premium,
    price: offer.price,
    name: offer.title,
    type: offer.type,
    rating: offer.rating,
    images: offer.images,
    insideItems: offer.goods,
    bedrooms: offer.bedrooms,
    guests: offer.max_adults,
    description: offer.description,
    host: {
      name: offer.host.name,
      id: offer.host.id,
      avatar: offer.host.avatar_url,
      isPro: offer.host.is_pro,
    },
    location: {
      coordinates: [offer.location.latitude, offer.location.longitude],
      zoom: offer.location.zoom,
    },
    city: {
      name: offer.city.name,
      coordinates: [offer.city.location.latitude, offer.city.location.longitude],
      zoom: offer.city.location.zoom,
    }
  };
};

export const getAdaptedOffers = (offers) => {
  return offers.map((offer) => getAdaptedOffer(offer));
};

export const getAdaptedReview = (review) => {
  return {
    avatar: review.user.avatar_url,
    name: review.user.name,
    rating: review.rating,
    id: review.id,
    date: review.date,
    comment: review.comment
  };
};

export const getAdaptedReviews = (reviews) => {
  return reviews.map((review) => getAdaptedReview(review));
};
