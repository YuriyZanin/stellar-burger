import { fetchFeeds } from './feedSlice';
import feedSliceReducer from './feedSlice';

describe('тест асинхронных экшенов', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    error: null
  };

  describe('запрос всех заказов', () => {
    it('тест fetchFeeds.fulfilled', () => {
      const action = {
        type: fetchFeeds.fulfilled.type,
        payload: { orders: ['test'], total: 1, totalToday: 1 }
      };

      const newState = feedSliceReducer(initialState, action);
      expect(newState).toEqual({
        orders: ['test'],
        total: 1,
        totalToday: 1,
        error: null
      });
    });

    it('тест fetchFeeds.rejected', () => {
      const action = {
        type: fetchFeeds.rejected.type,
        error: { message: 'test' }
      };

      const newState = feedSliceReducer(initialState, action);
      expect(newState).toEqual({
        orders: [],
        total: 0,
        totalToday: 0,
        error: 'test'
      });
    });
  });
});
