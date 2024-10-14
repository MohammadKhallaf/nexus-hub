import isAuth from '@app/utils/check-auth';

async function authLoader() {
  return {
    isAuthenticated: await isAuth(),
  };
}

export default authLoader;
