import * as jose from 'jose';
import { DateTime } from 'luxon';
import { logout } from '@/features/auth/_services/logout.service';
import store from '@store/index';

async function isAuthenticated() {
  const authState = store.getState().auth;

  if (!authState?.token) return false;

  try {
    const { exp } = jose.decodeJwt(localStorage.getItem('token')!);
    const expirationDate = DateTime.fromSeconds(exp!);
    const now = DateTime.now();

    if (expirationDate <= now.plus({ minutes: 5 })) {
      throw new Error('Token expired or about to expire');
    }

    return true;
  } catch (_error) {
    await logout();
    return false;
  }
}

export default isAuthenticated;
