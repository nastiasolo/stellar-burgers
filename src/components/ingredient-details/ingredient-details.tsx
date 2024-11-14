import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../services/store';
import { useParams } from 'react-router-dom';
import { setSelectedIngredient } from '../../storage/slices/ingredients';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const ingredients = useSelector(
    (state: RootState) => state.ingredients.ingredients
  );
  const ingredientData = useSelector(
    (state: RootState) => state.ingredients.selectedIngredient
  );

  useEffect(() => {
    const selectedIngredient = ingredients.find(
      (ingredient: { _id: string | undefined }) => ingredient._id === id
    );
    if (selectedIngredient) {
      dispatch(setSelectedIngredient(selectedIngredient));
    }
  }, [dispatch, id, ingredients]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
