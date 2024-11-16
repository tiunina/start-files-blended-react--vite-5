import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App.jsx';

import 'modern-normalize/modern-normalize.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from 'reduxState/store.js';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <BrowserRouter
          future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
        >
          <App />
        </BrowserRouter>
      </Provider>
    </PersistGate>
  </React.StrictMode>,
);
