import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import ingredientSlice from '../storage/slices/ingredients';
import constructorSlice from '../storage/slices/constructor';
import feedSlice from '../storage/slices/feed';
import userSlice from '../storage/slices/profile';

export const rootReducer = {
  ingredients: ingredientSlice,
  burgerConstructor: constructorSlice,
  feed: feedSlice,
  user: userSlice
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
