import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = '1998-04-12';
export const dateSlice = createSlice({
  name: 'date',
  initialState: {
    value: initialStateValue,
  },
  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { update } = dateSlice.actions;
export default dateSlice.reducer;
