import * as yup from 'yup';

export const PASSWORD_RESET_STEP_1_SCHEMA = yup.object({
    email: yup.string().required('Email is required').email('Invalid email'),
});
