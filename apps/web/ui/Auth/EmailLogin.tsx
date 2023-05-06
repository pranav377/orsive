'use client';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LogoSVG from '@/components/svgs/logo.svg';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useFormik } from 'formik';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import * as yup from 'yup';
import {
    Dispatch,
    useState,
    createContext,
    useContext,
    useReducer,
} from 'react';
import BackBar from '../Navigation/BackBar';
import { useRouter } from 'next/navigation';
import Footer from '@/ui/Navigation/Footer';
import { useMutation } from 'urql';
import invariant from 'tiny-invariant';
import SEND_AUTH_OTP from '@/graphql/mutations/sendAuthOtp';
import CHECK_USERNAME from '@/graphql/queries/checkUsername';
import SIGNUP_AUTH_EMAIL from '@/graphql/mutations/signupAuthEmail';
import LOGIN_AUTH_EMAIL from '@/graphql/mutations/loginAuthEmail';
import login from '@/technique/auth/login';
import AppSnackbar from '../AppSnackbar';
import useUserState from '@/state/userState';

const steps = {
    check: ['Enter E-mail'],
    login: ['Enter E-Mail', 'Enter OTP'],
    signup: [
        'Enter E-Mail',
        'Enter OTP',
        'Enter Details',
        'Language Preferences',
    ],
};

type forms = 'check' | 'login' | 'signup';

interface EmailAuthState {
    currForm: forms;
    activeStep: number;
    email: string;
}

const DefaultEmailAuthState: EmailAuthState = {
    currForm: 'check',
    activeStep: 0,
    email: '',
};

function formsReducer(
    state: EmailAuthState,
    action: {
        type: 'setCurrForm' | 'setActiveStep' | 'setEmail';
        payload?: any;
    }
): EmailAuthState {
    switch (action.type) {
        case 'setCurrForm': {
            return {
                ...state,
                currForm: action.payload,
            };
        }
        case 'setActiveStep': {
            return {
                ...state,
                activeStep: action.payload,
            };
        }
        case 'setEmail': {
            return {
                ...state,
                email: action.payload,
            };
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

const EmailAuthContext = createContext<EmailAuthState>(DefaultEmailAuthState);
const EmailAuthDispatchContext = createContext<
    Dispatch<{
        type: 'setCurrForm' | 'setActiveStep' | 'setEmail';
        payload?: any;
    }>
>(() => null);

export default function EmailAuth() {
    const router = useRouter();
    const theme = useTheme();
    const [{ activeStep, currForm, email }, dispatch] = useReducer(
        formsReducer,
        DefaultEmailAuthState
    );

    return (
        <EmailAuthContext.Provider value={{ activeStep, currForm, email }}>
            <EmailAuthDispatchContext.Provider value={dispatch}>
                <BackBar
                    onBackClick={() => {
                        if (activeStep === 0) {
                            router.push('/auth');
                        } else {
                            dispatch({
                                type: 'setActiveStep',
                                payload: activeStep - 1,
                            });
                        }
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Stepper
                            activeStep={activeStep}
                            sx={{
                                width: '100%',
                                maxWidth: theme.spacing(96),
                            }}
                        >
                            {steps[currForm].map((label, index) => {
                                const stepProps: { completed?: boolean } = {};
                                const labelProps: {
                                    optional?: React.ReactNode;
                                } = {};
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>
                                            {label}
                                        </StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                    </Box>
                </BackBar>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        width: '100%',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <LogoSVG
                            style={{
                                height: theme.spacing(6),
                                width: theme.spacing(6),
                            }}
                        />
                        <Typography variant="h5" sx={{ mt: 1 }}>
                            {activeStep === 0 && 'Login or Sign up to continue'}
                            {activeStep === 1 &&
                                currForm === 'login' &&
                                'Enter OTP'}
                            {activeStep === 1 &&
                                currForm === 'signup' &&
                                'We are thrilled to welcome you here!'}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: 2,
                            maxWidth: theme.spacing(48),
                            width: '100%',
                        }}
                    >
                        <FormsRenderer currForm={currForm} />
                    </Box>
                </Box>

                <Footer fixed />
            </EmailAuthDispatchContext.Provider>
        </EmailAuthContext.Provider>
    );
}

function FormsRenderer(props: { currForm: forms }) {
    switch (props.currForm) {
        case 'check':
            return <CheckForm />;
        case 'login':
            return <EmailLoginForm />;
        case 'signup':
            return <></>;
        default:
            return null;
    }
}

const AUTH_TYPE_CHECK_SCHEMA = yup.object({
    email: yup
        .string()
        .email('Not a valid email')
        .required('Email is required'),
});

function CheckForm() {
    const [_sendAuthOtpResult, sendAuthOtp] = useMutation(SEND_AUTH_OTP);
    const dispatch = useContext(EmailAuthDispatchContext);

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: AUTH_TYPE_CHECK_SCHEMA,
        onSubmit: (values, helpers) => {
            sendAuthOtp({
                email: values.email,
            })
                .then((result) => {
                    invariant(result.data?.sendAuthOtp);
                    const email_auth_type = result.data.sendAuthOtp.type as
                        | 'login'
                        | 'signup';
                    dispatch({
                        type: 'setEmail',
                        payload: values.email,
                    });
                    dispatch({
                        type: 'setCurrForm',
                        payload: email_auth_type,
                    });
                    dispatch({
                        type: 'setActiveStep',
                        payload: 1,
                    });
                })
                .catch(() => {
                    helpers.setFieldError('email', 'Email is not valid');
                })
                .finally(() => helpers.setSubmitting(false));
        },
    });

    return (
        <form
            onSubmit={formik.handleSubmit}
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
            }}
        >
            <TextField
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="email"
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                variant="outlined"
            />

            <LoadingButton
                variant="contained"
                sx={{ mt: 1, textTransform: 'none' }}
                type="submit"
                loading={formik.isSubmitting}
                size="medium"
            >
                Send Otp
            </LoadingButton>
        </form>
    );
}

const EMAIL_LOGIN_SCHEMA = yup.object({
    email: yup
        .string()
        .email('Not a valid email')
        .required('Email is required'),
    otp: yup
        .string()
        .matches(/[0-9]/, 'OTP is not valid')
        .required('OTP is required')
        .length(7, 'OTP should be 7 characters long'),
});

function EmailLoginForm() {
    const data = useContext(EmailAuthContext);
    const [_loginAuthEmailResult, loginAuthEmail] =
        useMutation(LOGIN_AUTH_EMAIL);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const currUser = useUserState();

    const formik = useFormik({
        initialValues: {
            email: data.email,
            otp: '',
        },
        validationSchema: EMAIL_LOGIN_SCHEMA,
        onSubmit: (values, helpers) => {
            loginAuthEmail(values)
                .then((result) => {
                    invariant(result.data?.loginAuthEmail);
                    const response = result.data.loginAuthEmail;

                    login(response);

                    // display welcome message
                    setSnackbarOpen(true);
                })
                .catch(() =>
                    helpers.setErrors({
                        otp: 'OTP is not valid',
                    })
                )
                .finally(() => helpers.setSubmitting(false));
        },
    });

    return (
        <form
            onSubmit={formik.handleSubmit}
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
            }}
        >
            <AppSnackbar
                open={snackbarOpen}
                setOpen={setSnackbarOpen}
                message={`Welcome ${currUser.name}`}
            />

            <TextField
                id="otp"
                name="otp"
                label="OTP"
                value={formik.values.otp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                error={formik.touched.otp && Boolean(formik.errors.otp)}
                helperText={formik.touched.otp && formik.errors.otp}
                variant="outlined"
            />

            <LoadingButton
                variant="contained"
                sx={{ mt: 1, textTransform: 'none' }}
                type="submit"
                loading={formik.isSubmitting}
                size="medium"
            >
                Login
            </LoadingButton>
        </form>
    );
}
