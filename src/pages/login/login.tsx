import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useNavigate } from 'react-router-dom';
import { loginUserApi, TLoginData } from '@api';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { setCookie } from '../../utils/cookie';
import { setUser } from '../../storage/slices/profile';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const loginData: TLoginData = { email, password };
      const response = await loginUserApi(loginData);
      setCookie('accessToken', response.accessToken.split(' ')[1]);
      setCookie('refreshToken', response.refreshToken);
      dispatch(setUser(response.user));
      navigate('/profile');
    } catch (error) {
      setErrorText('Ошибка входа');
    }
  };

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
