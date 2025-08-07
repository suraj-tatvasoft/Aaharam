import React from 'react';
import { useOrder } from '@/context/OrderContext';
import OrderDetail from './OrderDetail';
import { useNavigate } from 'react-router-dom';

const OrderDetailPage: React.FC = () => {
  const { order, setOrder } = useOrder();
  const navigate = useNavigate();

  if (!order) {
    // If no order, redirect to food delivery
    navigate('/food-delivery');
    return null;
  }

  return (
    <OrderDetail
      orderId={order.orderId}
      tokenNumber={order.tokenNumber}
      date={order.date}
      time={order.time}
      items={order.items}
      onCancel={() => {
        setOrder(null);
        navigate('/food-delivery');
      }}
    />
  );
};

export default OrderDetailPage;
