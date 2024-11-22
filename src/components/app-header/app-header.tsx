import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { getUser } from '../../storage/slices/profile';

export const AppHeader: FC = () => {
  const user = useSelector(getUser);
  const userName = user ? user.name : '';
  return <AppHeaderUI userName={userName} />;
};
