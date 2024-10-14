import EROUTES from '@app/constants/routes';
import store from '@store/index';
import * as jose from 'jose';
import { DateTime } from 'luxon';
import { redirect } from 'react-router-dom';

async function publicLoader() {
  const authState = store.getState().auth;

  if (!authState || !authState.token) {
    return null;
  }

  try {
    const { exp } = jose.decodeJwt(localStorage.getItem('token')!);
    const expirationDate = DateTime.fromSeconds(exp!);
    const now = DateTime.now();

    if (expirationDate > now.plus({ minutes: 5 })) {
      return redirect(EROUTES.HOME);
    }

    return null;
  } catch (error) {
    return null;
  }
}

export default publicLoader;
