import { configureStore } from '@reduxjs/toolkit';
import dateReducer from './date';
import userReducer from './user';
import puppyReducer from './puppy';
import scoreReducer from './score';
import dxReducer from './diagnosis';

export const store = configureStore({
  reducer: {
    user: userReducer,
    puppy: puppyReducer,
    date: dateReducer,
    score: scoreReducer,
    diagnosis: dxReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
