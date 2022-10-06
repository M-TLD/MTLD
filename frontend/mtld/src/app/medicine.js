import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from 'components/auth/axiosConfig';
import axios from 'axios';

const initialStateValue = {
  loading: false,
  medicineInfo: [],
};

export const registerMedicine = createAsyncThunk('medicine/registerMedicine', async (thunkAPI) => {
  try {
    // console.log(thunkAPI);
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
    const res = await axiosInstance.get(`/api/medicine/${thunkAPI}`).then((res) => res);
    return res;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const editMedicineInfo = createAsyncThunk('medicine/editMedicineInfo', async (thunkAPI) => {
  try {
    const accessToken = window.localStorage.getItem('accessToken');
    // console.log(thunkAPI);
    const res = await axios({
      url: `${process.env.REACT_APP_BASE_URL}/api/medicine`,
      method: 'patch',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: thunkAPI,
    }).then((res) => {
      // console.log(res);
      console.log('successfully edited medicine');
      return res;
    });
    return res;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const deleteMedicineInfo = createAsyncThunk('medicine/deleteMedicineInfo', async (thunkAPI) => {
  const medicineId = thunkAPI;
  try {
    const res = await axiosInstance.delete(`/api/medicine/${medicineId}`).then((res) => medicineId);
    return medicineId;
  } catch (err) {
    // console.log(err);
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
      // console.log('register pending');
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
      // console.log('fetching pending');
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
    [editMedicineInfo.pending]: (state) => {
      state.loading = false;
      // console.log('edit pending');
    },
    [editMedicineInfo.fulfilled]: (state, action) => {
      state.loading = true;
      console.log('edit fulfilled');
    },
    [editMedicineInfo.rejected]: (state) => {
      state.loading = false;
      console.log('edit rejected');
    },

    // DELETE
    [deleteMedicineInfo.pending]: (state) => {
      state.loading = false;
      // console.log(state.loading);
      // console.log('pending');
    },
    [deleteMedicineInfo.fulfilled]: (state, action) => {
      state.loading = true;
      const id = action.payload;
      state.medicineInfo = state.medicineInfo.filter((item) => item.id !== id);
    },
    [deleteMedicineInfo.rejected]: (state) => {
      state.loading = false;
      console.log('rejected');
    },
  },
});

export const medicineInfoSelector = (state) => state.medicine.medicineInfo;
export const medicineSelector = (state) => state.medicine;
export default medicineSlice.reducer;
