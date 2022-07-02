import {createSlice, Dispatch, Slice} from '@reduxjs/toolkit';

// API
import yelp from '../api';

// Interface
import {IBusinessDetail} from '../interfaces/detail.interface';
import {IReview} from '../interfaces/review.interface';
import {ISearchItem, ISearchQuery} from '../interfaces/search.interface';

interface ISearchState {
  searchItems: ISearchItem[];
  reviews: IReview;
  detail: IBusinessDetail;
}

export interface ISearchSelector {
  search: ISearchState;
}

export const searchSlice: Slice = createSlice({
  name: 'search',
  initialState: <ISearchState>{
    searchItems: [],
    reviews: {} as IReview,
    detail: {} as IBusinessDetail,
  },
  reducers: {
    setSearchItem: (state: ISearchState, action) => {
      state.searchItems = action.payload;
    },
    setReviews: (state: ISearchState, action) => {
      state.reviews = action.payload;
    },
    setBusinessDetail: (state: ISearchState, action) => {
      state.detail = action.payload;
    },
  },
});

export const searchQuery =
  (query: ISearchQuery) => async (dispatch: Dispatch) => {
    try {
      const qs = new URLSearchParams({...query}).toString();

      let endpoint = `/businesses/search?${qs}`;

      const response = await yelp.get(endpoint);

      dispatch(setSearchItem(response.data.businesses));
    } catch (error) {
      if (process.env.NODE_ENV === 'development') console.log(error);
    }
  };

export const getBusinessDetail =
  (businessId: string) => async (dispatch: Dispatch) => {
    try {
      const response = await yelp.get(`/businesses/${businessId}`);
      dispatch(setBusinessDetail(response.data));
    } catch (error) {
      if (process.env.NODE_ENV === 'development') console.log(error);
    }
  };

export const getReviewsByBusinessId =
  (businessId: string) => async (dispatch: Dispatch) => {
    try {
      const response = await yelp.get(`/businesses/${businessId}/reviews`);
      dispatch(setReviews(response.data));
    } catch (error) {
      if (process.env.NODE_ENV === 'development') console.log(error);
    }
  };

export const {setSearchItem, setReviews, setBusinessDetail} =
  searchSlice.actions;

export default searchSlice.reducer;
