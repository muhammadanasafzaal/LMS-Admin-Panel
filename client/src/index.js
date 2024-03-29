import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import globalReducer from "./state";
import { Provider } from "react-redux";
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from './state/api';
import { persistor, store } from './state/store';
import { PersistGate } from 'redux-persist/integration/react';


// const store = configureStore({
//   reducer: {
//     global: globalReducer,
//     [api.reducerPath]: api.reducer
//   },
//   middleware: (getDefault) => getDefault().concat(api.middleware),
// })
// setupListeners(store.dispatch);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
