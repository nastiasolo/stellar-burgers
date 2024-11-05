import { FC, useEffect } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../services/store';
import { fetchFeed } from '../../storage/slices/feed';
import { Root } from 'react-dom/client';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** TODO: взять переменные из стора */
  // const orders: TOrder[] = [];
  // const feed = {};

  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector((state: RootState) => state.feed.orders);
  const feed = useSelector((state: RootState) => state.feed);

  console.log(orders, 'feed-info, orders');
  console.log(feed, 'feed-info, feed');

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
