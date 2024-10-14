import isAuth from '@app/utils/check-auth';

function authLoader() {
  return {
    isAuthenticated: isAuth(),
  };
}

export default authLoader;
