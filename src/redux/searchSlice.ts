import {createSlice, Dispatch, Slice} from '@reduxjs/toolkit';

// API
import yelp from '../api';

interface ISearchState {
  searchItems: any[];
}

export interface ISearchSelector {
  search: ISearchState;
}

export const searchSlice: Slice = createSlice({
  name: 'search',
  initialState: <ISearchState>{
    searchItems: [],
  },
  reducers: {
    setSearchItem: (state: ISearchState, action) => {
      state.searchItems = action.payload;
    },
  },
});

export const search = (query: any) => async (dispatch: Dispatch) => {
  try {
    console.log(query);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.log(error);
  }
};

export default searchSlice.reducer;
