import { getFeedsApi } from '../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export interface FeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  error?: string | null;
}

export const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: null
};

export const fetchFeeds = createAsyncThunk(
  'feed/getAll',
  async () => await getFeedsApi()
);

const feedSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.orders = [];
        state.error = action.error?.message;
      });
  },
  selectors: {
    selectOrders: (state) => state.orders,
    selectTotal: (state) => state.total,
    selectTotalToday: (state) => state.totalToday
  }
});

export const { selectOrders, selectTotal, selectTotalToday } =
  feedSlice.selectors;

export default feedSlice.reducer;
