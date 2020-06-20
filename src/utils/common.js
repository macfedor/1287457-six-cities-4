const RATING_PITCH = 20;

export const capitalize = (string) => string[0].toUpperCase() + string.slice(1);

export const formatRating = (rating) => String(Math.round(rating) * RATING_PITCH) + `%`;
