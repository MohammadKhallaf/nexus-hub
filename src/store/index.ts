import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices';

export interface IRootState {
  auth: ReturnType<typeof authSlice.reducer>;
}

const store = configureStore<IRootState>({
  reducer: {
    auth: authSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export default store;
