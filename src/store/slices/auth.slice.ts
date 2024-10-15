import { createSlice, PayloadAction, type Slice } from '@reduxjs/toolkit';
import { getLocalStorageItem } from '@app/utils/get-local-storage';
import { IUser } from '@types';

export interface IAuth {
  user: IUser;
  token: string;
}

const initialState: IAuth | null = (() => {
  const user = getLocalStorageItem<IUser>('user');
  const token = getLocalStorageItem<string>('token');

  return user && token ? { user, token } : null;
})();

export const authSlice: Slice<IAuth | null> = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<Partial<IAuth>>) => {
      if (state === null) {
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', JSON.stringify(action.payload.token));
        return action.payload as IAuth;
      }
      localStorage.setItem('user', JSON.stringify({ ...state.user, ...action.payload.user }));
      localStorage.setItem('token', action.payload.token!);
      return { ...state, ...action.payload };
    },
    clearAuth: () => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return null;
    },
  },
});

export default authSlice;
