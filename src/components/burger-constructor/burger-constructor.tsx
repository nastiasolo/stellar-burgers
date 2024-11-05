import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import {
  resetConstructor,
  setOrderModalData,
  setOrderRequest,
  TBurgerConstructorItems
} from '../../storage/slices/constructor';
import { useNavigate } from 'react-router-dom';
import { orderBurgerApi } from '@api';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorStoreItems = useSelector(
    (state: RootState) => state.burgerConstructor.constructorItems
  );

  let constructorItems: TBurgerConstructorItems = {
    bun: null,
    ingredients: []
  };

  if (constructorStoreItems) constructorItems = constructorStoreItems;

  const orderRequest = useSelector(
    (state: RootState) => state.burgerConstructor.orderRequest
  );

  const orderModalData = useSelector(
    (state: RootState) => state.burgerConstructor.orderModalData
  );

  const user = useSelector((state: RootState) => state.user.user);

  const onOrderClick = async () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login', { replace: true });
      return;
    }
    const ingredientIDs = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];
    dispatch(setOrderRequest(true));

    try {
      const response = await orderBurgerApi(ingredientIDs);
      dispatch(setOrderModalData(response.order));
    } catch (error) {
      console.error('Ошибка при оформлении заказа', error);
    } finally {
      dispatch(setOrderRequest(false));
    }
  };
  const closeOrderModal = () => {
    dispatch(resetConstructor());
    navigate('/feed');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
