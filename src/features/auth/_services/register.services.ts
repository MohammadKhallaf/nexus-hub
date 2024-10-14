import supabase from '@app/configs/supabase';
import type { TRegisterFormData } from '@types';

export const register = async (body: TRegisterFormData) => {
  const { error, data } = await supabase.auth.signUp({
    email: body.email,
    password: body.password,
    options: { data: { first_name: body.firstName, last_name: body.lastName } },
  });
  if (error) throw error;
  return data;
};
