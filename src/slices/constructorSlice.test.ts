import constructorSliceReducer, {
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  clearIngredients
} from './constructorSlice';

describe('тесты синхронных экшенов', () => {
  const initialState = {
    bun: null,
    ingredients: [
      {
        id: '1',
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
        id: '2',
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      },
      {
        id: '3',
        _id: '643d69a5c3f7b9001cfa0942',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
      }
    ]
  };

  it('добавление ингредиента', () => {
    const newIngredient = {
      _id: '643d69a5c3f7b9001cfa0943',
      name: 'Соус фирменный Space Sauce',
      type: 'sauce',
      proteins: 50,
      fat: 22,
      carbohydrates: 11,
      calories: 14,
      price: 80,
      image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
    };
    const newState = constructorSliceReducer(
      initialState,
      addIngredient(newIngredient)
    );

    const { ingredients } = newState;
    expect(ingredients.length).toBe(4);
    expect(ingredients[ingredients.length - 1]._id).toEqual(newIngredient._id);
  });

  it('добавление булки', () => {
    const newBun = {
      _id: '643d69a5c3f7b9001cfa093d',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
    };

    const newState = constructorSliceReducer(
      initialState,
      addIngredient(newBun)
    );

    const { ingredients, bun } = newState;
    expect(ingredients.length).toBe(3);
    expect(bun?._id).toEqual(newBun._id);
  });

  it('удаление ингредиента', () => {
    const newState = constructorSliceReducer(
      initialState,
      removeIngredient('3')
    );

    const { ingredients } = newState;
    expect(ingredients.length).toBe(2);
  });

  it('перемещение ингредиента выше', () => {
    const newState = constructorSliceReducer(initialState, moveUpIngredient(1));

    const { ingredients } = newState;
    expect(ingredients.length).toBe(3);
    expect(ingredients[0]).toEqual(initialState.ingredients[1]);
    expect(ingredients[1]).toEqual(initialState.ingredients[0]);
  });

  it('перемещение ингредиента ниже', () => {
    const newState = constructorSliceReducer(
      initialState,
      moveDownIngredient(0)
    );

    const { ingredients } = newState;
    expect(ingredients.length).toBe(3);
    expect(ingredients[1]).toEqual(initialState.ingredients[0]);
    expect(ingredients[0]).toEqual(initialState.ingredients[1]);
  });

  it('удаление всех ингредиентов', () => {
    const newState = constructorSliceReducer(initialState, clearIngredients());

    const { ingredients } = newState;
    expect(ingredients.length).toBe(0);
  });
});
