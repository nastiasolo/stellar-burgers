import { rootReducer, RootState } from '../services/store';
import { expect, test, describe, jest } from '@jest/globals';
import { initialState as ingredientsData } from '../storage/slices/ingredients';
import { initialState as burgerConstructorData } from '../storage/slices/constructor';
import { initialState as feedData } from '../storage/slices/feed';
import { initialState as userData } from '../storage/slices/profile';

describe('rootReducer initiale', () => {
  test('should initiate correctly and return the initial state', () => {
    // Тестируем каждый редьюсер по отдельности
    const ingredientsState = rootReducer.ingredients(undefined, {
      type: '@@INIT'
    });
    const burgerConstructorState = rootReducer.burgerConstructor(undefined, {
      type: '@@INIT'
    });
    const feedState = rootReducer.feed(undefined, { type: '@@INIT' });
    const userState = rootReducer.user(undefined, { type: '@@INIT' });

    // Проверяем, что каждый редьюсер возвращает начальное состояние
    expect(ingredientsState).toEqual(ingredientsData);
    expect(burgerConstructorState).toEqual(burgerConstructorData);
    expect(feedState).toEqual(feedData);
    expect(userState).toEqual(userData);
  });
});
