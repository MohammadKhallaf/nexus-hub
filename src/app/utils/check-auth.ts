import { clearAuth } from '@actions';
import store from '@store/index';
import * as jose from 'jose';
import { DateTime } from 'luxon';

function isAuthenticated() {
  const authState = store.getState().auth;

  if (!authState || !authState.token) return false;

  try {
    const { exp } = jose.decodeJwt(localStorage.getItem('token')!);
    const expirationDate = DateTime.fromSeconds(exp!);
    const now = DateTime.now();

    if (expirationDate <= now.plus({ minutes: 5 })) {
      throw new Error('Token expired or about to expire');
    }

    return true;
  } catch (_error) {
    store.dispatch(clearAuth(''));
    return false;
  }
}

export default isAuthenticated;
