import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import ingredientSliceReducer from '../slices/ingredientSlice';
import constructorSliceReducer from '../slices/constructorSlice';
import orderSliceReducer from '../slices/orderSlice';
import feedSliceReducer from '../slices/feedSlice';
import userSliceReducer from '../slices/userSlice';

const rootReducer = combineReducers({
  ingredients: ingredientSliceReducer,
  constructors: constructorSliceReducer,
  orders: orderSliceReducer,
  feeds: feedSliceReducer,
  users: userSliceReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
