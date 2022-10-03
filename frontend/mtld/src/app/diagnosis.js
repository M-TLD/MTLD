import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = [];

export const dxSlice = createSlice({
  name: 'diagnosis',
  initialState: {
    value: initialStateValue,
  },
  reducers: {
    report: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { report } = dxSlice.actions;
export default dxSlice.reducer;
