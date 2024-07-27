import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { TIngredient } from '../utils/types';
import { getIngredientsApi } from '../utils/burger-api';

export interface IngredientState {
  ingredients: TIngredient[];
  isLoading: boolean;
  error?: string | null;
}

export const initialState: IngredientState = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => getIngredientsApi()
);

const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.ingredients = [];
        state.error = action.error?.message;
      });
  },
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectIsLoading: (state) => state.isLoading
  }
});

export const { selectIngredients, selectIsLoading } = ingredientSlice.selectors;
export default ingredientSlice.reducer;
