'use client';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LogoSVG from '@/components/svgs/logo.svg';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useFormik, FormikErrors, FormikTouched } from 'formik';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import CircularProgress from '@mui/material/CircularProgress';
import LoadingButton from '@mui/lab/LoadingButton';
import * as yup from 'yup';
import { Dispatch, FocusEvent, SetStateAction, useState } from 'react';
import BackBar from '../Navigation/BackBar';
import { useRouter } from 'next/navigation';
import Footer from '@/ui/Navigation/Footer';
import { useMutation } from 'urql';
import invariant from 'tiny-invariant';
import SEND_AUTH_OTP from '@/graphql/mutations/sendAuthOtp';
import CHECK_USERNAME from '@/graphql/queries/checkUsername';
import SIGNUP_AUTH_EMAIL from '@/graphql/mutations/signupAuthEmail';
import LOGIN_AUTH_EMAIL from '@/graphql/mutations/loginAuthEmail';

const steps = {
    login: ['Enter E-Mail', 'Enter OTP'],
    signup: [
        'Enter E-Mail',
        'Enter OTP',
        'Enter Details',
        'Language Preferences',
    ],
};

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

interface MultiStepFormProps<Values> {
    values: Values;
    errors: FormikErrors<Values>;
    touched: FormikTouched<Values>;
    handleChange: (e: any) => void;
    handleBlur: {
        (e: FocusEvent<any, Element>): void;
        <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
    };

    setFieldError: (field: string, value: string | undefined) => void;
}

export default function EmailLogin() {
    const theme = useTheme();

    const [currForm, setCurrForm] = useState<'login' | 'signup'>('login');
    const [activeStep, setActiveStep] = useState(0);

    const formik = useFormik({
        initialValues: {
            email: '',
            otp: '',
        },
        validationSchema: EMAIL_LOGIN_SCHEMA,
        onSubmit: (values, helpers) => {
            helpers.setSubmitting(false);
        },
    });

    const router = useRouter();

    formik.handleChange;

    return (
        <>
            <BackBar
                onBackClick={() => {
                    if (activeStep === 0) {
                        router.push('/auth');
                    } else {
                        setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
                    <form
                        onSubmit={formik.handleSubmit}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                        }}
                    >
                        {activeStep === 0 && (
                            <Step1
                                {...formik}
                                setActiveStep={setActiveStep}
                                setCurrForm={setCurrForm}
                            />
                        )}
                        {activeStep === 1 && <Step2 {...formik} />}
                    </form>
                </Box>
            </Box>

            <Footer fixed />
        </>
    );
}

function Step1(
    props: MultiStepFormProps<{
        email: string;
        otp: string;
    }> & {
        setCurrForm: Dispatch<SetStateAction<'login' | 'signup'>>;
        setActiveStep: Dispatch<SetStateAction<number>>;
    }
) {
    const formik = props;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [_sendAuthOtpResult, sendAuthOtp] = useMutation(SEND_AUTH_OTP);

    return (
        <>
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
                type="button"
                loading={isSubmitting}
                size="medium"
                onClick={() => {
                    setIsSubmitting(true);

                    sendAuthOtp({
                        email: formik.values.email,
                    })
                        .then((result) => {
                            invariant(result.data?.sendAuthOtp);
                            const email_auth_type = result.data.sendAuthOtp
                                .type as 'login' | 'signup';
                            formik.setCurrForm(email_auth_type);
                            formik.setActiveStep(1);
                        })
                        .catch(() => {
                            formik.setFieldError('email', 'Email is not valid');
                        })
                        .finally(() => setIsSubmitting(false));
                }}
            >
                Send Otp
            </LoadingButton>
        </>
    );
}

function Step2(
    props: MultiStepFormProps<{
        email: string;
        otp: string;
    }>
) {
    const formik = props;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [_loginAuthEmailResult, loginAuthEmail] =
        useMutation(LOGIN_AUTH_EMAIL);

    return (
        <>
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
                type="button"
                loading={isSubmitting}
                size="medium"
                onClick={() => {
                    setIsSubmitting(true);
                }}
            >
                Login
            </LoadingButton>
        </>
    );
}
