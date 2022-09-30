import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from 'components/auth/axiosConfig';
import axios from 'axios';

const initialStateValue = {};

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
      state.value = action.state;
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
});

export const { addPuppyInfo, getPuppyInfo, editPuppyInfo, deletePuppyInfo } = puppySlice.actions;
export default puppySlice.reducer;
