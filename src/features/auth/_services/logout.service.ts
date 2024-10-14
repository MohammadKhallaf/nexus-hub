import { clearAuth } from '@actions';
import supabase from '@app/configs/supabase';
import store from '@store/index';

export const logout = async () => {
  store.dispatch(clearAuth(''));

  const { error } = await supabase.auth.signOut();

  window.location.reload();
  if (error) throw error;

  return true;
};
