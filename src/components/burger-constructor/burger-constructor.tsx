import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { TBurgerConstructorItems } from '../../storage/slices/constructor';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  // const constructorItems = {
  //   bun: {
  //     price: 0
  //   },
  //   ingredients: []
  // };
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

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login');
      return;
    }
  };
  const closeOrderModal = () => {};

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
