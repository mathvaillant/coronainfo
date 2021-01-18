import { createSlice } from '@reduxjs/toolkit';

export const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    countries: null,
  },
  reducers: {
    setCountries: (state, action) => {
      state.countries = action.payload;
    }
  },
});

export const { setCountries } = countriesSlice.actions;

export const selectCountries = state => state.countries.countries;

export default countriesSlice.reducer;
