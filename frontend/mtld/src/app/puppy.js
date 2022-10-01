import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from 'components/auth/axiosConfig';
import axios from 'axios';

const initialStateValue = {
  loading: false,
  puppyInfo: [],
};
export const registerPuppyInfo = createAsyncThunk('puppy/addPuppyInfo', async (thunkAPI) => {
  const dogFormData = new FormData();
  const dogInfo = JSON.stringify(thunkAPI[1]);
  dogFormData.append('image', thunkAPI[0]);
  dogFormData.append(
    'dog',
    new Blob([dogInfo], {
      type: 'application/json',
    }),
  );

  // formData 제대로 들어오는지 확인 로그
  // console.log(dogFormData.get('dog'));
  // console.log(dogFormData.get('image'));

  // for (const value of dogFormData.values()) {
  //   console.log(value);
  // }

  const accessToken = window.localStorage.getItem('accessToken');

  let dogId = '';
  try {
    const res = await axios({
      url: `${process.env.REACT_APP_BASE_URL}/api/dogs`,
      method: 'post',
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
      data: dogFormData,
    }).then((res) => {
      console.log('puppyId:', res.data);
      dogId = res.data;
      console.log('successfully registered puppy');
      return dogId;
    });
    return dogId;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const fetchPuppyInfo = createAsyncThunk('puppy/fetchPuppyInfo', async (thunkAPI) => {
  try {
    const res = await axiosInstance.get('/api/user/dogs').then((res) => {
      console.log('dog info:', res.data);
      return res;
    });
    return res;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const deletePuppyInfo = createAsyncThunk('puppy/deletePuppyInfo', async (thunkAPI) => {
  const dogId = thunkAPI;
  console.log(dogId);
  console.log(initialStateValue);
  try {
    const res = await axiosInstance.delete(`/api/dogs/${dogId}`).then((res) => {
      console.log('deleted?', res);
      return dogId;
    });
    return dogId;
  } catch (err) {
    // console.log(err);
    return thunkAPI.rejectWithValue(err);
  }
});

export const puppySlice = createSlice({
  name: 'puppy',
  initialState: {
    initialStateValue,
  },
  reducers: {
    editPuppyInfo: (state, action) => {
      const { id, name, birthdate, gender, weight, neuter, disease } = action.payload;
      const existingPuppy = state.find((puppy) => puppy.id === id);
      if (existingPuppy) {
        existingPuppy.name = name;
        existingPuppy.birthdate = birthdate;
        existingPuppy.gender = gender;
        existingPuppy.weight = weight;
        existingPuppy.neuter = neuter;
        existingPuppy.disease = disease;
      }
    },
  },
  extraReducers: {
    // POST
    [registerPuppyInfo.pending]: (state) => {
      state.loading = false;
      console.log('register pending');
    },
    [registerPuppyInfo.fulfilled]: (state, action) => {
      state.loading = true;
      state.puppyInfo = action.payload;
      console.log(action.payload); // dogId
      console.log(state.puppyInfo); // dogId
      console.log('register fulfilled');
    },
    [registerPuppyInfo.rejected]: (state) => {
      state.loading = false;
      console.log('register rejected');
    },
    //  GET
    [fetchPuppyInfo.pending]: (state) => {
      state.loading = false;
      // console.log(state.loading);
      console.log('fetching pending');
    },
    [fetchPuppyInfo.fulfilled]: (state, action) => {
      state.puppyInfo = action.payload.data;
      for (let i = 0; i < state.puppyInfo.length; i += 1) {
        if (state.puppyInfo[i].gender === 'FEMALE') {
          state.puppyInfo[i].gender = '♀';
        } else if (state.puppyInfo[i].gender === 'MALE') {
          state.puppyInfo[i].gender = '♂';
        }
      }
      state.loading = true;
      // console.log(action.payload.data[0]);
      console.log('puppy info redux store:', state.puppyInfo);
      console.log('fetching fulfilled');
    },
    [fetchPuppyInfo.rejected]: (state) => {
      state.loading = false;
      console.log('fetching rejected');
    },

    // DELETE
    [deletePuppyInfo.pending]: (state) => {
      state.loading = false;
      // console.log(state.loading);
      console.log('pending');
    },
    [deletePuppyInfo.fulfilled]: (state, action) => {
      state.loading = true;
      const id = action.payload;
      console.log(id);
      state.puppyInfo = state.puppyInfo.filter((item) => item.id !== id);
    },
    [deletePuppyInfo.rejected]: (state) => {
      state.loading = false;
      console.log('rejected');
    },
  },
});

export const { addPuppyInfo, getPuppyInfo, editPuppyInfo } = puppySlice.actions;
export const puppySelector = (state) => state.puppy;
export default puppySlice.reducer;
