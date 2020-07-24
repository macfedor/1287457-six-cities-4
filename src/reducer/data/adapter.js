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
    reviews: [], // временно, чтоб не падало пока. потом уберу совсем - отзывы приезжают отдельно
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
