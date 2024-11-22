import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { useSelector } from 'react-redux';
import { RootState } from 'src/services/store';
import { RouterInit } from '@remix-run/router';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients, ...rest }, ref) => {
  const constructorItems = useSelector(
    (state: RootState) => state.burgerConstructor.constructorItems
  );
  // };

  const ingredientsCounters = useMemo(() => {
    const { bun, ingredients } = constructorItems;

    const counters: { [key: string]: number } = {};
    ingredients.forEach((ingredient: TIngredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });
    if (bun) counters[bun._id] = 2;
    return counters;
  }, [constructorItems]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
      {...rest}
    />
  );
});
