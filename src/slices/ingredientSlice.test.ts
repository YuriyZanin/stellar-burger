import { configureStore } from '@reduxjs/toolkit';
import ingredientSliceReducer, {
  fetchIngredients,
  selectIngredients,
  selectIsLoading
} from './ingredientSlice';

describe('тест асинхронных экшенов', () => {
  const initialState = {
    ingredients: [],
    isLoading: false,
    error: null
  };

  describe('запрос всех ингредиентов', () => {
    it('тест fetchIngredients.pending', () => {
      const action = {
        type: fetchIngredients.pending.type,
        payload: null
      };

      const newState = ingredientSliceReducer(initialState, action);
      expect(newState).toEqual({
        ingredients: [],
        isLoading: true,
        error: null
      });
    });

    it('тест fetchIngredients.rejected', () => {
      const action = {
        type: fetchIngredients.rejected.type,
        error: { message: 'test' }
      };

      const newState = ingredientSliceReducer(initialState, action);
      expect(newState).toEqual({
        ingredients: [],
        isLoading: false,
        error: 'test'
      });
    });

    it('тест fetchIngredients.fulfilled', () => {
      const action = {
        type: fetchIngredients.fulfilled.type,
        payload: ['test']
      };

      const newState = ingredientSliceReducer(initialState, action);
      expect(newState).toEqual({
        ingredients: ['test'],
        isLoading: false,
        error: null
      });
    });
  });
});

describe('тесты селекторов', () => {
  const initialState = [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0942',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
    }
  ];
  const store = configureStore({
    reducer: { ingredients: ingredientSliceReducer },
    preloadedState: {
      ingredients: {
        ingredients: initialState,
        isLoading: false
      }
    }
  });

  it('получение списка ингредиентов', () => {
    const ingredients = selectIngredients(store.getState());
    expect(ingredients).toEqual(initialState);
  });

  it('получение состояния загрузки', () => {
    const loading = selectIsLoading(store.getState());
    expect(loading).toBe(false);
  });
});
