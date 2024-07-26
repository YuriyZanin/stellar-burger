import { configureStore } from '@reduxjs/toolkit';
import store, { rootReducer } from './store';

describe('проверка инициализации rootReducer', () => {
  const newStore = configureStore({ reducer: { rootReducer } });

  it('проверка инициализации конструктора', () => {
    expect(newStore.getState().rootReducer.constructors).toEqual({
      bun: null,
      ingredients: []
    });
  });
  it('проверка инициализации ингредиентов', () => {
    expect(newStore.getState().rootReducer.ingredients).toEqual({
      error: null,
      ingredients: [],
      isLoading: false
    });
  });
  it('проверка инициализации ленты заказов', () => {
    expect(newStore.getState().rootReducer.feeds).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      error: null
    });
  });
  it('проверка инициализации истории заказов', () => {
    expect(newStore.getState().rootReducer.orders).toEqual({
      orders: [],
      orderRequest: false,
      orderModalData: null
    });
  });
  it('проверка инициализации пользователей', () => {});
  expect(newStore.getState().rootReducer.users).toEqual({
    user: null,
    isAuthChecked: false
  });
});

it('проверка начального состояния хранилища', () => {
  const expected = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
  expect(expected).toEqual(store.getState());
});
