import * as Yup from 'yup';

export const registerSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(60, 'Name is too long')
    .required('Name is required'),

  email: Yup.string()
    .email('Must follow a standard email format')
    .required('Email is required'),

  phone: Yup.string()
    .matches(/^\d{10}$/, 'Must contain exactly 10 digits (numbers only)')
    .required('Phone number is required'),

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});
