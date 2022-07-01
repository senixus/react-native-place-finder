export interface IReviewUser {
  id: string;
  profile_url: string;
  image_url: string;
  name: string;
}

export interface IReviewItem {
  id: string;
  url: string;
  text: string;
  rating: number;
  time_created: string;
  user: IReviewUser;
}

export interface IReview {
  reviews: IReviewItem[];
  total: number;
}
