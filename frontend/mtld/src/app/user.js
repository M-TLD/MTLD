import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  // Name of the reducer
  name: 'user',
  initialState: {
    value: { email: '', name: '' },
  },
  reducers: {
    login: (state, action) => {
      // actions 내에는 payload, type이 존재
      state.value = action;
    },
  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
