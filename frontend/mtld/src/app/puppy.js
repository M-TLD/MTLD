import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from 'components/auth/axiosConfig';

const initialStateValue = {};

export const puppySlice = createSlice({
  name: 'puppy',
  initialState: {
    initialStateValue,
  },
  reducers: {
    addPuppyInfo: (state, action) => {
      // actions 내에는 payload, type이 존재
      console.log(action);
      console.log(action.payload);
      console.log(state);
      axiosInstance
        .post('api/dogs', {
          data: action.payload,
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
