import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// import notificationReducer from './slice/notificationSlice';
import userReducer from './slice/userSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'user',
    //  'notification'
  ],
};

const rootReducer = combineReducers({
  user: userReducer,
  // notification: notificationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;
