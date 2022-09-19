import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = { email: '', name: '' };
export const userSlice = createSlice({
  // Name of the reducer
  name: 'user',
  initialState: {
    value: { initialStateValue },
  },
  reducers: {
    login: (state, action) => {
      // actions 내에는 payload, type이 존재
      state.value = action;
    },
    logout: (state) => {
      state.value = initialStateValue;
      window.localStorage.removeItem('accessToken');
      window.localStorage.removeItem('refreshToken');
      window.localStorage.removeItem('accessTokenExp');
      window.localStorage.removeItem('refreshTokenExp');
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
