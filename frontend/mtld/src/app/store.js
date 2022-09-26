import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import puppyReducer from './puppy';

export const store = configureStore({
  reducer: {
    user: userReducer,
    puppy: puppyReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
