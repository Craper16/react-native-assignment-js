import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
    defaultState: (state) => {
      state.accessToken = null;
    },
  },
});

export const {setUser, defaultState} = authSlice.actions;

export default authSlice.reducer;
