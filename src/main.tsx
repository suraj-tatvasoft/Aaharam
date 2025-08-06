import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react';
import App from './App.tsx'
import { OrderProvider } from './context/OrderContext';
import './index.css'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <OrderProvider>
      <App />
    </OrderProvider>
  </StrictMode>
);
