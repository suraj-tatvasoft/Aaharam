import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface OrderDetailData {
  orderId: string;
  tokenNumber: number;
  date: string;
  time: string;
  items: OrderItem[];
}

interface OrderContextType {
  order: OrderDetailData | null;
  setOrder: (order: OrderDetailData | null) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [order, setOrder] = useState<OrderDetailData | null>(null);
  return <OrderContext.Provider value={{ order, setOrder }}>{children}</OrderContext.Provider>;
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrder must be used within OrderProvider');
  return context;
};
