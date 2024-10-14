import type { Session, User } from '@supabase/supabase-js';
import type { InferType } from 'yup';
import { userCreateSchema, type userLoginSchema } from '@schemas';

export type TRegisterForm = InferType<typeof userCreateSchema>;
export type TLoginForm = InferType<typeof userLoginSchema>;

export type TRegisterFormData = Omit<TRegisterForm, 'confirmPassword'>;
export type TLoginFormData = TLoginForm;

export interface TRegisterResult {
  user: User | null;
  session?: Session | null;
}

export interface TLoginResult {
  user: User;
  session: Session;
}

export interface IUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUtl?: string;
}

export interface TProfileRow {
  id: string;
  avatar_url?: string;
  created_at: string;
  first_name?: string;
  is_discoverable?: boolean;
  is_public?: boolean;
  last_name?: string;
  updated_at?: string;
}

export type IProfileUpdate = Partial<Omit<TProfileRow, 'id' | 'created_at' | 'updated_at'>>;
