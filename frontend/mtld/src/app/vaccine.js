import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from 'components/auth/axiosConfig';
import axios from 'axios';

const initialStateValue = {
  vaccineInfo: {},
  loading: false,
};

export const registerVaccine = createAsyncThunk('vaccine/registerVaccine', async (thunkAPI) => {
  try {
    console.log(thunkAPI);
    const accessToken = window.localStorage.getItem('accessToken');
    const res = await axios({
      url: `${process.env.REACT_APP_BASE_URL}/api/vaccine`,
      method: 'post',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: thunkAPI,
    }).then((res) => {
      console.log(res);
      console.log('successfully registered vaccine alarm');
      return res;
    });
    return res;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const vaccineSlice = createSlice({
  // Name of the reducer
  name: 'vaccine',
  initialState: {
    value: { initialStateValue },
  },
  reducers: {},
  extraReducers: {
    // POST
    [registerVaccine.pending]: (state) => {
      console.log('register pending');
    },
    [registerVaccine.fulfilled]: (state, action) => {
      console.log(action.payload);
      console.log('register fulfilled');
    },
    [registerVaccine.rejected]: (state) => {
      console.log('register rejected');
    },

    // PATCH
  },
});

// export const {  } = userSlice.actions;
export const vaccineSelector = (state) => state.vaccine;
export default vaccineSlice.reducer;
