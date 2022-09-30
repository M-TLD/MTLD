import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from 'components/auth/axiosConfig';
import axios from 'axios';
import { SatelliteAltOutlined } from '@mui/icons-material';

const initialStateValue = {
  loading: false,
};

export const fetchPuppyInfo = createAsyncThunk('puppy/fetchPuppyInfo', async (thunkAPI) => {
  try {
    const res = await axiosInstance.get('/api/user/dogs').then((res) => {
      console.log(res.data[0]);
      return res;
    });
    return res;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const puppySlice = createSlice({
  name: 'puppy',
  initialState: {
    initialStateValue,
  },
  reducers: {
    addPuppyInfo: (state, action) => {
      // actions 내에는 payload, type이 존재

      const dogFormData = new FormData();
      const dogInfo = JSON.stringify(action.payload[1]);
      dogFormData.append('image', action.payload[0]);
      dogFormData.append(
        'dog',
        new Blob([dogInfo], {
          type: 'application/json',
        }),
      );

      console.log(dogFormData.get('dog'));
      console.log(dogFormData.get('image'));

      for (const value of dogFormData.values()) {
        console.log(value);
      }

      const accessToken = window.localStorage.getItem('accessToken');

      axios({
        url: `${process.env.REACT_APP_BASE_URL}/api/dogs`,
        method: 'post',
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
        data: dogFormData,
      })
        .then((res) => {
          console.log(res);
          console.log('successfully registered puppy');
        })
        .catch((err) => {
          console.log(err);
          console.log('puppy registration fail');
        });
    },
    getPuppyInfo: (state, action) => {
      // axiosInstance
      //   .get('/api/user/dogs')
      //   .then((res) => {
      //     console.log('my dog info: ', res);
      //     const num = res.data.length;
      //     state = res.data[num - 1];
      //     console.log('succesfully fetched my pet');
      //   })
      //   .catch((err) => {
      //     console.log('fetching my dog info fail');
      //     console.log(err);
      //   });
    },
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
    deletePuppyInfo: (state, action) => {
      const { id } = action.payload;
      const existingPuppy = state.find((puppy) => puppy.id === id);
      if (existingPuppy) {
        return state.filter((puppy) => puppy.id !== id);
      }
      return null;
    },
  },
  extraReducers: {
    [fetchPuppyInfo.pending]: (state) => {
      state.loading = false;
      // console.log(state.loading);
      console.log('pending');
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
      // console.log(state.puppyInfo);
      console.log('fulfilled');
    },
    [fetchPuppyInfo.rejected]: (state) => {
      state.loading = false;
      console.log('rejected');
    },
  },
});

export const { addPuppyInfo, getPuppyInfo, editPuppyInfo, deletePuppyInfo } = puppySlice.actions;
export const puppySelector = (state) => state.puppy;
export default puppySlice.reducer;
