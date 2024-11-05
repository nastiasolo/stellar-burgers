import { updateUserApi } from '@api';
import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authCheck, fetchUser } from '../../storage/slices/profile';
import { AppDispatch, RootState } from '../../services/store';

export const Profile: FC = () => {
  /** TODO: взять переменную из стора */
  // const user = {
  //   name: '',
  //   email: ''
  // };
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(authCheck());
  }, [dispatch]);

  const user = useSelector((state: RootState) => state.user.user);
  console.log(user, 'user');
  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await updateUserApi(formValue);
    } catch (error) {
      console.error('Ошибка при обновлении данных', error);
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );

  // return null;
};
