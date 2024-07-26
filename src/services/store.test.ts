import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './store';

describe('проверка инициализации rootReducer', () => {
  const store = configureStore({ reducer: { rootReducer } });

  it('проверка инициализации конструктора', () => {
    expect(store.getState().rootReducer.constructors).toEqual({
      bun: null,
      ingredients: []
    });
  });
  it('проверка инициализации ингредиентов', () => {
    expect(store.getState().rootReducer.ingredients).toEqual({
      error: null,
      ingredients: [],
      isLoading: false
    });
  });
  it('проверка инициализации ленты заказов', () => {
    expect(store.getState().rootReducer.feeds).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      error: null
    });
  });
  it('проверка инициализации истории заказов', () => {
    expect(store.getState().rootReducer.orders).toEqual({
      orders: [],
      orderRequest: false,
      orderModalData: null
    });
  });
  it('проверка инициализации пользователей', () => {});
  expect(store.getState().rootReducer.users).toEqual({
    user: null,
    isAuthChecked: false
  });
});
