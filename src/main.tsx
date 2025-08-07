import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App.tsx';
import { OrderProvider } from './context/OrderContext';
import { Provider } from 'react-redux';
import store, { persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <OrderProvider>
          <App />
        </OrderProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);

serviceWorkerRegistration.register();
