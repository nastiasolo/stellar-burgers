import { FC, useEffect, useMemo, useState } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../services/store';
import { useParams } from 'react-router-dom';
import feed, { fetchOrderByNumber } from '../../storage/slices/feed';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { number } = useParams<{ number: string }>();

  const [orderData, setOrderData] = useState<TOrder | null>(null);

  useEffect(() => {
    if (number) {
      dispatch(fetchOrderByNumber(Number(number)));
    }
  }, [number, dispatch]);

  const selectedOrder = useSelector(
    (state: RootState) => state.feed.selectedOrder
  );

  const ingredients = useSelector(
    (state: RootState) => state.ingredients.ingredients
  );

  useEffect(() => {
    if (selectedOrder) {
      console.log('selectedOrder', selectedOrder);
      setOrderData({ ...selectedOrder });
    }
  }, [selectedOrder]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    console.log(orderData, 'orderData');

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  console.log(orderInfo);
  console.log(orderInfo.status, orderInfo.name);
  return <OrderInfoUI orderInfo={orderInfo} />;
};
