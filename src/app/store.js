import { configureStore } from '@reduxjs/toolkit';
import countriesReducer from '../features/countriesSlice';

export default configureStore({
  reducer: {
    countries: countriesReducer,
  },
});
