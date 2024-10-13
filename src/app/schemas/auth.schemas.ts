import * as Yup from 'yup';

export const userCreateSchema = Yup.object()
  .shape({
    email: Yup.string()
      .email('Please enter a valid email')
      .nonNullable()
      .required('Email is required'),
    password: Yup.string()
      .trim()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
        'Must Contain at least 8 Characters, 1 uppercase, 1 lowercase, 1 number and 1 special case character'
      )
      .required('Password is required'),
    confirmPassword: Yup.string()
      .trim()
      .required("Passwords don't match")
      .oneOf([Yup.ref('password'), null as any], 'Passwords must match'),
    firstName: Yup.string().min(2, 'Too Short!').required(),
    lastName: Yup.string().min(2, 'Too Short!').required(),
  })
  .required();

export const userLoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .nonNullable()
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export const updateProfileSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
});
