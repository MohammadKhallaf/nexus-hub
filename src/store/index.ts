import { configureStore } from '@reduxjs/toolkit';
import { authSlice, chatSlice } from './slices';

export interface IRootState {
  auth: ReturnType<typeof authSlice.reducer>;
  chat: ReturnType<typeof chatSlice.reducer>;
}

const store = configureStore<IRootState>({
  reducer: {
    auth: authSlice.reducer,
    chat: chatSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export default store;
