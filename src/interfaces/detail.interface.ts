import {ISearchItem} from './search.interface';

export interface ILocation {
  display_address: string[];
}

export interface IPhoto {
  photos: string[];
}

export interface IHourItem {
  is_overnight: boolean;
  start: string;
  end: string;
  day: number;
}

export interface IHour {
  open: IHourItem[];
  hours_type: string;
  is_open_now: boolean;
}

export interface IBusinessDetail extends ISearchItem {
  is_claimed: boolean;
  location: ILocation;
  photos: IPhoto;
  hours: IHour[];
}
