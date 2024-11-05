// import { getOrdersApi } from '@api';
// import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { TOrder } from '@utils-types';
// import { Root } from 'react-dom/client';
// import { RootState } from 'src/services/store';

// type TUserOrdersState = {
//   orders: TOrder[];
//   isLoading: boolean;
//   error: string | null;
// };

// const initialState: TUserOrdersState = {
//   orders: [],
//   isLoading: false,
//   error: null
// };

// export const fetchUserOrders = createAsyncThunk<
//   TOrder[],
//   void,
//   { state: RootState }
// >('userOrders/fetchUserOrders', async (_, { rejectWithValue, getState }) => {
//   const state = getState();
//   const user = state.user.user;
//   if (!user) {
//     return rejectWithValue('not authorized');
//   }

//   try {
//     const orders = await getOrdersApi();
//     return orders.filter((order) => order._id === user._id);
//   } catch (error) {
//     return rejectWithValue((error as Error).message);
//   }
// });

// const userOrdersSlice = createSlice({
//   name: 'userOrders',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUserOrders.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(
//         fetchUserOrders.fulfilled,
//         (state, action: PayloadAction<TOrder[]>) => {
//           state.isLoading = false;
//           state.orders = action.payload;
//         }
//       )
//       .addCase(fetchUserOrders.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       });
//   }
// });

// export default userOrdersSlice.reducer;
// export const userOrdersSelector = (state: RootState) => state.userOrders.orders;
// export const userOrdersLoadingSelector = (state: RootState) =>
//   state.userOrders.isLoading;
// export const userOrdersErrorSelector = (state: RootState) =>
//   state.userOrders.error;
