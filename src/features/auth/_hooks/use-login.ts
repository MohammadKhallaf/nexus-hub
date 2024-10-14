import type { AuthError } from '@supabase/supabase-js';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { TLoginFormData, TLoginResult } from '@types';
import { login } from '../_services';

export const useLogin = (
  options?: UseMutationOptions<TLoginResult, AuthError, TLoginFormData, unknown>
) => {
  return useMutation({
    mutationKey: ['login'],

    mutationFn: (body: TLoginFormData) => {
      return login(body);
    },
    ...options,
  });
};
