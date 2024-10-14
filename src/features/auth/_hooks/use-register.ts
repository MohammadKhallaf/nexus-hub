import type { AuthError } from '@supabase/supabase-js';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { TRegisterFormData, TRegisterResult } from '@types';
import { register } from '../_services';

export const useRegister = (
  options?: UseMutationOptions<TRegisterResult, AuthError, TRegisterFormData, unknown>
) => {
  return useMutation({
    mutationKey: ['register'],

    mutationFn: (body: TRegisterFormData) => {
      return register(body);
    },
    ...options,
  });
};
