import { getFeedsApi, getOrdersApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TOrder } from '@utils-types';

type TFeedState = {
  orders: TOrder[];
  selectedOrder: TOrder | null;
  profileOrders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | undefined;
};

const initialState: TFeedState = {
  orders: [],
  selectedOrder: null,
  profileOrders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: ''
};

export const fetchFeed = createAsyncThunk('feed/fetchFeed', async () =>
  getFeedsApi()
);

export const fetchUserOrders = createAsyncThunk(
  'userOrders/fetchUserOrders',
  async () => {
    const orders = await getOrdersApi();
    return orders;
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setSelectedOrder: (state, action: PayloadAction<string>) => {
      const order = state.orders.find((order) => order._id === action.payload);
      state.selectedOrder = order || null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profileOrders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
  selectors: {
    profileOrdersSelector: (state) => state.profileOrders
  }
});

export default feedSlice.reducer;
export const feedActions = feedSlice.actions;
export const { setSelectedOrder } = feedSlice.actions;
