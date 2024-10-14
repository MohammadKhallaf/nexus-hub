import { redirect } from 'react-router-dom';
import EROUTES from '@app/constants/routes';
import supabase from '@app/configs/supabase';

async function authLoader() {
  // Check if the user is authenticated
  const isAuthenticated = await supabase.auth.getSession();

  if (!isAuthenticated) return redirect(EROUTES.LOGIN);

  return { isAuthenticated };
}

export default authLoader;
