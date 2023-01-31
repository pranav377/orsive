import * as yup from 'yup';

export const SIGN_UP_STEP_1_SCHEMA = yup.object({
    email: yup.string().required('Email is required').email('Invalid email'),
    password: yup.string().required('Password is required'),
    confirm_password: yup
        .string()
        .required('Confirm password is required')
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
});
