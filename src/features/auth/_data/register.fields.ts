import type { TFormStructure } from '@app/types/global.types';
import type { TRegisterForm } from '@types';

export const registerFields: TFormStructure<TRegisterForm> = [
  {
    name: 'firstName',
    type: 'text',
    placeholder: 'Enter your first name',
    label: 'First Name',
  },
  {
    name: 'lastName',
    type: 'text',
    placeholder: 'Enter your last name',
    label: 'Last Name',
  },
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
  {
    name: 'confirmPassword',
    type: 'password',
    placeholder: 'Confirm your password',
    label: 'Confirm Password',
    className: 'col-span-2',
  },
];
