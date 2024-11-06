import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { logoutUser } from '../../storage/slices/profile';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    dispatch(logoutUser())
      .then(() => {
        navigate('/login', { replace: true });
      })
      .catch((error) => console.error('Ошибка при выходе из системы', error));
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
