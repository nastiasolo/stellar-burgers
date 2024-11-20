import { stat } from 'fs';
import reducer, {
  fetchFeed,
  fetchOrderByNumber,
  fetchUserOrders,
  TFeedState
} from './feed';

const initialState: TFeedState = {
  orders: [],
  selectedOrder: null,
  profileOrders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: ''
};

const mockFeed = {
  success: true,
  orders: [
    {
      _id: '1',
      status: 'done',
      name: 'Order 1',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T01:00:00.000Z',
      number: 12345,
      ingredients: ['ingredient1', 'ingredient2']
    }
  ],
  total: 10,
  totalToday: 5
};

const mockUserOrders = [
  {
    _id: '1',
    status: 'done',
    name: 'Order 1',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T01:00:00.000Z',
    number: 12345,
    ingredients: ['ingredient1', 'ingredient2']
  },
  {
    _id: '2',
    status: 'pending',
    name: 'Order 2',
    createdAt: '2024-01-02T00:00:00.000Z',
    updatedAt: '2024-01-02T01:00:00.000Z',
    number: 12346,
    ingredients: ['ingredient3', 'ingredient4']
  }
];

const mockFetchOrderByNumber = {
  _id: '1',
  status: 'done',
  name: 'Order 1',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T01:00:00.000Z',
  number: 12345,
  ingredients: ['ingredient1', 'ingredient2']
};

describe('tests for Feed Slice - fetchFeed', () => {
  it('should handle fetchFeed.pending', () => {
    const state = reducer(initialState, fetchFeed.pending('', undefined));
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe('');
  });

  it('should handle fetchFeed.fulfilled', () => {
    const state = reducer(
      initialState,
      fetchFeed.fulfilled(mockFeed, '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockFeed.orders);
    expect(state.total).toBe(mockFeed.total);
    expect(state.totalToday).toBe(mockFeed.totalToday);
  });

  it('should handle fetchFeed.rejected', () => {
    const error = 'Network error';
    const state = reducer(
      initialState,
      fetchFeed.rejected(new Error(error), '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
  });
});

describe('tests for Feed Slice - fetchUserOrders', () => {
  it('should handle fetchUserOrders.pending', () => {
    const state = reducer(initialState, fetchUserOrders.pending('', undefined));
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe('');
  });

  it('should handle fetchUserOrders.fulfilled', () => {
    const state = reducer(
      initialState,
      fetchUserOrders.fulfilled(mockUserOrders, '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.profileOrders).toEqual(mockUserOrders);
  });

  it('should handle fetchUserOrders.rejected', () => {
    const error = 'Request failed';
    const state = reducer(
      initialState,
      fetchUserOrders.rejected(new Error(error), '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
  });

  describe('tests for Feed Slice - fetchOrderByNumber', () => {
    it('should handle fetchOrderByNumber.pending', () => {
      const state = reducer(
        initialState,
        fetchOrderByNumber.pending('', 12345)
      );
      expect(state.isLoading).toBe(true);
      expect(state.error).toBe('');
    });

    it('should handle fetchOrderByNumber.fulfilled', () => {
      const state = reducer(
        initialState,
        fetchOrderByNumber.fulfilled(mockFetchOrderByNumber, '', 12345)
      );

      expect(state.isLoading).toBe(false);
      expect(state.selectedOrder).toEqual(mockFetchOrderByNumber);
    });

    it('should handle fetchOrderByNumber.rejected', () => {
      const error = 'Order not found';
      const state = reducer(
        initialState,
        fetchOrderByNumber.rejected(new Error(error), '', 123)
      );

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(error);
    });
  });
});
