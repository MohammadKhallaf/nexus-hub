/* eslint-disable @typescript-eslint/no-unsafe-return */
import { createSlice, type Slice } from '@reduxjs/toolkit';

export const authSlice: Slice<any> = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {
    setAuth: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearAuth: () => {
      return {};
    },
  },
});

export default authSlice;
