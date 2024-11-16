import { configureStore } from '@reduxjs/toolkit';
import { currencySlice } from './currency/slice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const currencyConfig = {
  key: 'currency',
  storage,
  whitelist: ['baseCurrency'],
};

export const store = configureStore({
  reducer: {
    [currencySlice.name]: persistReducer(currencyConfig, currencySlice.reducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
