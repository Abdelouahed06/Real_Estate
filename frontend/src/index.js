import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import AnnounceReducer from './redux/AnnounceReducer';
import { Provider } from 'react-redux';
import AuthReducer from './redux/AuthReducer';
import UserReducer from './redux/UserReducer';
import FavouriteReducer from './redux/FavouriteReducer';

const store = configureStore({
  reducer: {
    announces: AnnounceReducer,
    favourites: FavouriteReducer,
    auth: AuthReducer,
    user: UserReducer
  }
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
