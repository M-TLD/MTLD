import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from 'components/auth/axiosConfig';

export const fetchUserInfo = createAsyncThunk('user/fetchUserInfo', async (thunkAPI) => {
  try {
    const res = await axiosInstance.get('/api/user').then((res) => {
      console.log('user info:', res.data);
      return res;
    });
    return res;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const logout = createAsyncThunk('user/logout', async (thunkAPI) => {
  try {
    const res = await axiosInstance.get('/login/oauth2/logout').then((res) => {
      console.log('logout api:', res);
      window.localStorage.removeItem('accessToken');
      window.localStorage.removeItem('refreshToken');
      window.localStorage.removeItem('accessTokenExp');
      window.localStorage.removeItem('refreshTokenExp');
      return res;
    });
    return res;
  } catch (err) {
    console.log('error');
    return thunkAPI.rejectWithValue(err);
  }
});

const initialStateValue = { loading: false, userInfo: [] };
export const userSlice = createSlice({
  // Name of the reducer
  name: 'user',
  initialState: {
    value: { initialStateValue },
  },
  reducers: {
    login: (state, action) => {
      state.value = action;
    },
    // logout: (state) => {
    //   state.value = initialStateValue;
    //   window.localStorage.removeItem('accessToken');
    //   window.localStorage.removeItem('refreshToken');
    //   window.localStorage.removeItem('accessTokenExp');
    //   window.localStorage.removeItem('refreshTokenExp');
    // },
  },
  extraReducers: {
    [fetchUserInfo.pending]: (state) => {
      state.loading = false;
      // console.log(state.loading);
      console.log('fetching pending');
    },
    [fetchUserInfo.fulfilled]: (state, action) => {
      state.userInfo = action.payload.data;
      // console.log(action.payload.data);
      state.loading = true;
      // console.log(action.payload.data[0]);
      // console.log('user info redux store:', state.userInfo);
      // console.log('fetching fulfilled');
    },
    [fetchUserInfo.rejected]: (state) => {
      state.loading = false;
      console.log('fetching rejected');
    },

    //  LOGOUT
    [logout.pending]: (state) => {
      state.loading = false;
      console.log('fetching pending');
    },
    [logout.fulfilled]: (state, action) => {
      state.medicineInfo = action.payload.data;
      state.loading = true;
      console.log('fetching fulfilled');
    },
    [logout.rejected]: (state) => {
      state.loading = false;
      console.log('fetching rejected');
    },
  },
});

export const { login } = userSlice.actions;
export const userSelector = (state) => state.user;
export default userSlice.reducer;
