import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export interface OrderState {
  orders: TOrder[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error?: string | null;
}

const initialState: OrderState = {
  orders: [],
  orderRequest: false,
  orderModalData: null
};

export const fetchOrders = createAsyncThunk('orders/getAll', async () =>
  getOrdersApi()
);

export const createOrder = createAsyncThunk(
  'order/create',
  async (data: string[]) => orderBurgerApi(data)
);

export const findOrderById = createAsyncThunk(
  'order/getById',
  async (id: number) => getOrderByNumberApi(id)
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    closeModal: (state) => {
      state.orderModalData = null;
      state.orderRequest = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
      });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
    builder
      .addCase(findOrderById.pending, (state) => {
        state.orderModalData = null;
        state.error = null;
      })
      .addCase(findOrderById.rejected, (state, action) => {
        state.error = action.error?.message;
      })
      .addCase(findOrderById.fulfilled, (state, action) => {
        state.orderModalData = action.payload.orders[0];
      });
  },
  selectors: {
    selectOrders: (state) => state.orders,
    selectRequest: (state) => state.orderRequest,
    selectModalData: (state) => state.orderModalData
  }
});

export const { closeModal } = orderSlice.actions;
export const { selectOrders, selectRequest, selectModalData } =
  orderSlice.selectors;

export default orderSlice.reducer;
