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
import * as yup from 'yup';
import { useState } from 'react';
import BackBar from '../Navigation/BackBar';
import { useRouter } from 'next/navigation';
import Footer from '@/ui/Navigation/Footer';

const steps = ['Enter E-Mail', 'Enter OTP'];

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
}

export default function EmailLogin() {
    const theme = useTheme();

    const [activeStep, setActiveStep] = useState(0);

    const formik = useFormik({
        initialValues: {
            email: '',
            otp: '',
        },
        validationSchema: EMAIL_LOGIN_SCHEMA,
        onSubmit: (values, helpers) => {
            alert(JSON.stringify(values, null, 2));

            helpers.setSubmitting(false);
        },
    });

    const router = useRouter();

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
                            maxWidth: theme.spacing(48),
                        }}
                    >
                        {steps.map((label, index) => {
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
                        Login to continue
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
                        {activeStep === 0 && <Step1 {...formik} />}
                        {activeStep === 1 && <Step2 {...formik} />}

                        <Button
                            variant="contained"
                            sx={{ mt: 1, textTransform: 'none' }}
                            type="button"
                            disabled={formik.isSubmitting}
                            onClick={() => {
                                if (activeStep === 0) {
                                    setActiveStep(1);
                                } else {
                                    formik.handleSubmit;
                                }
                            }}
                        >
                            Send OTP
                        </Button>
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
    }>
) {
    const formik = props;

    return (
        <>
            <TextField
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                type="email"
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                variant="outlined"
            />
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

    return (
        <>
            <TextField
                id="otp"
                name="otp"
                label="OTP"
                value={formik.values.otp}
                onChange={formik.handleChange}
                type="text"
                error={formik.touched.otp && Boolean(formik.errors.otp)}
                helperText={formik.touched.otp && formik.errors.otp}
                variant="outlined"
            />
        </>
    );
}
