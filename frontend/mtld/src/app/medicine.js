import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from 'components/auth/axiosConfig';
import axios from 'axios';

const initialStateValue = {
  loading: false,
  medicineInfo: [],
};

export const registerMedicine = createAsyncThunk('medicine/registerMedicine', async (thunkAPI) => {
  try {
    console.log(thunkAPI);
    const accessToken = window.localStorage.getItem('accessToken');
    const res = await axios({
      url: `${process.env.REACT_APP_BASE_URL}/api/medicine`,
      method: 'post',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: thunkAPI,
    }).then((res) => {
      console.log('successfully registered medicine alarm');
      return res;
    });
    return res;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const fetchMedicineInfo = createAsyncThunk('medicine/fetchMedicineInfo', async (thunkAPI) => {
  try {
    const res = await axiosInstance.get(`/api/medicine/${thunkAPI}`).then((res) => {
      console.log('medicine date', res.data);
      return res;
    });
    return res;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const medicineSlice = createSlice({
  // Name of the reducer
  name: 'medicine',
  initialState: {
    value: { initialStateValue },
  },
  reducers: {},
  extraReducers: {
    // POST
    [registerMedicine.pending]: (state) => {
      console.log('register pending');
    },
    [registerMedicine.fulfilled]: (state, action) => {
      console.log('register fulfilled');
    },
    [registerMedicine.rejected]: (state) => {
      console.log('register rejected');
    },

    //  GET
    [fetchMedicineInfo.pending]: (state) => {
      state.loading = false;
      console.log('fetching pending');
    },
    [fetchMedicineInfo.fulfilled]: (state, action) => {
      state.medicineInfo = action.payload.data;
      state.loading = true;
      console.log('fetching fulfilled');
    },
    [fetchMedicineInfo.rejected]: (state) => {
      state.loading = false;
      console.log('fetching rejected');
    },

    // PATCH
  },
});

export const medicineSelector = (state) => state.medicine.medicineInfo;
export default medicineSlice.reducer;
