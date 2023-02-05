import * as yup from 'yup';

export const LOGIN_SCHEMA = yup.object({
    email: yup
        .string()
        .email('Not a valid email')
        .required('Email is required'),
    password: yup.string().required('Password is required'),
});
