import type { TFormStructure } from '@app/types/global.types';
import type { TLoginForm } from '@types';

export const loginFields: TFormStructure<TLoginForm> = [
  {
    name: 'email',
    type: 'email',
    placeholder: 'Enter your email',
    label: 'Email',
    className: 'col-span-2',
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Enter your password',
    label: 'Password',
    className: 'col-span-2',
  },
];
