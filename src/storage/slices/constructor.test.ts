import reducer, {
  addIngredient,
  removeIngredient,
  setOrderModalData,
  setOrderRequest,
  TBurgerConstructorItems
} from './constructor';
import { TConstructorIngredient, TOrder } from '@utils-types';

describe('burgerConstructor reducer', () => {
  it('should add a bun ingredient', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      orderRequest: false,
      orderModalData: null
    };

    const bunIngredient: TConstructorIngredient = {
      _id: '1',
      name: 'Test bun',
      type: 'bun',
      proteins: 1,
      fat: 0.1,
      carbohydrates: 1.5,
      calories: 5,
      price: 2,
      image: 'lettuce.jpg',
      image_large: 'lettuce_large.jpg',
      image_mobile: 'lettuce_mobile.jpg',
      id: '1'
    };

    const nextState = reducer(initialState, addIngredient(bunIngredient));

    expect(nextState.constructorItems.bun).toEqual(bunIngredient);
    expect(nextState.constructorItems.ingredients).toHaveLength(0);
  });

  it('should add a non-bun ingredient', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      orderRequest: false,
      orderModalData: null
    };

    const nonBunIngredient: TConstructorIngredient = {
      id: '2',
      _id: '2',
      name: 'Test Sauce',
      type: 'sauce',
      price: 1,
      calories: 50,
      proteins: 2,
      fat: 1,
      carbohydrates: 10,
      image: 'lettuce-image-url',
      image_large: 'lettuce-image-large-url',
      image_mobile: 'lettuce-image-mobile-url'
    };

    const nextState = reducer(initialState, addIngredient(nonBunIngredient));

    expect(nextState.constructorItems.ingredients).toContainEqual(
      nonBunIngredient
    );
    expect(nextState.constructorItems.bun).toBeNull();
  });

  it('should remove an ingredient by index', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: [
          {
            id: '1',
            _id: '1',
            name: 'Test bun',
            type: 'bun',
            price: 1,
            calories: 50,
            proteins: 2,
            fat: 1,
            carbohydrates: 10,
            image: '',
            image_large: '',
            image_mobile: ''
          },
          {
            id: '2',
            _id: '2',
            name: 'Test sauce',
            type: 'sauce',
            price: 1,
            calories: 50,
            proteins: 2,
            fat: 1,
            carbohydrates: 10,
            image: '',
            image_large: '',
            image_mobile: ''
          }
        ]
      },
      orderRequest: false,
      orderModalData: null
    };

    const nextState = reducer(initialState, removeIngredient(0));

    expect(nextState.constructorItems.ingredients).toHaveLength(1);
    expect(nextState.constructorItems.ingredients[0].id).toBe('2'); // Ensures that the first ingredient was removed
  });

  it('should set orderRequest to true', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      orderRequest: false,
      orderModalData: null
    };

    const nextState = reducer(initialState, setOrderRequest(true));

    expect(nextState.orderRequest).toBe(true);
  });

  it('should set orderRequest to false', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      orderRequest: true,
      orderModalData: null
    };

    const nextState = reducer(initialState, setOrderRequest(false));

    expect(nextState.orderRequest).toBe(false);
  });

  it('should set orderModalData with a valid order', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      orderRequest: false,
      orderModalData: null
    };

    const orderData: TOrder = {
      _id: '123',
      ingredients: ['1', '2', '3'],
      status: 'done',
      name: 'Cheeseburger',
      createdAt: '2024-11-11T10:00:00.000Z',
      updatedAt: '2024-11-11T10:05:00.000Z',
      number: 101
    };

    const nextState = reducer(initialState, setOrderModalData(orderData));

    expect(nextState.orderModalData).toEqual(orderData);
  });

  it('should reset orderModalData to null', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      orderRequest: false,
      orderModalData: {
        _id: '123',
        ingredients: ['1', '2', '3'],
        status: 'done',
        name: 'Cheeseburger',
        createdAt: '',
        updatedAt: '',
        number: 101
      }
    };

    const nextState = reducer(initialState, setOrderModalData(null));

    expect(nextState.orderModalData).toBeNull();
  });
});
