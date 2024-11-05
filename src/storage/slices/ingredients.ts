import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => getIngredientsApi()
);

type TIngredientsState = {
  [x: string]: any;
  ingredients: TIngredient[];
  selectedIngredient: TIngredient | null;
  loading: boolean;
  error: string | null;
};

const initialState: TIngredientsState = {
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
    // addToConstructor: {
    //   reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
    //     if (payload.type === 'bun') {
    //       state.bun = payload;
    //     } else {
    //       state.ingredients.push(payload);
    //     }
    //   },
    //   prepare: (ingredient: TIngredient) => ({
    //     payload: { ...ingredient, id: uuid() }
    //   })
    // }
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
        console.log('Ingredients state:', action.payload);
      });
  }
});

export const { setSelectedIngredient } = ingredientSlice.actions;
export default ingredientSlice.reducer;
