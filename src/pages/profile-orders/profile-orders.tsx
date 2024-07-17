import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrders, fetchOrders } from '../../slices/orderSlice';
import { AppDispatch } from 'src/services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders: TOrder[] = useSelector(selectOrders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
