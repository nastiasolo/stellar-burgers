import { ProfileOrdersUI } from '@ui-pages';

import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from '../../storage/slices/ingredients';
import { AppDispatch, RootState } from '../../services/store';
import { fetchUserOrders } from '../../storage/slices/feed';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const orders = useSelector((state: RootState) => state.feed.profileOrders);
  const ingredients = useSelector(
    (state: RootState) => state.ingredients.ingredients
  );

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
    dispatch(fetchUserOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
