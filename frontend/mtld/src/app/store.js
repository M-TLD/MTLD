import { configureStore } from '@reduxjs/toolkit';
import dateReducer from './date';
import userReducer from './user';
import puppyReducer from './puppy';

export const store = configureStore({
  reducer: {
    user: userReducer,
    puppy: puppyReducer,
    date: dateReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
