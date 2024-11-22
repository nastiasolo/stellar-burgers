import reducer, {
  fetchUser,
  loginUser,
  logoutUser,
  registerUser
} from './profile';

const initialState = {
  user: null,
  isLoading: false,
  error: '',
  isAuthChecked: false
};

const mockUser = { name: 'Test User', email: 'test@example.com' };

const mockResponse = {
  success: true,
  user: { name: 'Test User', email: 'test@example.com' },
  accessToken: 'token',
  refreshToken: 'refreshToken'
};

describe('tests for userSlice', () => {
  it('handle registerUser.pending', () => {
    const nextState = reducer(
      initialState,
      registerUser.pending('', { email: '', password: '', name: '' })
    );
    expect(nextState.isLoading).toBe(true);
    expect(nextState.error).toBe('');
  });

  it('handle registerUser.fulfilled', () => {
    const nextState = reducer(
      initialState,
      registerUser.fulfilled(mockUser, '', {
        email: '',
        password: '',
        name: ''
      })
    );
    expect(nextState.isLoading).toBe(false);
    expect(nextState.user).toEqual(mockUser);
  });

  it('handle registerUser.rejected', () => {
    const mockError = { message: 'Registration failed' };
    const nextState = reducer(
      initialState,
      registerUser.rejected(mockError as any, '', {
        email: '',
        password: '',
        name: ''
      })
    );
    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBe(mockError.message);
  });

  it('handle loginUser.pending', () => {
    const nextState = reducer(
      initialState,
      loginUser.pending('', { email: '', password: '' })
    );
    expect(nextState.isLoading).toBe(true);
    expect(nextState.error).toBe('');
  });

  it('handle loginUser.fulfilled', () => {
    const nextState = reducer(
      initialState,
      loginUser.fulfilled(mockResponse, '', {
        email: '',
        password: ''
      })
    );
    expect(nextState.isLoading).toBe(false);
    expect(nextState.user).toEqual(mockResponse.user);
    expect(nextState.isAuthChecked).toBe(true);
  });

  it('handle loginUser.rejected', () => {
    const mockError = { message: 'Login failed' };
    const nextState = reducer(
      initialState,
      loginUser.rejected(mockError as any, '', { email: '', password: '' })
    );
    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBe(mockError.message);
  });

  it('handle fetchUser.pending', () => {
    const nextState = reducer(initialState, fetchUser.pending(''));
    expect(nextState.isLoading).toBe(true);
    expect(nextState.error).toBe('');
  });

  it('handle fetchUser.fulfilled', () => {
    const mockUser = { name: 'Test User', email: 'test@example.com' };
    const nextState = reducer(initialState, fetchUser.fulfilled(mockUser, ''));
    expect(nextState.isLoading).toBe(false);
    expect(nextState.user).toEqual(mockUser);
  });

  it('handle fetchUser.rejected', () => {
    const mockError = { message: 'Fetch user failed' };
    const nextState = reducer(
      initialState,
      fetchUser.rejected(mockError as any, '')
    );
    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBe(mockError.message);
  });

  it('should handle logoutUser.pending', () => {
    const nextState = reducer(
      initialState,
      logoutUser.pending('logoutRequestId')
    );
    expect(nextState.isLoading).toBe(true);
    expect(nextState.error).toBe('');
  });

  it('should handle logoutUser.fulfilled', () => {
    const modifiedState = {
      ...initialState,
      isLoading: true,
      user: { name: 'Test User', email: 'test@example.com' },
      error: 'Some error'
    };

    const nextState = reducer(
      modifiedState,
      logoutUser.fulfilled(undefined, 'requestId', undefined, {
        requestId: 'someRequestId'
      })
    );
    expect(nextState.isLoading).toBe(false);
    expect(nextState.user).toBeNull();
  });

  it('should handle logoutUser.rejected', () => {
    const action = {
      type: logoutUser.rejected.type,
      error: { message: 'Logout failed' }
    };

    const modifiedState = {
      ...initialState,
      isLoading: true
    };

    const nextState = reducer(modifiedState, action);
    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBe('Logout failed');
  });
});
