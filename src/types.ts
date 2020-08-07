export enum PlaceType {
  APARTMENT = `apartment`,
  ROOM = `room`,
  HOUSE = `house`,
  HOTEL = `hotel`
};

export interface Offer {
  id: number,
  image: string,
  isPremium: boolean,
  isFavorite: boolean,
  price: number,
  name: string,
  type: PlaceType,
  rating: number,
  images: string[],
  insideItems: string[],
  bedrooms: number,
  guests: number,
  description: string,
  host: {
    name: string,
    avatar: string,
    isPro: boolean,
    id: number,
  },
  location: {
    coordinates: [number, number],
    zoom: number,
  },
  city: {
    name: string,
    coordinates: [number, number],
    zoom: number,
  },
};

export interface ReviewInterface {
  avatar: string,
  name: string,
  rating: number,
  id: number,
  date: string,
  comment: string,
};
