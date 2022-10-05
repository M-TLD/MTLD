import { configureStore } from '@reduxjs/toolkit';
import dateReducer from './date';
import userReducer from './user';
import puppyReducer from './puppy';
import scoreReducer from './score';
import vaccineReducer from './vaccine';
import medicineReducer from './medicine';
import dxReducer from './diagnosis';

export const store = configureStore({
  reducer: {
    user: userReducer,
    puppy: puppyReducer,
    vaccine: vaccineReducer,
    date: dateReducer,
    score: scoreReducer,
    diagnosis: dxReducer,
    medicine: medicineReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
