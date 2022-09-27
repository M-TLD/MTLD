import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = 0;

export const scoreSlice = createSlice({
  name: 'score',
  initialState: {
    value: initialStateValue,
  },
  reducers: {
    sumScore: (state) => {
      state.value += 10;
      console.log('acc score: ', state.value);
    },
    resetScore: (state) => {
      state.value = 0;
    },
  },
});

export const { sumScore, resetScore } = scoreSlice.actions;
export default scoreSlice.reducer;
