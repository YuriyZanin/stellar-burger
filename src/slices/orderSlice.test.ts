import {
  createOrder,
  fetchOrders,
  findOrderById,
  initialState
} from './orderSlice';
import orderSliceReducer from './orderSlice';

describe('тест асинхронных экшенов', () => {
  describe('запрос всех заказов', () => {
    it('тест fetchOrders.fulfilled', () => {
      const action = {
        type: fetchOrders.fulfilled.type,
        payload: ['test']
      };

      const newState = orderSliceReducer(initialState, action);
      expect(newState).toEqual({
        orders: ['test'],
        orderRequest: false,
        orderModalData: null
      });
    });
  });

  describe('запрос заказа по id', () => {
    it('тест findOrderById.pending', () => {
      const action = {
        type: findOrderById.pending.type
      };

      const newState = orderSliceReducer(initialState, action);
      expect(newState).toEqual({
        orders: [],
        orderRequest: false,
        orderModalData: null,
        error: null
      });
    });

    it('тест findOrderById.rejected', () => {
      const action = {
        type: findOrderById.rejected.type,
        error: { message: 'test' }
      };

      const newState = orderSliceReducer(initialState, action);
      expect(newState).toEqual({
        orders: [],
        orderRequest: false,
        orderModalData: null,
        error: 'test'
      });
    });

    it('тест findOrderById.fulfilled', () => {
      const action = {
        type: findOrderById.fulfilled.type,
        payload: { orders: ['test'] }
      };

      const newState = orderSliceReducer(initialState, action);
      expect(newState).toEqual({
        orders: [],
        orderRequest: false,
        orderModalData: 'test'
      });
    });
  });

  describe('создание заказа', () => {
    it('тест createOrder.pending', () => {
      const action = {
        type: createOrder.pending.type
      };

      const newState = orderSliceReducer(initialState, action);
      expect(newState.orderRequest).toBe(true);
    });

    it('тест createOrder.rejected', () => {
      const action = {
        type: createOrder.rejected.type,
        error: { message: 'test' }
      };

      const newState = orderSliceReducer(initialState, action);
      expect(newState.error).toEqual('test');
    });

    it('тест createOrder.fulfilled', () => {
      const action = {
        type: createOrder.fulfilled.type,
        payload: { order: 'test' }
      };

      const newState = orderSliceReducer(initialState, action);
      expect(newState.orderModalData).toEqual('test');
    });
  });
});
