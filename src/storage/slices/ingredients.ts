import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => getIngredientsApi()
);

type TIngredientsState = {
  ingredients: TIngredient[];
  selectedIngredient: TIngredient | null;
  loading: boolean;
  error: string | null;
};

export const initialState: TIngredientsState = {
  ingredients: [],
  selectedIngredient: null,
  loading: false,
  error: null
};

const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setSelectedIngredient(state, action: PayloadAction<TIngredient | null>) {
      state.selectedIngredient = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { setSelectedIngredient } = ingredientSlice.actions;
export default ingredientSlice.reducer;
