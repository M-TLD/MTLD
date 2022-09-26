import { configureStore } from '@reduxjs/toolkit';
import dateReducer from './date';
import userReducer from './user';

export const store = configureStore({
  reducer: {
    user: userReducer,
    date: dateReducer,
  },
});

export default store;
