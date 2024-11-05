import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { useParams } from 'react-router-dom';
import { setSelectedIngredient } from '../../storage/slices/ingredients';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора - done! */
  const { id } = useParams();
  const dispatch = useDispatch();

  const ingredients = useSelector(
    (state: RootState) => state.ingredients.ingredients
  );
  const ingredientData = useSelector(
    (state: RootState) => state.ingredients.selectedIngredient
  );

  // const loading = useSelector((state: RootState) => state.ingredients.loading);
  console.log(ingredientData);

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
