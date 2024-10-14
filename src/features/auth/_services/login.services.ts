import supabase from '@app/configs/supabase';
import type { TLoginFormData } from '@types';

export const login = async (body: TLoginFormData) => {
  const { error, data } = await supabase.auth.signInWithPassword(body);
  if (error) throw error;
  return data;
};
