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

export const fetchVaccineInfo = createAsyncThunk('vaccine/fetchVaccineInfo', async (thunkAPI) => {
  try {
    const res = await axiosInstance.get('/api/user/dogs').then((res) => {
      console.log('dog info:', res.data);
      return res;
    });
    return res;
  } catch (err) {
    console.log('에러! ');
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
    //  GET
    [fetchVaccineInfo.pending]: (state) => {
      state.loading = false;
      // console.log(state.loading);
      console.log('fetching pending');
    },
    [fetchVaccineInfo.fulfilled]: (state, action) => {
      state.vaccineInfo = action.payload.data;
      console.log(action.payload.data);
      state.loading = true;
      console.log('vaccine info redux store:', state.puppyInfo);
      console.log('fetching fulfilled');
    },
    [fetchVaccineInfo.rejected]: (state) => {
      state.loading = false;
      console.log('fetching rejected');
    },
  },
});

// export const {  } = userSlice.actions;
export const vaccineSelector = (state) => state.vaccine;
export default vaccineSlice.reducer;
