import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunkMiddleware  from 'redux-thunk';
import globalReducer from "state";
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from 'state/api';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, globalReducer)

export const store = configureStore({
    reducer: {
      global: persistedReducer,
      [api.reducerPath]: api.reducer
    },
    middleware: [thunkMiddleware, api.middleware]
  })
  setupListeners(store.dispatch);

  export const persistor = persistStore(store)
