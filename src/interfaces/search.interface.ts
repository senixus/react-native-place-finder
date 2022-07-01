export interface ISearchQuery {
  term: string;
  location: string;
}

export interface ICategoryItem {
  alias: string;
  title: string;
}

export interface ICoordinate {
  latitude: number;
  longitude: number;
}

export interface ISearchItem {
  id: string;
  alias: string;
  name: string;
  image_url: string;
  is_closed: boolean;
  review_count: number;
  categories: ICategoryItem[];
  rating: number;
  coordinates: ICoordinate;
  phone: string;
  display_phone: string;
  distance: number;
}
