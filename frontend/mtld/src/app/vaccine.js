import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from 'components/auth/axiosConfig';
import axios from 'axios';

const initialStateValue = {
  loading: false,
  vaccineInfo: [],
};

export const registerVaccine = createAsyncThunk('vaccine/registerVaccine', async (thunkAPI) => {
  try {
    const accessToken = window.localStorage.getItem('accessToken');
    const res = await axios({
      url: `${process.env.REACT_APP_BASE_URL}/api/vaccine`,
      method: 'post',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: thunkAPI,
    }).then((res) => {
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
    const res = await axiosInstance.get(`/api/vaccine/${thunkAPI}`).then((res) => {
      console.log('vaccine date', res.data);
      return res;
    });
    return res;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const editVaccineInfo = createAsyncThunk('vaccine/editVaccineInfo', async (thunkAPI) => {
  try {
    const res = await axios({
      url: `${process.env.REACT_APP_BASE_URL}/api/vaccine`,
      method: 'patch',
      data: thunkAPI,
    }).then((res) => {
      console.log(res);
      console.log('successfully edited vaccine');
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
      console.log('register fulfilled');
    },
    [registerVaccine.rejected]: (state) => {
      console.log('register rejected');
    },

    //  GET
    [fetchVaccineInfo.pending]: (state) => {
      state.loading = false;
      console.log('fetching pending');
    },
    [fetchVaccineInfo.fulfilled]: (state, action) => {
      state.vaccineInfo = action.payload.data;
      state.loading = true;
      console.log('fetching fulfilled');
    },
    [fetchVaccineInfo.rejected]: (state) => {
      state.loading = false;
      console.log('fetching rejected');
    },

    // PATCH
    [editVaccineInfo.pending]: (state) => {
      state.loading = false;
      console.log('edit pending');
    },
    [editVaccineInfo.fulfilled]: (state, action) => {
      state.loading = true;
      console.log(action);
      console.log(action.payload);
      console.log(action.payload); // dogId
      console.log('edit fulfilled');
    },
    [editVaccineInfo.rejected]: (state) => {
      state.loading = false;
      console.log('edit rejected');
    },
  },
});

// export const {  } = userSlice.actions;
export const vaccineSelector = (state) => state.vaccine.vaccineInfo;
export default vaccineSlice.reducer;
