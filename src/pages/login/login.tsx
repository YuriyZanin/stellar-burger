import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { login, selectError } from '../../slices/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const error = useSelector(selectError);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      login({
        email: email,
        password: password
      })
    ).then(() => {
      if (!error) {
        const from = location.state?.from || { pathname: '/' };
        navigate(from);
      }
    });
  };

  return (
    <LoginUI
      errorText={error ?? ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
