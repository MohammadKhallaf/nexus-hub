import supabase from '@app/configs/supabase';

interface IRegisterForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export default async (body: IRegisterForm) => {
  const { error, data } = await supabase.auth.signUp({
    email: body.email,
    password: body.password,
    options: { data: { first_name: body.firstName, last_name: body.lastName } },
  });
  if (error) throw error;
  return data;
};
